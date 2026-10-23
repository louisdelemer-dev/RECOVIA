export function renderReversementsScreen(screen, items) {
    const rows = (items || []).map((r, i) => {
        const cli = r.dossiers?.creanciers || {};
        return `${String(i + 1).padStart(3)} ${fmtDate(r.date_paiement).padEnd(10)} ${safe(cli.reference_client).padEnd(10).slice(0,10)} ${safe(r.dossiers?.reference_dossier).padEnd(11).slice(0,11)} ${money(r.montantEncaisse).padStart(10)} ${money(r.honorairesHt).padStart(8)} ${money(r.tvaHonoraires).padStart(7)} ${money(r.fraisRetenusHt).padStart(8)} ${money(r.tvaFrais).padStart(7)} ${money(r.netAReverser).padStart(10)} ${fmtDateTime(r.dateLimite).padEnd(17)} ${r.facturationValidee ? "OK" : "A FACTURER"}`;
    });
    const total = (items || []).reduce((s, r) => s + Number(r.netAReverser || 0), 0);
    screen.innerHTML = `<pre class="terminal-table">
============================= REVERSEMENTS A EFFECTUER =============================

 N° DATE       CLIENT     DOSSIER       ENCAISSE  HON.HT TVA HON  FRAISHT TVA FR       NET LIMITE 72H OUV.   FACTURE
-------------------------------------------------------------------------------------------------------
${rows.length ? rows.join("\n") : "AUCUN REVERSEMENT A EFFECTUER."}
-------------------------------------------------------------------------------------------------------
TOTAL NET A REVERSER : ${money(total)} EUR

REV [N°] [REFERENCE_VIREMENT]   VALIDER UN REVERSEMENT
REVCLI                          VUE GROUPEE PAR CLIENT
REVHIS                          HISTORIQUE DES REVERSEMENTS
========================================================================================
</pre>`;
}

export function renderReversementsHistoriqueScreen(screen, items) {
    const rows = (items || []).map((r) => `${fmtDateTime(r.date_reversement).padEnd(17)} ${safe(r.creanciers?.reference_client).padEnd(10).slice(0,10)} ${safe(r.dossiers?.reference_dossier).padEnd(11).slice(0,11)} ${money(r.montant_encaisse).padStart(10)} ${money(r.montant_reverse).padStart(10)} ${safe(r.reference_reversement)}`);
    screen.innerHTML = `<pre class="terminal-table">
============================= HISTORIQUE REVERSEMENTS =============================
DATE              CLIENT     DOSSIER       ENCAISSE        NET REFERENCE
----------------------------------------------------------------------------------
${rows.length ? rows.join("\n") : "AUCUN REVERSEMENT ENREGISTRE."}
----------------------------------------------------------------------------------
REVLIST   RETOUR AUX REVERSEMENTS A EFFECTUER
==================================================================================
</pre>`;
}


export function renderReversementsClientsScreen(screen, groups) {
    const rows = (groups || []).map((g, i) => {
        const etat = g.nbDus === 0 ? "AUCUN" : (g.facturationOk ? "A VIRER" : "A FACTURER");
        return `${String(i + 1).padStart(3)} ${safe(g.referenceClient).padEnd(10).slice(0,10)} ${String(g.nbDus).padStart(4)} ${money(g.netDu).padStart(12)} ${money(g.netAVenir).padStart(12)} ${fmtDateTime(g.dateLimite).padEnd(17)} ${etat}`;
    });
    const totalDu = (groups || []).reduce((s, g) => s + Number(g.netDu || 0), 0);
    const totalAVenir = (groups || []).reduce((s, g) => s + Number(g.netAVenir || 0), 0);
    screen.innerHTML = `<pre class="terminal-table">
=========================== VIREMENTS CLIENTS A TRAITER ===========================

 N° CLIENT     NB DISP   DISPONIBLE    A VENIR  DATE LIMITE MAX.   ETAT
-----------------------------------------------------------------------------------
${rows.length ? rows.join("\n") : "AUCUN REVERSEMENT A EFFECTUER."}
-----------------------------------------------------------------------------------
TOTAL DISPONIBLE A REVERSER : ${money(totalDu)} EUR
TOTAL A VENIR             : ${money(totalAVenir)} EUR

REVCLI [N°] [REFERENCE_VIREMENT]   REVERSER LES SOMMES DISPONIBLES
FACTCLI [REF CLIENT]                FACTURER / CONTROLER AVANT VIREMENT
REVLIST                             DETAIL PAIEMENT PAR PAIEMENT
REVHIS                              HISTORIQUE DES REVERSEMENTS

REGLE : LA DATE LIMITE EST UNE ECHEANCE MAXIMALE, PAS UNE DATE DE DEBUT.
       AUCUN REVERSEMENT N'EST AUTORISE AVANT VALIDATION DE LA FACTURATION.
===================================================================================
</pre>`;
}

function safe(v) { return String(v || "").toUpperCase(); }
function money(v) { return Number(v || 0).toLocaleString("fr-FR", { minimumFractionDigits: 2, maximumFractionDigits: 2 }); }
function fmtDate(v) { if (!v) return ""; const d=String(v).split("T")[0].split("-"); return d.length===3 ? `${d[2]}/${d[1]}/${d[0]}` : ""; }
function fmtDateTime(v) { if (!v) return ""; const d=new Date(v); return Number.isNaN(d.getTime()) ? "" : d.toLocaleString("fr-FR", { day:"2-digit",month:"2-digit",year:"numeric",hour:"2-digit",minute:"2-digit" }); }
