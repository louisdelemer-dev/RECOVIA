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
    // POREC cree la PaymentRequest et memorise une intention de paiement publique.
    // Aucun acces Supabase ni identifiant CentralPay n'est expose sur le site RECOVIA.
    const cpResponse = await fetch(`${POREC_BASE_URL}/.netlify/functions/public-payment-request`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ reference, amount: amountRounded, email })
    });

    const cp = await safeJson(cpResponse);
    if (!cpResponse.ok || !cp?.paymentUrl || !cp?.paymentRequestId) {
      throw new Error(cp?.error || `CentralPay ${cpResponse.status}`);
    }

    // Redirection vers le SmartForm CentralPay. Après paiement, POREC tente le rapprochement.
    // Une reference inexistante ou ambigue reste en A_RAPPROCHER au lieu de perdre le paiement.
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
