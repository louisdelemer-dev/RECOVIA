document.addEventListener('DOMContentLoaded',function(){document.querySelectorAll('.rs-nav-toggle').forEach(function(b){b.addEventListener('click',function(e){e.stopPropagation();var g=b.closest('.rs-nav-group');var open=g.classList.toggle('rs-expanded');b.setAttribute('aria-expanded',String(open));});});document.addEventListener('click',function(e){document.querySelectorAll('.rs-nav-group.rs-expanded').forEach(function(g){if(!g.contains(e.target)){g.classList.remove('rs-expanded');var b=g.querySelector('.rs-nav-toggle');if(b)b.setAttribute('aria-expanded','false');}});});document.addEventListener('keydown',function(e){if(e.key==='Escape')document.querySelectorAll('.rs-nav-group.rs-expanded').forEach(function(g){g.classList.remove('rs-expanded');var b=g.querySelector('.rs-nav-toggle');if(b){b.setAttribute('aria-expanded','false');b.focus();}});});});
/* Secteurs RECOVIA : menu partagé sur toutes les pages */
document.addEventListener('DOMContentLoaded',function(){
 document.querySelectorAll('.rs-dropdown').forEach(function(menu){
  var wrong=menu.querySelector('a[href="recouvrement-avocats.html"]');if(wrong)wrong.textContent='Cabinets d’avocats';
  var all=menu.querySelector('a[href="secteurs-activite.html"]');
  [['recouvrement-cabinets-recrutement.html','Cabinets de recrutement'],['recouvrement-agences-interim.html','Agences d’intérim']].forEach(function(item){
   if(!menu.querySelector('a[href="'+item[0]+'"]')){var a=document.createElement('a');a.href=item[0];a.textContent=item[1];menu.insertBefore(a,all||null);}
  });
 });
});
