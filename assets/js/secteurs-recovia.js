/* RECOVIA - menu Solutions commun sur les pages existantes. */
document.addEventListener('DOMContentLoaded', function () {
  var sectors = [
    ['recouvrement-auto-ecoles.html', 'Auto-écoles'],
    ['recouvrement-artisans.html', 'Artisans et BTP'],
    ['recouvrement-domiciliation-entreprises.html', 'Sociétés de domiciliation'],
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
