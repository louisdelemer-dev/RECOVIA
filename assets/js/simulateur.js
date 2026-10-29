(()=>{'use strict';
const $=id=>document.getElementById(id);
const euro=new Intl.NumberFormat('fr-FR',{style:'currency',currency:'EUR',maximumFractionDigits:0});
const pct=new Intl.NumberFormat('fr-FR',{style:'percent',maximumFractionDigits:0});
/* Coefficients illustratifs à remplacer uniquement après calibration sur données RECOVIA fiables. */
const base={b2b:.58,b2c:.50};
const kind={commercial:1.04,services:1,fees:.94,education:.95,rent:.88,other:.90};
const age={0:1.16,1:1,2:.78,3:.55,4:.30};
const reminder={none:1.07,one:1,many:.84};
const ageLabels={'0':'moins de 30 jours','1':'30 à 90 jours','2':'3 à 6 mois','3':'6 à 12 mois','4':'plus de 12 mois'};
const kindLabels={commercial:'facture commerciale',services:'prestation de services',fees:'honoraires',education:'formation / scolarité',rent:'loyers et charges',other:'autre créance'};
const reminderLabels={none:'aucune relance',one:'une relance',many:'plusieurs relances'};
const radio=name=>document.querySelector(`input[name="${name}"]:checked`)?.value;
function calc(e){if(e)e.preventDefault();const count=Number($('count').value),avg=Number($('average').value);
if(!Number.isInteger(count)||count<1||count>100000||!Number.isFinite(avg)||avg<1||avg>10000000){$('sim-form').reportValidity();return;}
const customer=radio('customer')||'b2b',type=$('debt-kind').value,days=$('age').value,rem=radio('reminders')||'one';
const rate=Math.max(.05,Math.min(.85,base[customer]*(kind[type]||1)*(age[days]||1)*(reminder[rem]||1)));
const total=count*avg, recovered=total*rate;
/* Honoraires projetés par dossier effectivement recouvré, minimum appliqué uniquement aux dossiers recouvrés. */
const expectedPaidCount=count*rate;
const standardRate=avg<500?.15:.10;
const fees=Math.min(recovered,expectedPaidCount*Math.max(20,avg*standardRate));
const ttc=fees*1.2;
$('total').textContent=euro.format(total);
$('summary').textContent=`${count.toLocaleString('fr-FR')} dossier${count>1?'s':''} · ${euro.format(avg)} de montant moyen`;
$('estimated-rate').textContent=pct.format(rate);
$('estimated-bar').style.width=`${Math.round(rate*100)}%`;
$('collected').textContent=euro.format(recovered);
$('fees').textContent=euro.format(fees);
$('fees-ttc').textContent=euro.format(ttc);
$('net').textContent=euro.format(Math.max(0,recovered-ttc));
$('assumptions').textContent=`${customer.toUpperCase()} · ${kindLabels[type]} · ${ageLabels[days]} · ${reminderLabels[rem]}`;
$('rate-factors').textContent='Estimation issue de coefficients illustratifs, non de statistiques de recouvrement RECOVIA.';
const params=new URLSearchParams({demande:'simulation-recouvrement',dossiers:String(count),montant:String(Math.round(total)),clientele:customer,anciennete:days});
$('contact-cta').href='contact.html?'+params.toString();}
document.addEventListener('DOMContentLoaded',()=>{const form=$('sim-form');form.addEventListener('submit',calc);form.addEventListener('change',calc);for(const id of ['count','average'])$(id).addEventListener('input',calc);calc();});
})();