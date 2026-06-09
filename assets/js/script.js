document.addEventListener("DOMContentLoaded", () => {
  const revealItems = document.querySelectorAll(".card, .step, .choice, .panel, .dashboard-card");
  revealItems.forEach((item) => item.classList.add("ready"));
});
