(() => {
  const form = document.getElementById("payment-form");
  if (!form) return;
  const submit = document.getElementById("payment-submit");
  const message = document.getElementById("payment-message");
  const referenceInput = document.getElementById("reference");
  const amountInput = document.getElementById("amount");
  const emailInput = document.getElementById("email");

  const show = (text, type = "error") => {
    message.textContent = text || "";
    message.className = `payment-message ${text ? `is-${type}` : ""}`;
  };

  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    show("");
    const reference = referenceInput.value.trim();
    const email = emailInput.value.trim();
    const amount = Number(amountInput.value.trim().replace(/\s/g, "").replace(",", "."));
    if (!reference || !/^\S+@\S+\.\S+$/.test(email) || !Number.isFinite(amount) || amount <= 0) {
      show("Veuillez renseigner votre référence, votre adresse e-mail et un montant valide.");
      return;
    }
    submit.disabled = true;
    submit.textContent = "Préparation du paiement…";
    try {
      const response = await fetch("/.netlify/functions/regler-dossier", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ reference, email, amount })
      });
      const data = await response.json().catch(() => ({}));
      if (!response.ok || !data.paymentUrl) {
        throw new Error(data.error || "Impossible de préparer le paiement.");
      }
      show("Redirection vers le paiement sécurisé…", "success");
      window.location.assign(data.paymentUrl);
    } catch (error) {
      show(error.message || "Une erreur est survenue. Veuillez réessayer.");
      submit.disabled = false;
      submit.textContent = "Régler par carte bancaire";
    }
  });
})();