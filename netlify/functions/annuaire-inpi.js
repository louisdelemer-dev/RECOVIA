// RECOVIA V7 — Proxy documentaire INPI (identifiants exclusivement côté Netlify)
const ORIGIN='https://registre-national-entreprises.inpi.fr';
const headers={'Content-Type':'application/json; charset=utf-8','Cache-Control':'no-store','X-Content-Type-Options':'nosniff'};
const reply=(statusCode,body)=>({statusCode,headers,body:JSON.stringify(body)});
const validId=v=>typeof v==='string'&&/^[a-zA-Z0-9_-]{1,160}$/.test(v);
async function access(path,token,signal){return fetch(ORIGIN+path,{headers:{Authorization:`Bearer ${token}`,Accept:'application/json'},signal});}
async function tokenFor(signal){const r=await fetch(ORIGIN+'/api/sso/login',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({username:process.env.INPI_USERNAME,password:process.env.INPI_PASSWORD}),signal});if(!r.ok)throw Error('INPI_AUTH');const json=await r.json();if(!json.token)throw Error('INPI_AUTH');return json.token;}
async function attachments(siren,token,signal){const r=await access('/api/companies/'+siren+'/attachments',token,signal);if(!r.ok)throw Error('INPI_FETCH');return r.json();}
function publicDoc(d){return d&&d.deleted!==true&&String(d.confidentiality||'').toLowerCase()==='public'&&validId(d.id);}
function normalize(d,type){let types=Array.isArray(d.typeRdd)?d.typeRdd.map(x=>x.typeActe).filter(Boolean):[];return {id:d.id,type,label:type==='actes'?(types.join(' · ')||'Acte ou statuts déposés'):'Comptes annuels publiés',date:d.dateDepot||d.updatedAt||'',cloture:type==='bilans'?(d.dateCloture||''):''};}
exports.handler=async(event)=>{
 if(event.httpMethod!=='GET')return reply(405,{error:'Méthode non autorisée'});
 const params=event.queryStringParameters||{},siren=params.siren||'';
 if(!/^\d{9}$/.test(siren))return reply(400,{error:'SIREN invalide'});
 if(!process.env.INPI_USERNAME||!process.env.INPI_PASSWORD)return reply(503,{code:'NOT_CONFIGURED',error:'Accès INPI à configurer dans Netlify'});
 const ctrl=new AbortController(),timer=setTimeout(()=>ctrl.abort(),12000);
 try{
  const token=await tokenFor(ctrl.signal);const data=await attachments(siren,token,ctrl.signal);
  const actes=(Array.isArray(data.actes)?data.actes:[]).filter(publicDoc);
  const bilans=(Array.isArray(data.bilans)?data.bilans:[]).filter(publicDoc);
  if(params.id||params.type){const type=params.type,id=params.id;
   if(!['actes','bilans'].includes(type)||!validId(id))return reply(400,{error:'Document invalide'});
   const items=type==='actes'?actes:bilans;
   if(!items.some(d=>d.id===id))return reply(404,{error:'Document public introuvable'});
   const route=type==='actes'?'actes':'bilans';const r=await fetch(ORIGIN+'/api/'+route+'/'+encodeURIComponent(id)+'/download',{headers:{Authorization:`Bearer ${token}`,Accept:'application/pdf'},signal:ctrl.signal});
   if(!r.ok)return reply(502,{error:'Téléchargement indisponible'});
   const buffer=Buffer.from(await r.arrayBuffer());if(buffer.length>9_000_000)return reply(413,{error:'Document trop volumineux'});
   if(buffer.subarray(0,5).toString()!=='%PDF-')return reply(502,{error:'Document non PDF retourné par la source'});
   return {statusCode:200,isBase64Encoded:true,headers:{'Content-Type':'application/pdf','Content-Disposition':`inline; filename="INPI-${siren}-${type}.pdf"`,'Cache-Control':'private, no-store','X-Content-Type-Options':'nosniff'},body:buffer.toString('base64')};
  }
  const byDate=(a,b)=>String(b.date||'').localeCompare(String(a.date||''));
  return reply(200,{source:'INPI',siren,actes:actes.map(x=>normalize(x,'actes')).sort(byDate).slice(0,80),bilans:bilans.map(x=>normalize(x,'bilans')).sort(byDate).slice(0,80)});
 }catch(e){return reply(502,{error:'Service INPI indisponible ou accès refusé'});}finally{clearTimeout(timer);}
};
