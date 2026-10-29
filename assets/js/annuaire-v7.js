(() => {
'use strict';
const panel=document.getElementById('ra-inpi-library');if(!panel)return;
const siren=new URLSearchParams(location.search).get('siren');if(!/^\d{9}$/.test(siren||'')){panel.textContent='SIREN invalide.';return;}
const el=(tag,cls,txt)=>{const n=document.createElement(tag);if(cls)n.className=cls;if(txt!==undefined)n.textContent=String(txt);return n;};
const niceDate=value=>{if(!value)return 'Date non renseignée';const d=new Date(value);return Number.isNaN(d.getTime())?'Date non renseignée':d.toLocaleDateString('fr-FR');};
function message(text,withLink=false){panel.replaceChildren();const p=el('p','ra-v7-state',text);panel.append(p);if(withLink){const a=el('a','','Consulter les documents sur DATA INPI ↗');a.href='https://data.inpi.fr/';a.target='_blank';a.rel='noopener noreferrer';panel.append(a);}}
async function load(){
try{
 const ctrl=new AbortController();const timer=setTimeout(()=>ctrl.abort(),13000);let response;
 try{response=await fetch('/.netlify/functions/annuaire-inpi?siren='+siren,{signal:ctrl.signal,headers:{Accept:'application/json'}});}finally{clearTimeout(timer);}
 const payload=await response.json().catch(()=>({}));
 if(response.status===503 && payload.code==='NOT_CONFIGURED'){message('La bibliothèque documentaire intégrée n’est pas encore activée. Les justificatifs et liens vers les sources officielles restent accessibles ci-dessus.',true);return;}
 if(!response.ok)throw Error('Le registre INPI ne répond pas pour le moment.');
 const acts=Array.isArray(payload.actes)?payload.actes:[];const balances=Array.isArray(payload.bilans)?payload.bilans:[];panel.replaceChildren();
 const head=el('div','ra-v7-toolbar');head.append(el('h3','','Bibliothèque des actes et comptes'),el('span','ra-v7-source','Source officielle : INPI · documents publics'));panel.append(head);
 const tabs=el('div','ra-v7-tabs'),list=el('div','ra-v7-list');panel.append(tabs,list);
 function show(kind){list.replaceChildren();const items=kind==='actes'?acts:balances;Array.from(tabs.children).forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.kind===kind)));
 if(!items.length){list.append(el('p','ra-v7-empty','Aucun document public disponible dans cette catégorie pour cette entreprise.'));return;}
 for(const doc of items){const row=el('article','ra-v7-item'),left=el('div');left.append(el('strong','',doc.label||'Document officiel'),el('p','',`Dépôt : ${niceDate(doc.date)}${doc.cloture?' · Clôture : '+niceDate(doc.cloture):''}`));row.append(left);const a=el('a','ra-v7-download','Consulter le PDF ↗');a.href='/.netlify/functions/annuaire-inpi?siren='+siren+'&type='+encodeURIComponent(doc.type)+'&id='+encodeURIComponent(doc.id);a.target='_blank';a.rel='noopener noreferrer';row.append(a);list.append(row);}
 }
 for(const [kind,label,count] of [['actes','Actes et statuts',acts.length],['bilans','Comptes annuels',balances.length]]){const b=el('button','ra-v7-tab',`${label} (${count})`);b.type='button';b.dataset.kind=kind;b.addEventListener('click',()=>show(kind));tabs.append(b);}
 show(acts.length?'actes':'bilans');panel.append(el('p','ra-v7-footnote','Les documents confidentiels, supprimés ou non disponibles ne sont pas distribués. Une absence de résultat ne signifie pas qu’aucun document n’a été déposé.'));
}catch(error){message('La bibliothèque INPI est temporairement indisponible. Vous pouvez toujours utiliser les liens vers les registres officiels.',true);}}
load();
})();
