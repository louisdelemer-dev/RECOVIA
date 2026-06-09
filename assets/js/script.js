document.addEventListener('DOMContentLoaded', () => {
  const cards = document.querySelectorAll('.card, .step, .choice, .panel');
  cards.forEach((el) => {
    el.addEventListener('mouseenter', () => el.setAttribute('aria-selected', 'true'));
    el.addEventListener('mouseleave', () => el.removeAttribute('aria-selected'));
  });

  const header = document.querySelector('.header');
  const menuButton = document.querySelector('.menu-toggle');
  const nav = document.querySelector('.nav');

  if (header && menuButton && nav) {
    menuButton.addEventListener('click', () => {
      const isOpen = header.classList.toggle('menu-open');
      menuButton.setAttribute('aria-expanded', String(isOpen));
      menuButton.textContent = isOpen ? 'Fermer' : 'Menu';
    });

    nav.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => {
        header.classList.remove('menu-open');
        menuButton.setAttribute('aria-expanded', 'false');
        menuButton.textContent = 'Menu';
      });
    });

    window.addEventListener('resize', () => {
      if (window.innerWidth > 1120) {
        header.classList.remove('menu-open');
        menuButton.setAttribute('aria-expanded', 'false');
        menuButton.textContent = 'Menu';
      }
    });
  }
});
