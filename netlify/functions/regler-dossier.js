const POREC_BASE_URL = String(process.env.POREC_BASE_URL || "https://porecv2.netlify.app").replace(/\/$/, "");

exports.handler = async function (event) {
  if (event.httpMethod === "GET") {
    return json(200, { ok: true, service: "regler-dossier", message: "SERVICE DE PAIEMENT RECOVIA ACTIF." });
  }
  if (event.httpMethod !== "POST") return json(405, { error: "Méthode non autorisée." });

  let body;
  try { body = JSON.parse(event.body || "{}"); }
  catch { return json(400, { error: "Requête invalide." }); }

  const reference = String(body.reference || "").trim();
  const email = String(body.email || "").trim().toLowerCase();
  const amount = Number(body.amount);

  // La référence est volontairement libre : aucune interrogation de POREC/Supabase avant paiement.
  if (!reference || reference.length > 100 || /[\r\n\0]/.test(reference)) {
    return json(400, { error: "Veuillez renseigner une référence de dossier valide." });
  }
  if (!/^\S+@\S+\.\S+$/.test(email) || email.length > 254) {
    return json(400, { error: "Veuillez renseigner une adresse e-mail valide." });
  }
  if (!Number.isFinite(amount) || amount <= 0) {
    return json(400, { error: "Veuillez renseigner un montant valide." });
  }

  const amountRounded = Math.round(amount * 100) / 100;
  if (amountRounded < 0.01 || amountRounded > 999999.99) {
    return json(400, { error: "Le montant indiqué n'est pas valide." });
  }

  try {
    // CentralPay est appelé via la fonction serveur déjà validée de POREC.
    // Aucun accès Supabase n'est nécessaire sur le site public RECOVIA.
    const cpResponse = await fetch(`${POREC_BASE_URL}/.netlify/functions/centralpay-payment-request`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ dossierRef: reference, amount: amountRounded, email })
    });

    const cp = await safeJson(cpResponse);
    if (!cpResponse.ok || !cp?.paymentUrl || !cp?.paymentRequestId) {
      throw new Error(cp?.error || `CentralPay ${cpResponse.status}`);
    }

    // Redirection directe vers le SmartForm CentralPay. Le rapprochement est fait après paiement
    // à partir de la référence transmise dans la PaymentRequest ; aucune existence n'est révélée ici.
    return json(200, {
      ok: true,
      paymentUrl: cp.paymentUrl,
      paymentRequestId: cp.paymentRequestId
    });
  } catch (error) {
    console.error("REGLEMENT PUBLIC RECOVIA :", error);
    return json(500, {
      error: "Le paiement ne peut pas être préparé pour le moment. Veuillez réessayer ou contacter RECOVIA."
    });
  }
};

async function safeJson(response) {
  const text = await response.text();
  try { return text ? JSON.parse(text) : {}; }
  catch { return {}; }
}

function json(statusCode, body) {
  return {
    statusCode,
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "Cache-Control": "no-store",
      "X-Content-Type-Options": "nosniff"
    },
    body: JSON.stringify(body)
  };
}
