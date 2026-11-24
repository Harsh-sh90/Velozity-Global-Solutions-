import crypto from 'node:crypto';
import { getStore } from '@netlify/blobs';
export const headers={'Content-Type':'application/json','Access-Control-Allow-Origin':'*','Access-Control-Allow-Headers':'Content-Type, Authorization','Access-Control-Allow-Methods':'GET, POST, DELETE, OPTIONS'};
export const json=(statusCode,body)=>({statusCode,headers,body:JSON.stringify(body)});
export const store=()=>getStore('bir-bangran-content');
export function tokenFor(){const exp=Date.now()+12*60*60*1000;const payload=Buffer.from(JSON.stringify({admin:true,exp})).toString('base64url');const sig=crypto.createHmac('sha256',process.env.ADMIN_SECRET||'').update(payload).digest('base64url');return payload+'.'+sig}
export function authorised(event){try{const t=(event.headers.authorization||'').replace(/^Bearer /i,'');const [p,s]=t.split('.');const sig=crypto.createHmac('sha256',process.env.ADMIN_SECRET||'').update(p).digest('base64url');return !!process.env.ADMIN_SECRET&&crypto.timingSafeEqual(Buffer.from(s),Buffer.from(sig))&&JSON.parse(Buffer.from(p,'base64url').toString()).exp>Date.now()}catch{return false}}
export const readBody=e=>{try{return JSON.parse(e.body||'{}')}catch{return {}}};
