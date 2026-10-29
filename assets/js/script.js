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

// Google tag + consentement cookies RECOVIA — 2026-10-29
(function () {
  var GOOGLE_TAG_ID = 'G-QY72109W09';
  var CONSENT_KEY = 'recovia_google_consent';
  var LEAD_SESSION_KEY = 'recovia_generate_lead_sent';

  function injectConsentStyles() {
    if (document.getElementById('recovia-cookie-consent-styles')) return;
    var style = document.createElement('style');
    style.id = 'recovia-cookie-consent-styles';
    style.textContent =
      '.rc-cookie-banner{position:fixed;left:18px;right:18px;bottom:18px;z-index:99999;max-width:920px;margin:0 auto;background:#fff;border:1px solid #d9e2ee;border-radius:14px;box-shadow:0 16px 45px rgba(15,35,62,.22);padding:18px 20px;color:#172b49;font-family:inherit}' +
      '.rc-cookie-banner[hidden]{display:none!important}.rc-cookie-banner p{margin:0 0 13px;line-height:1.55;font-size:14px}.rc-cookie-banner a{color:#173e72;text-decoration:underline}' +
      '.rc-cookie-actions{display:flex;gap:10px;flex-wrap:wrap}.rc-cookie-btn{border:1px solid #173e72;border-radius:8px;padding:10px 16px;font:inherit;font-weight:700;cursor:pointer;background:#fff;color:#173e72}' +
      '.rc-cookie-btn-primary{background:#173e72;color:#fff}.rc-cookie-settings{position:fixed;left:16px;bottom:16px;z-index:99998;border:1px solid #ccd7e5;background:#fff;color:#173e72;border-radius:999px;padding:8px 12px;font:inherit;font-size:12px;font-weight:700;box-shadow:0 5px 18px rgba(15,35,62,.12);cursor:pointer}' +
      '@media(max-width:600px){.rc-cookie-banner{left:10px;right:10px;bottom:10px;padding:16px}.rc-cookie-actions{display:grid;grid-template-columns:1fr 1fr}.rc-cookie-settings{left:10px;bottom:10px}}';
    document.head.appendChild(style);
  }

  function isLeadConfirmationPage() {
    return /\/contact-envoye(?:\.html)?\/?$/.test(window.location.pathname);
  }

  function sendLeadEventOnce() {
    if (!isLeadConfirmationPage() || typeof window.gtag !== 'function') return;
    try {
      if (sessionStorage.getItem(LEAD_SESSION_KEY) === '1') return;
      window.gtag('event', 'generate_lead', {
        lead_source: 'contact_form',
        page_location: window.location.href
      });
      sessionStorage.setItem(LEAD_SESSION_KEY, '1');
    } catch (e) {
      window.gtag('event', 'generate_lead', { lead_source: 'contact_form' });
    }
  }

  function loadGoogleTag() {
    if (window.__recoviaGoogleTagLoaded) {
      sendLeadEventOnce();
      return;
    }
    window.__recoviaGoogleTagLoaded = true;
    window.dataLayer = window.dataLayer || [];
    window.gtag = window.gtag || function(){ window.dataLayer.push(arguments); };

    window.gtag('consent', 'default', {
      analytics_storage: 'granted',
      ad_storage: 'granted',
      ad_user_data: 'granted',
      ad_personalization: 'granted'
    });

    window.gtag('js', new Date());
    window.gtag('config', GOOGLE_TAG_ID);

    var tag = document.createElement('script');
    tag.async = true;
    tag.src = 'https://www.googletagmanager.com/gtag/js?id=' + encodeURIComponent(GOOGLE_TAG_ID);
    tag.onload = sendLeadEventOnce;
    document.head.appendChild(tag);
  }

  function saveConsent(value) {
    try { localStorage.setItem(CONSENT_KEY, value); } catch (e) {}
  }

  function getConsent() {
    try { return localStorage.getItem(CONSENT_KEY); } catch (e) { return null; }
  }

  function createConsentUi() {
    injectConsentStyles();

    var banner = document.createElement('div');
    banner.className = 'rc-cookie-banner';
    banner.id = 'recovia-cookie-banner';
    banner.setAttribute('role', 'dialog');
    banner.setAttribute('aria-live', 'polite');
    banner.setAttribute('aria-label', 'Gestion des cookies');
    banner.innerHTML =
      '<p><strong>Mesure d’audience et publicité</strong><br>Avec votre accord, RECOVIA utilise la balise Google pour mesurer l’audience du site et les demandes issues de ses campagnes publicitaires. Vous pouvez accepter ou refuser ces cookies. <a href="/politique-confidentialite.html">En savoir plus</a>.</p>' +
      '<div class="rc-cookie-actions">' +
        '<button type="button" class="rc-cookie-btn rc-cookie-btn-primary" data-cookie-choice="granted">Accepter</button>' +
        '<button type="button" class="rc-cookie-btn" data-cookie-choice="denied">Refuser</button>' +
      '</div>';
    document.body.appendChild(banner);

    var settings = document.createElement('button');
    settings.type = 'button';
    settings.className = 'rc-cookie-settings';
    settings.textContent = 'Gérer les cookies';
    settings.setAttribute('aria-controls', 'recovia-cookie-banner');
    document.body.appendChild(settings);

    banner.addEventListener('click', function (event) {
      var button = event.target.closest('[data-cookie-choice]');
      if (!button) return;
      var choice = button.getAttribute('data-cookie-choice');
      saveConsent(choice);
      banner.hidden = true;
      if (choice === 'granted') loadGoogleTag();
    });

    settings.addEventListener('click', function () {
      banner.hidden = false;
    });

    var current = getConsent();
    if (current === 'granted') {
      banner.hidden = true;
      loadGoogleTag();
    } else if (current === 'denied') {
      banner.hidden = true;
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', createConsentUi);
  } else {
    createConsentUi();
  }
})();
