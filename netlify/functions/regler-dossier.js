const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
const POREC_BASE_URL = String(process.env.POREC_BASE_URL || "https://porecv2.netlify.app").replace(/\/$/, "");

exports.handler = async function (event) {
  if (event.httpMethod !== "POST") return json(405, { error: "Méthode non autorisée." });
  if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) return json(500, { error: "Configuration du paiement incomplète." });
  let body;
  try { body = JSON.parse(event.body || "{}"); } catch { return json(400, { error: "Requête invalide." }); }
  const reference = String(body.reference || "").trim();
  const amount = Number(body.amount);
  if (!/^[A-Za-z0-9._\/-]{3,100}$/.test(reference) || !Number.isFinite(amount) || amount <= 0) {
    return json(400, { error: "Référence ou montant invalide." });
  }
  const amountRounded = Math.round(amount * 100) / 100;
  if (amountRounded < 0.01) return json(400, { error: "Le montant minimum est de 0,01 €." });

  try {
    const dossiers = await restGet(`dossiers?reference_dossier=eq.${encodeURIComponent(reference)}&select=*,debiteurs(*)&limit=2`);
    // Réponse volontairement générique pour ne pas divulguer l'existence d'une dette.
    if (!Array.isArray(dossiers) || dossiers.length !== 1) return json(400, { error: "Référence ou montant incorrect." });
    const dossier = dossiers[0];
    const paiements = await restGet(`paiements?dossier_id=eq.${encodeURIComponent(dossier.id)}&select=date_paiement,montant&order=date_paiement.asc`);
    const restant = calculerRestantDu(dossier, paiements || []);
    if (restant <= 0 || amountRounded > restant + 0.009) return json(400, { error: "Référence ou montant incorrect." });

    const debiteur = normalizeRelation(dossier.debiteurs) || {};
    const email = String(debiteur.email || debiteur.email_principal || "").trim();
    if (!email) return json(400, { error: "Ce dossier ne peut pas être réglé en ligne. Contactez le service débiteurs." });

    const cpResponse = await fetch(`${POREC_BASE_URL}/.netlify/functions/centralpay-payment-request`, {
      method: "POST", headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ dossierRef: reference, amount: amountRounded, email })
    });
    const cp = await safeJson(cpResponse);
    if (!cpResponse.ok || !cp?.paymentUrl || !cp?.paymentRequestId) throw new Error(cp?.error || `CentralPay ${cpResponse.status}`);

    const shortResponse = await fetch(`${POREC_BASE_URL}/.netlify/functions/create-payment-short-link`, {
      method: "POST", headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ paymentUrl: cp.paymentUrl, dossierId: dossier.id, paymentRequestId: cp.paymentRequestId, montant: amountRounded })
    });
    const short = await safeJson(shortResponse);
    if (!shortResponse.ok || !short?.shortUrl) throw new Error(short?.error || `Lien de paiement ${shortResponse.status}`);

    return json(200, { ok: true, paymentUrl: short.shortUrl });
  } catch (error) {
    console.error("REGLEMENT PUBLIC RECOVIA :", error);
    return json(500, { error: "Le paiement ne peut pas être préparé pour le moment. Veuillez réessayer ou contacter RECOVIA." });
  }
};

function calculerRestantDu(dossier, paiements) {
  const principalInitial = Number(dossier.montant_principal_initial || 0);
  const tries = [...paiements].sort((a,b)=>String(a.date_paiement||"").localeCompare(String(b.date_paiement||"")));
  let principal = principalInitial;
  for (const p of tries) principal = Math.max(0, principal - Number(p.montant || 0));
  let interets = 0;
  if (dossier.med_envoyee && dossier.date_mise_en_demeure && Number(dossier.taux_interet || 0) > 0) {
    let base = principalInitial, depart = new Date(dossier.date_mise_en_demeure), taux = Number(dossier.taux_interet || 0);
    for (const p of tries) {
      const d = new Date(p.date_paiement);
      if (!Number.isNaN(d.getTime()) && d > depart && base > 0) interets += ligneInterets(depart,d,base,taux);
      base = Math.max(0, base - Number(p.montant || 0)); depart = d;
    }
    const now = new Date(); if (!Number.isNaN(depart.getTime()) && now > depart && base > 0) interets += ligneInterets(depart,now,base,taux);
  }
  const debiteur = normalizeRelation(dossier.debiteurs) || {};
  const indemnite40 = debiteur.type_debiteur === "PROFESSIONNEL" ? 40 : 0;
  return Math.round((principal + interets + indemnite40) * 100) / 100;
}
function ligneInterets(a,b,base,taux){const jours=Math.max(0,Math.floor((b-a)/86400000));return Math.round(base*(taux/100)*(jours/365)*100)/100;}
function normalizeRelation(v){return Array.isArray(v)?(v[0]||null):(v||null);}
async function restGet(path){const r=await fetch(`${SUPABASE_URL}/rest/v1/${path}`,{headers:{apikey:SUPABASE_SERVICE_ROLE_KEY,Authorization:`Bearer ${SUPABASE_SERVICE_ROLE_KEY}`}});const t=await r.text();if(!r.ok)throw new Error(`Supabase ${r.status}: ${t}`);return t?JSON.parse(t):[];}
async function safeJson(r){const t=await r.text();try{return t?JSON.parse(t):{};}catch{return {};}}
function json(statusCode,body){return{statusCode,headers:{"Content-Type":"application/json; charset=utf-8","Cache-Control":"no-store"},body:JSON.stringify(body)}}
