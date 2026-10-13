import { CATS } from './data.js'

export function level(p){
  if(p.stock <= p.min*0.5) return 'critical';
  if(p.stock <= p.min) return 'low';
  return 'ok';
}
export function sevColor(lv){
  return lv==='critical' ? 'var(--red)' : lv==='low' ? 'var(--amber)' : 'var(--accent)';
}
export function badgeMeta(lv){
  if(lv==='critical') return {bg:'var(--red-bg)', color:'var(--red)'};
  if(lv==='low') return {bg:'var(--amber-bg)', color:'var(--amber)'};
  return {bg:'var(--mint-bg)', color:'var(--accent)'};
}
export function fmt(n){ return Math.round(n).toLocaleString('en-US'); }
export function catMeta(key){ return CATS.find(c=>c.key===key) || {es:key,en:key,color:'#999'}; }
export function nm(p, lang){ return p[lang]; }
