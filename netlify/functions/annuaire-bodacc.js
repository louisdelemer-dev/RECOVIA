'use strict';
// Proxy dédié : limite la réponse aux champs publics strictement nécessaires.
exports.handler = async (event) => {
 const siren=String(event.queryStringParameters?.siren||'').trim();
 const headers={'Content-Type':'application/json; charset=utf-8','Cache-Control':'public, max-age=600'};
 if(!/^\d{9}$/.test(siren))return {statusCode:400,headers,body:JSON.stringify({error:'SIREN invalide'})};
 const spaced=siren.replace(/(\d{3})(\d{3})(\d{3})/,'$1 $2 $3');
 const where=`registre like "%${siren}%" OR registre like "%${spaced}%"`;
 const url=new URL('https://bodacc-datadila.opendatasoft.com/api/explore/v2.1/catalog/datasets/annonces-commerciales/records');
 url.searchParams.set('where',where);url.searchParams.set('order_by','dateparution desc');url.searchParams.set('limit','30');
 const controller=new AbortController();const timeout=setTimeout(()=>controller.abort(),10000);
 try{
  const res=await fetch(url,{headers:{Accept:'application/json','User-Agent':'RECOVIA-Annuaire/1.0 (https://recovia-france.fr)'},signal:controller.signal});
  if(!res.ok)throw Error('Upstream '+res.status);
  const data=await res.json();
  const matches=(data.results||[]).filter(r=>{
   const reg=String(r.registre||'').replace(/\D/g,'');return reg.includes(siren);
  }).slice(0,15).map(r=>({
   dateparution:r.dateparution||null,familleavis_lib:r.familleavis_lib||'',typeavis_lib:r.typeavis_lib||'',
   url:/^https:\/\/www\.bodacc\.fr\//.test(r.url_complete||'')?r.url_complete:`https://www.bodacc.fr/pages/annonces-commerciales-detail/?q.id=id:${encodeURIComponent(r.id||'')}`
  }));
  return {statusCode:200,headers,body:JSON.stringify({results:matches,truncated:Number(data.total_count||0)>15})};
 }catch(e){return {statusCode:502,headers:{...headers,'Cache-Control':'no-store'},body:JSON.stringify({error:'Source BODACC temporairement indisponible'})};}
 finally{clearTimeout(timeout);}
};
