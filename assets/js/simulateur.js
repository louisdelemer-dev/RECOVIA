(()=>{'use strict';
const $=id=>document.getElementById(id);
const euro=new Intl.NumberFormat('fr-FR',{style:'currency',currency:'EUR',maximumFractionDigits:0});
const pct=new Intl.NumberFormat('fr-FR',{style:'percent',maximumFractionDigits:0});
/* Coefficients illustratifs à remplacer uniquement après calibration sur données RECOVIA fiables. */
const base={b2b:.78,b2c:.72};
const kind={commercial:1.06,services:1,fees:.98,education:.98,rent:.94,other:.96};
const age={0:1.08,1:1,2:.84,3:.64,4:.38};
const reminder={none:1.04,one:1,many:.90};
const ageLabels={'0':'moins de 30 jours','1':'30 à 90 jours','2':'3 à 6 mois','3':'6 à 12 mois','4':'plus de 12 mois'};
const kindLabels={commercial:'facture commerciale',services:'prestation de services',fees:'honoraires',education:'formation / scolarité',rent:'loyers et charges',other:'autre créance'};
const reminderLabels={none:'aucune relance',one:'une relance',many:'plusieurs relances'};
const radio=name=>document.querySelector(`input[name="${name}"]:checked`)?.value;
function calc(e){if(e)e.preventDefault();const count=Number($('count').value),avg=Number($('average').value);
if(!$('count').value.trim()||!$('average').value.trim()||!Number.isInteger(count)||count<1||count>100000||!Number.isFinite(avg)||avg<1||avg>10000000){$('sim-results').hidden=true;$('sim-pending').hidden=false;document.querySelector('.results').classList.add('is-pending');return;}
$('sim-results').hidden=false;$('sim-pending').hidden=true;document.querySelector('.results').classList.remove('is-pending');
const customer=radio('customer')||'b2b',type=$('debt-kind').value,days=$('age').value,rem=radio('reminders')||'one';
// Hypothèses illustratives et non résultats constatés par RECOVIA.
const central=Math.max(.08,Math.min(.92,base[customer]*(kind[type]||1)*(age[days]||1)*(reminder[rem]||1)));
const low=Math.max(0,central-.06),high=Math.min(1,central+.06); // 12 points de pourcentage.
const total=count*avg, collectedLow=total*low,collectedHigh=total*high;
// Honoraires illustratifs : 8 % HT sur les encaissements estimés.
// Simulation illustrative, pas un barème contractuel ni une offre tarifaire.
const feeLow=collectedLow*.08,feeHigh=collectedHigh*.08;
const ttcLow=feeLow*1.2,ttcHigh=feeHigh*1.2;
animateNumber('total',[total],false);
$('summary').textContent=`${count.toLocaleString('fr-FR')} dossier${count>1?'s':''} · ${euro.format(avg)} de montant moyen`;
animateNumber('estimated-rate',[low,high],true);
$('estimated-bar').style.width=`${Math.round(high*100)}%`;
animateNumber('collected',[collectedLow,collectedHigh],false);
animateNumber('fees',[feeLow,feeHigh],false);
animateNumber('net',[Math.max(0,collectedLow-ttcLow),Math.max(0,collectedHigh-ttcHigh)],false);
$('assumptions').textContent=`${customer.toUpperCase()} · ${kindLabels[type]} · ${ageLabels[days]} · ${reminderLabels[rem]}`;
$('rate-factors').textContent='Fourchette indicative de 12 points, issue de paramètres illustratifs, non de statistiques RECOVIA.';
const params=new URLSearchParams({demande:'simulation-recouvrement',dossiers:String(count),montant:String(Math.round(total)),clientele:customer,anciennete:days});
$('contact-cta').href='contact.html?'+params.toString();}
const numberAnimations=new Map();
function animateNumber(id,values,asPercent){
 const node=$(id); const old=numberAnimations.get(id);
 if(old)cancelAnimationFrame(old.raf);
 const previous=(old && old.target.length===values.length)?old.target:values.map(()=>0);
 const target=values.slice(),start=performance.now(),duration=460;
 const format=nums=>nums.map(n=>asPercent?pct.format(n):euro.format(n)).join(' à ');
 if(window.matchMedia('(prefers-reduced-motion: reduce)').matches){node.textContent=format(target);numberAnimations.set(id,{target,raf:null});return;}
 const state={target,raf:null};numberAnimations.set(id,state);
 function frame(now){const t=Math.min(1,(now-start)/duration),ease=1-Math.pow(1-t,3);
 node.textContent=format(target.map((n,i)=>previous[i]+(n-previous[i])*ease));
 if(t<1)state.raf=requestAnimationFrame(frame);
 }
 state.raf=requestAnimationFrame(frame);
}
document.addEventListener('DOMContentLoaded',()=>{
 const form=$('sim-form');
 form.addEventListener('submit',event=>event.preventDefault());
 const update=()=>{
   calc();
   if(!$('sim-results').hidden){$('sim-pending').hidden=true;document.querySelector('.results').classList.remove('is-pending');}
 };
 form.addEventListener('input',update);
 form.addEventListener('change',update);
 update();
});
})();