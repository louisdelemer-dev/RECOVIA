/* RECOVIA - menu Solutions commun sur les pages existantes. */
document.addEventListener('DOMContentLoaded', function () {
  var sectors = [
    ['recouvrement-auto-ecoles.html', 'Auto-écoles'],
    ['recouvrement-artisans.html', 'Artisans et BTP'],
    ['recouvrement-domiciliation-entreprises.html', 'Sociétés de domiciliation'],
    ['recouvrement-agences-immobilieres.html', 'Agences immobilières'],
    ['recouvrement-avocats.html', 'Cabinets d’avocats'],
    ['recouvrement-salles-de-sport.html', 'Salles de sport'],
    ['recouvrement-garagistes.html', 'Garages automobiles'],
    ['recouvrement-cabinets-recrutement.html', 'Cabinets de recrutement'],
    ['recouvrement-agences-interim.html', 'Agences d’intérim']
  ];
  document.querySelectorAll('.rs-nav-group').forEach(function (group) {
    var button = group.querySelector('.rs-nav-toggle');
    var menu = group.querySelector('.rs-dropdown');
    if (!button || !menu) return;
    // Reconstruit uniquement le contenu du sous-menu, sans toucher au reste de la navigation.
    menu.textContent = '';
    var solutions = document.createElement('div');
    solutions.className = 'rs-menu-column';
    var solTitle = document.createElement('span'); solTitle.className = 'rs-menu-title'; solTitle.textContent = 'Nos solutions';
    solutions.appendChild(solTitle);
    [['solutions.html', 'Toutes nos solutions'], ['solutions.html#amiable', 'Recouvrement amiable'], ['judiciaire.html', 'Recouvrement judiciaire']].forEach(function (item) {
      var a = document.createElement('a'); a.href = item[0]; a.textContent = item[1]; solutions.appendChild(a);
    });
    // Acces prioritaire aux partenariats : distinct des simples pages sectorielles.
    var partner = document.createElement('div'); partner.className = 'rs-menu-partner';
    var partnerTitle = document.createElement('span'); partnerTitle.className = 'rs-menu-title'; partnerTitle.textContent = 'Partenariats professionnels';
    var partnerLink = document.createElement('a'); partnerLink.className = 'rs-menu-partner-link';
    partnerLink.href = 'recouvrement-experts-comptables.html';
    var partnerName = document.createElement('strong'); partnerName.textContent = 'Experts-comptables';
    var partnerDesc = document.createElement('span'); partnerDesc.textContent = 'Vos honoraires impayés et des conditions privilégiées pour vos clients.';
    partnerLink.appendChild(partnerName); partnerLink.appendChild(partnerDesc);
    partner.appendChild(partnerTitle); partner.appendChild(partnerLink);
    solutions.appendChild(partner);
    var sectorCol = document.createElement('div'); sectorCol.className = 'rs-menu-column';
    var secTitle = document.createElement('span'); secTitle.className = 'rs-menu-title'; secTitle.textContent = 'Par secteur d’activité';
    sectorCol.appendChild(secTitle);
    var links = document.createElement('div'); links.className = 'rs-menu-sector-links';
    sectors.forEach(function (item) { var a = document.createElement('a'); a.href = item[0]; a.textContent = item[1]; links.appendChild(a); });
    sectorCol.appendChild(links);
    var footer = document.createElement('div'); footer.className = 'rs-menu-footer';
    var all = document.createElement('a'); all.href = 'secteurs-activite.html'; all.textContent = 'Voir tous les secteurs →'; footer.appendChild(all);
    menu.appendChild(solutions); menu.appendChild(sectorCol); menu.appendChild(footer);
    menu.classList.add('rs-menu-ready');
    button.addEventListener('click', function (e) { e.stopPropagation(); var open = group.classList.toggle('rs-expanded'); button.setAttribute('aria-expanded', String(open)); });
  });
  document.addEventListener('click', function (e) { document.querySelectorAll('.rs-nav-group.rs-expanded').forEach(function (g) { if (!g.contains(e.target)) { g.classList.remove('rs-expanded'); var b = g.querySelector('.rs-nav-toggle'); if (b) b.setAttribute('aria-expanded', 'false'); } }); });
  document.addEventListener('keydown', function (e) { if (e.key !== 'Escape') return; document.querySelectorAll('.rs-nav-group.rs-expanded').forEach(function (g) { g.classList.remove('rs-expanded'); var b = g.querySelector('.rs-nav-toggle'); if (b) { b.setAttribute('aria-expanded', 'false'); b.focus(); } }); });
});


/* RECOVIA – widget de rappel. Netlify Forms, sans prestataire payant. */
(function () {
  function initCallback() {
    var path = location.pathname.toLowerCase();
    if (/regler|payer|debiteur|candidature|mentions-legales|politique-confidentialite|cgv|contact-envoye/.test(path)) return;
    if (document.getElementById('rcb-launcher')) return;
    var root = document.createElement('div');
    root.className = 'rcb-root';
    root.innerHTML = '<button id="rcb-launcher" class="rcb-launcher" type="button" aria-expanded="false" aria-controls="rcb-panel"><span aria-hidden="true">☎</span><span>Être rappelé</span></button>' +
      '<section id="rcb-panel" class="rcb-panel" role="dialog" aria-modal="false" aria-labelledby="rcb-title" hidden>' +
      '<div class="rcb-head"><div><strong id="rcb-title">Faites-vous rappeler</strong><p>Par un conseiller RECOVIA</p></div><button type="button" class="rcb-close" aria-label="Fermer">×</button></div>' +
      '<div class="rcb-content"><p>Vous avez des factures impayées ? Laissez votre numéro et nous vous rappellerons pendant nos horaires d’ouverture.</p>' +
      '<form id="rcb-form" name="rappel-recovia" method="POST" data-netlify="true" netlify-honeypot="bot-field">' +
      '<input type="hidden" name="form-name" value="rappel-recovia"><input type="hidden" name="page" id="rcb-page"><p class="rcb-hp" aria-hidden="true"><label>Ne pas remplir <input name="bot-field" tabindex="-1" autocomplete="off"></label></p>' +
      '<label for="rcb-phone">Votre numéro de téléphone <span aria-hidden="true">*</span></label><input id="rcb-phone" name="telephone" type="tel" autocomplete="tel" inputmode="tel" placeholder="06 12 34 56 78" required maxlength="22">' +
      '<label class="rcb-consent"><input type="checkbox" name="accord_rappel" value="oui" required><span>J’accepte que RECOVIA utilise mon numéro pour me rappeler au sujet de ma demande.</span></label>' +
      '<button class="rcb-submit" type="submit">Demander mon rappel</button></form>' +
      '<div class="rcb-status" role="status" aria-live="polite" aria-atomic="true"></div>' +
      '<p class="rcb-small">Lundi au vendredi, 9 h – 18 h · Rappel gratuit, hors coût éventuel de votre opérateur.<br><a href="/politique-confidentialite.html">Confidentialité et données personnelles</a></p></div></section>';
    document.body.appendChild(root);
    var launcher=root.querySelector('#rcb-launcher'), panel=root.querySelector('#rcb-panel'), close=root.querySelector('.rcb-close');
    var form=root.querySelector('#rcb-form'), phone=root.querySelector('#rcb-phone'), status=root.querySelector('.rcb-status'), submit=root.querySelector('.rcb-submit');
    function toggle(show) {panel.hidden=!show;launcher.setAttribute('aria-expanded',String(show)); if(show)phone.focus();else launcher.focus();}
    launcher.addEventListener('click',function(){toggle(panel.hidden);});
    close.addEventListener('click',function(){toggle(false);});
    document.addEventListener('keydown',function(e){if(e.key==='Escape'&&!panel.hidden)toggle(false);});
    form.addEventListener('submit',async function(e){
      e.preventDefault();status.textContent='';status.classList.remove('rcb-success','rcb-error');
      var digits=phone.value.replace(/[^0-9+]/g,'');
      var normalized=digits.replace(/[.()\-]/g,'');
      var valid=/^0[1-9][0-9]{8}$/.test(normalized)||/^\+33[1-9][0-9]{8}$/.test(normalized)||/^0033[1-9][0-9]{8}$/.test(normalized);
      if(!valid){status.classList.add('rcb-error');status.textContent='Veuillez saisir un numéro français valide (ex. 06 12 34 56 78).';phone.focus();return;}
      if(!form.elements['accord_rappel'].checked){status.classList.add('rcb-error');status.textContent='Veuillez accepter le rappel.';return;}
      form.elements['page'].value=location.pathname+location.search;
      submit.disabled=true;submit.textContent='Transmission en cours…';
      status.classList.add('rcb-pending');
      status.innerHTML='<div class="rcb-progress" aria-hidden="true"><span class="rcb-pulse"><span>☎</span></span><span class="rcb-progress-dots"><i></i><i></i><i></i></span></div><strong>Transmission de votre demande…</strong><small>Nous vérifions sa bonne réception par RECOVIA.</small>';
      try {
        var data=new URLSearchParams(new FormData(form));
        // Conserver l'animation au moins 10 secondes, sans retarder l'envoi réel.
        // Le résultat (succès ou erreur) n'est affiché qu'après cette durée minimale.
        var results=await Promise.allSettled([
          fetch('/',{method:'POST',headers:{'Content-Type':'application/x-www-form-urlencoded'},body:data.toString()}),
          new Promise(function(resolve){setTimeout(resolve,10000);})
        ]);
        if(results[0].status!=='fulfilled'||!results[0].value.ok)throw new Error('submission failed');
        status.classList.remove('rcb-pending');
        form.reset();form.hidden=true;
        status.textContent='Merci ! Votre demande a bien été envoyée. Un conseiller RECOVIA vous rappellera pendant nos horaires d’ouverture.';
        status.classList.add('rcb-success');
      }catch(err){status.classList.remove('rcb-pending');status.classList.add('rcb-error');status.textContent='Votre demande n’a pas pu être envoyée. Vous pouvez nous appeler au 01 75 43 88 22.';}
      finally{submit.disabled=false;submit.textContent='Demander mon rappel';}
    });
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',initCallback);else initCallback();
})();
