document.addEventListener('DOMContentLoaded', () => {
  const cards = document.querySelectorAll('.card, .step, .choice, .panel');
  cards.forEach((el) => {
    el.addEventListener('mouseenter', () => el.setAttribute('aria-selected', 'true'));
    el.addEventListener('mouseleave', () => el.removeAttribute('aria-selected'));
  });
});

// Correctif stable menu mobile — 2026-06-09
(function () {
  function initMobileMenu() {
    var button = document.querySelector('.menu-toggle');
    var nav = document.querySelector('.nav');
    if (!button || !nav) return;

    button.addEventListener('click', function () {
      var isOpen = nav.classList.toggle('is-open');
      button.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
      button.textContent = isOpen ? 'Fermer' : 'Menu';
    });

    nav.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        nav.classList.remove('is-open');
        button.setAttribute('aria-expanded', 'false');
        button.textContent = 'Menu';
      });
    });

    window.addEventListener('resize', function () {
      if (window.innerWidth > 1120) {
        nav.classList.remove('is-open');
        button.setAttribute('aria-expanded', 'false');
        button.textContent = 'Menu';
      }
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initMobileMenu);
  } else {
    initMobileMenu();
  }
})();
