import { supabase } from "./supabase.js";

const TVA = 0.20;

export async function getReversementsAEffectuer() {
    const { data: paiements, error } = await supabase
        .from("paiements")
        .select(`
            id, dossier_id, date_paiement, montant, mode_paiement, reference_paiement,
            origine_encaissement, created_at,
            dossiers ( reference_dossier, creancier_id, creanciers ( reference_client, nom ) ),
            honoraires_dossier ( id, montant_honoraire, facture )
        `)
        .eq("origine_encaissement", "RECOVIA")
        .order("created_at", { ascending: true });

    if (error) {
        console.error("ERREUR REVLIST PAIEMENTS :", error);
        return { data: [], error: "IMPOSSIBLE DE CHARGER LES REVERSEMENTS A EFFECTUER." };
    }

    const ids = (paiements || []).map((p) => p.id);
    let deja = new Set();
    if (ids.length) {
        const { data: existants, error: revError } = await supabase
            .from("reversements_mandants")
            .select("paiement_id")
            .in("paiement_id", ids);
        if (revError) {
            console.error("ERREUR REVLIST EXISTANTS :", revError);
            return { data: [], error: "IMPOSSIBLE DE VERIFIER LES REVERSEMENTS EXISTANTS." };
        }
        deja = new Set((existants || []).map((r) => r.paiement_id));
    }

    const items = (paiements || []).filter((p) => !deja.has(p.id)).map(enrichirPaiement);

    // Les frais refacturables valides sont retenus sur les fonds RECOVIA, en plus
    // des honoraires. On ne les retient qu'une seule fois, sur les paiements les
    // plus anciens encore a reverser du client.
    const clientIds = [...new Set(items.map((p) => p.dossiers?.creancier_id).filter(Boolean))];
    if (clientIds.length) {
        const [{ data: frais, error: fraisError }, { data: revs, error: revsError }] = await Promise.all([
            supabase.from("frais_dossier")
                .select("id, creancier_id, montant_ht, facture, refacturable")
                .in("creancier_id", clientIds)
                .eq("refacturable", true)
                .eq("facture", true),
            supabase.from("reversements_mandants")
                .select("creancier_id, frais_retenus_ht")
                .in("creancier_id", clientIds)
        ]);
        if (fraisError || revsError) {
            console.error("ERREUR REVLIST FRAIS :", fraisError || revsError);
            return { data: [], error: "IMPOSSIBLE DE CALCULER LES FRAIS A RETENIR." };
        }
        const facturesParClient = new Map();
        for (const f of (frais || [])) facturesParClient.set(f.creancier_id, round((facturesParClient.get(f.creancier_id) || 0) + Number(f.montant_ht || 0)));
        const dejaRetenusParClient = new Map();
        for (const r of (revs || [])) dejaRetenusParClient.set(r.creancier_id, round((dejaRetenusParClient.get(r.creancier_id) || 0) + Number(r.frais_retenus_ht || 0)));

        const restant = new Map();
        for (const id of clientIds) restant.set(id, Math.max(0, round((facturesParClient.get(id) || 0) - (dejaRetenusParClient.get(id) || 0))));
        for (const item of items) {
            const cid = item.dossiers?.creancier_id;
            let fraisHt = restant.get(cid) || 0;
            if (fraisHt <= 0) continue;
            // Maximum de frais HT absorbable par ce paiement apres honoraires TTC.
            const dispoApresHonoraires = Math.max(0, item.montantEncaisse - item.honorairesHt * (1 + TVA));
            const maxHt = dispoApresHonoraires / (1 + TVA);
            const retenuHt = round(Math.min(fraisHt, maxHt));
            item.fraisRetenusHt = retenuHt;
            item.tvaFrais = round(retenuHt * TVA);
            item.netAReverser = round(Math.max(0, item.montantEncaisse - item.honorairesHt - item.tvaHonoraires - item.fraisRetenusHt - item.tvaFrais));
            restant.set(cid, round(fraisHt - retenuHt));
        }
    }

    // Tant qu'il existe des frais refacturables non factures pour le client, le
    // reversement reste bloque, comme pour les honoraires.
    if (clientIds.length) {
        const { data: fraisNonFactures, error: nfError } = await supabase.from("frais_dossier")
            .select("creancier_id")
            .in("creancier_id", clientIds)
            .eq("refacturable", true)
            .eq("facture", false);
        if (nfError) return { data: [], error: "IMPOSSIBLE DE VERIFIER LA FACTURATION DES FRAIS." };
        const bloques = new Set((fraisNonFactures || []).map((f) => f.creancier_id));
        for (const item of items) if (bloques.has(item.dossiers?.creancier_id)) item.facturationValidee = false;
    }

    return { data: items, error: null };
}

export async function getReversementsHistorique() {
    const { data, error } = await supabase
        .from("reversements_mandants")
        .select(`
            id, paiement_id, dossier_id, creancier_id, montant_encaisse, honoraires_ht,
            tva_honoraires, montant_reverse, date_limite, date_reversement, reference_reversement,
            statut, created_at,
            dossiers ( reference_dossier ),
            creanciers ( reference_client, nom )
        `)
        .order("date_reversement", { ascending: false })
        .limit(200);

    if (error) {
        console.error("ERREUR REVHIS :", error);
        return { data: [], error: "IMPOSSIBLE DE CHARGER L'HISTORIQUE DES REVERSEMENTS." };
    }
    return { data: data || [], error: null };
}

export async function validerReversement(item, reference, userId) {
    if (!item?.id) return { data: null, error: "PAIEMENT A REVERSER INVALIDE." };
    if (!item.facturationValidee) return { data: null, error: "REVERSEMENT BLOQUE : HONORAIRES NON FACTURES. UTILISEZ FACTCLI PUIS FACTVAL." };
    const ref = String(reference || "").trim();
    if (!ref) return { data: null, error: "REFERENCE DE REVERSEMENT OBLIGATOIRE." };

    const { data, error } = await supabase
        .from("reversements_mandants")
        .insert({
            paiement_id: item.id,
            dossier_id: item.dossier_id,
            creancier_id: item.dossiers?.creancier_id || null,
            montant_encaisse: item.montantEncaisse,
            honoraires_ht: item.honorairesHt,
            tva_honoraires: item.tvaHonoraires,
            frais_retenus_ht: item.fraisRetenusHt || 0,
            tva_frais: item.tvaFrais || 0,
            montant_reverse: item.netAReverser,
            date_limite: item.dateLimite,
            date_reversement: new Date().toISOString(),
            reference_reversement: ref,
            statut: "REVERSE",
            created_by: userId || null
        })
        .select()
        .single();

    if (error) {
        console.error("ERREUR VALIDATION REVERSEMENT :", error);
        return { data: null, error: "IMPOSSIBLE D'ENREGISTRER LE REVERSEMENT." };
    }
    return { data, error: null };
}

function enrichirPaiement(p) {
    const montantEncaisse = round(Number(p.montant || 0));
    const honorairesHt = round((p.honoraires_dossier || []).reduce((s, h) => s + Number(h.montant_honoraire || 0), 0));
    const tvaHonoraires = round(honorairesHt * TVA);
    const fraisRetenusHt = 0;
    const tvaFrais = 0;
    const netAReverser = round(Math.max(0, montantEncaisse - honorairesHt - tvaHonoraires));
    const honoraires = p.honoraires_dossier || [];
    const facturationValidee = honoraires.length > 0 && honoraires.every((h) => h.facture === true);
    const baseDate = p.created_at || `${p.date_paiement}T00:00:00`;
    const dateLimite = ajouter72HeuresOuvrees(baseDate).toISOString();
    return { ...p, montantEncaisse, honorairesHt, tvaHonoraires, fraisRetenusHt, tvaFrais, netAReverser, dateLimite, facturationValidee };
}

function round(v) { return Math.round((Number(v) + Number.EPSILON) * 100) / 100; }


// 72 heures ouvrées = 3 journées ouvrées complètes à heure constante.
// Samedis, dimanches et jours fériés nationaux français sont ignorés.
function ajouter72HeuresOuvrees(value) {
    const d = new Date(value);
    if (Number.isNaN(d.getTime())) return new Date();
    let jours = 0;
    while (jours < 3) {
        d.setDate(d.getDate() + 1);
        if (estJourOuvreFrance(d)) jours += 1;
    }
    return d;
}

function estJourOuvreFrance(date) {
    const day = date.getDay();
    if (day === 0 || day === 6) return false;
    return !joursFeriesFrance(date.getFullYear()).has(dateKey(date));
}

function joursFeriesFrance(year) {
    const fixed = [
        [1,1], [5,1], [5,8], [7,14], [8,15], [11,1], [11,11], [12,25]
    ];
    const keys = new Set(fixed.map(([m,d]) => `${year}-${String(m).padStart(2,"0")}-${String(d).padStart(2,"0")}`));
    const easter = dimanchePaques(year);
    [1, 39, 50].forEach((offset) => {
        const d = new Date(easter);
        d.setDate(d.getDate() + offset);
        keys.add(dateKey(d));
    });
    return keys;
}

function dimanchePaques(year) {
    const a=year%19, b=Math.floor(year/100), c=year%100, d=Math.floor(b/4), e=b%4;
    const f=Math.floor((b+8)/25), g=Math.floor((b-f+1)/3);
    const h=(19*a+b-d-g+15)%30, i=Math.floor(c/4), k=c%4;
    const l=(32+2*e+2*i-h-k)%7, m=Math.floor((a+11*h+22*l)/451);
    const month=Math.floor((h+l-7*m+114)/31), day=((h+l-7*m+114)%31)+1;
    return new Date(year, month-1, day, 12, 0, 0, 0);
}

function dateKey(d) {
    return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,"0")}-${String(d.getDate()).padStart(2,"0")}`;
}

export function grouperReversementsParClient(items) {
    const groups = new Map();

    for (const item of (items || [])) {
        const cli = item.dossiers?.creanciers || {};
        const key = String(cli.reference_client || item.dossiers?.creancier_id || "SANS-CLIENT").toUpperCase();
        if (!groups.has(key)) groups.set(key, {
            referenceClient: key,
            nomClient: cli.nom || "",
            creancierId: item.dossiers?.creancier_id || null,
            items: [], itemsDus: [], itemsAVenir: [],
            montantEncaisse: 0, honorairesHt: 0, tvaHonoraires: 0, netAReverser: 0,
            netDu: 0, netAVenir: 0, nbDus: 0, nbAVenir: 0, facturationOk: true,
            dateLimite: null
        });
        const g = groups.get(key);
        g.items.push(item);
        g.montantEncaisse = round(g.montantEncaisse + Number(item.montantEncaisse || 0));
        g.honorairesHt = round(g.honorairesHt + Number(item.honorairesHt || 0));
        g.tvaHonoraires = round(g.tvaHonoraires + Number(item.tvaHonoraires || 0));
        g.netAReverser = round(g.netAReverser + Number(item.netAReverser || 0));
        if (!g.dateLimite || new Date(item.dateLimite) < new Date(g.dateLimite)) g.dateLimite = item.dateLimite;

        // Tous les paiements non encore reverses sont immediatement disponibles.
        // dateLimite reste uniquement la date maximale de reversement (72 h ouvrees),
        // et ne doit jamais bloquer un reversement anticipe.
        g.itemsDus.push(item);
        g.nbDus += 1;
        g.netDu = round(g.netDu + Number(item.netAReverser || 0));
        if (!item.facturationValidee) g.facturationOk = false;
    }
    return Array.from(groups.values()).sort((a,b) => new Date(a.dateLimite) - new Date(b.dateLimite));
}

export async function validerReversementClient(group, reference, userId) {
    if (!group?.itemsDus?.length) return { data: [], error: "AUCUN REVERSEMENT DISPONIBLE POUR CE CLIENT." };
    if (!group.facturationOk) return { data: [], error: `REVERSEMENT BLOQUE : HONORAIRES NON FACTURES POUR ${group.referenceClient}. UTILISEZ FACTCLI ${group.referenceClient} PUIS FACTVAL.` };
    const ref = String(reference || "").trim();
    if (!ref) return { data: [], error: "REFERENCE DE REVERSEMENT OBLIGATOIRE." };
    const rows = group.itemsDus.map((item) => ({
        paiement_id: item.id,
        dossier_id: item.dossier_id,
        creancier_id: item.dossiers?.creancier_id || null,
        montant_encaisse: item.montantEncaisse,
        honoraires_ht: item.honorairesHt,
        tva_honoraires: item.tvaHonoraires,
        frais_retenus_ht: item.fraisRetenusHt || 0,
        tva_frais: item.tvaFrais || 0,
        montant_reverse: item.netAReverser,
        date_limite: item.dateLimite,
        date_reversement: new Date().toISOString(),
        reference_reversement: ref,
        statut: "REVERSE",
        created_by: userId || null
    }));
    const { data, error } = await supabase.from("reversements_mandants").insert(rows).select();
    if (error) {
        console.error("ERREUR VALIDATION REVERSEMENT CLIENT :", error);
        return { data: [], error: "IMPOSSIBLE D'ENREGISTRER LE REVERSEMENT GROUPE." };
    }
    return { data: data || [], error: null };
}
