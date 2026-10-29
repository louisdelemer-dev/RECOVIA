(() => {
 'use strict';
 const $ = id => document.getElementById(id);
 const element = (tag, className, value) => { const n = document.createElement(tag); if(className)n.className=className;if(value!==undefined)n.textContent=String(value);return n; };
 const fmt = n => new Intl.NumberFormat('fr-FR',{style:'currency',currency:'EUR',maximumFractionDigits:0}).format(n);
 const humanDate = s => { if(!s)return 'Date non précisée'; const d = new Date(/^\d{8}$/.test(s)?`${s.slice(0,4)}-${s.slice(4,6)}-${s.slice(6)}`:s); return Number.isFinite(d.getTime())?d.toLocaleDateString('fr-FR'):'Date non précisée'; };
 function graph(data){
  const target=$('ra-finance-chart');if(!target)return;target.replaceChildren();
  const values=Object.entries(data||{}).filter(([y,r])=>/^\d{4}$/.test(y)&&r&&typeof r==='object'&&r.ca!==null&&r.ca!==undefined&&Number.isFinite(Number(r.ca))&&Number(r.ca)>=0).sort((a,b)=>Number(a[0])-Number(b[0])).slice(-6);
  if(values.length<2){target.append(element('p','ra-help','Graphique disponible à partir de deux exercices avec chiffre d’affaires publié.'));return;}
  target.append(element('h3','ra-v5-heading','Évolution du chiffre d’affaires'));
  const max=Math.max(...values.map(([,r])=>Number(r.ca)),1);
  const plot=element('div','ra-v5-bars');plot.setAttribute('role','img');plot.setAttribute('aria-label','Chiffre d’affaires publié par exercice : '+values.map(([y,r])=>`${y} : ${fmt(Number(r.ca))}`).join(', '));
  values.forEach(([year,r])=>{const item=element('div','ra-v5-bar-item');const label=element('span','ra-v5-bar-number',fmt(Number(r.ca)));const track=element('div','ra-v5-bar-track');const bar=element('div','ra-v5-bar');bar.style.height=`${Math.max(3,Number(r.ca)/max*100)}%`;track.append(bar);item.append(label,track,element('span','ra-v5-year',year));plot.append(item);});
  target.append(plot,element('p','ra-help','Données publiques issues de l’API Recherche d’entreprises. Exercices disponibles uniquement ; absence de données ne signifie pas absence de dépôt.'));
 }
 function docs(){
  const container=$('ra-documents');if(!container)return;
  const h=element('div','ra-v5-document-note');h.append(element('strong','','Bibliothèque documentaire'),element('p','','Les extraits sont délivrés par les administrations. Les comptes et actes sont accessibles selon leur publicité et les accès disponibles ; aucun PDF non vérifié n’est présenté comme téléchargeable.'));
  container.parentNode.insertBefore(h,container);
 }
 async function timeline(siren){
  const target=$('ra-v5-timeline');if(!target)return;
  try{
   const ctrl=new AbortController();const timer=setTimeout(()=>ctrl.abort(),14000);let response;
   try{response=await fetch('/.netlify/functions/annuaire-bodacc?siren='+encodeURIComponent(siren),{signal:ctrl.signal,headers:{Accept:'application/json'}});}finally{clearTimeout(timer);}
   if(!response.ok)throw new Error('Annonces indisponibles pour le moment.');
   const data=await response.json();target.replaceChildren();const items=Array.isArray(data.results)?data.results:[];
   if(!items.length){target.append(element('p','ra-help','Aucune annonce retrouvée par cette recherche dans le registre BODACC. Ce résultat ne garantit pas l’absence de publication.'));return;}
   items.forEach(item=>{const card=element('article','ra-v5-event');const date=element('div','ra-v5-date',humanDate(item.dateparution));const text=element('div','ra-v5-event-text');text.append(element('strong','',item.familleavis_lib||'Publication officielle'),element('p','',item.typeavis_lib||'Annonce publiée au BODACC'));const a=element('a','ra-v5-event-link','Consulter l’annonce officielle ↗');a.href=item.url;a.target='_blank';a.rel='noopener noreferrer';text.append(a);card.append(date,text);target.append(card);});
   if(data.truncated)target.append(element('p','ra-help','Affichage limité aux 15 dernières annonces retrouvées. Recherchez les publications antérieures sur le BODACC.'));
  } catch(error){target.replaceChildren(element('p','ra-help','Impossible de charger les annonces BODACC actuellement. Consultez le lien vers le registre officiel ci-dessus.'));}
 }
 window.RECOVIA_V5=(company,siren)=>{graph(company.finances);docs();timeline(siren);};
})();
