import { useState } from 'react'
import Icon from '../Icon.jsx'
import { CATS } from '../data.js'
import { level, sevColor, badgeMeta, nm, catMeta } from '../utils.js'

export default function Products({ L, lang, products, query, onOpenDetail }) {
  const [cat, setCat] = useState('all');
  const q = query.trim().toLowerCase();
  const filtered = products.filter(p => {
    const okCat = cat === 'all' || p.cat === cat;
    const okQ = !q || nm(p, lang).toLowerCase().includes(q) || p.sku.toLowerCase().includes(q) || p.loc.toLowerCase().includes(q);
    return okCat && okQ;
  });

  const chips = [{ key: 'all', label: L.ui.all }].concat(CATS.map(c => ({ key: c.key, label: lang === 'es' ? c.es : c.en })));

  return (
    <div className="scIn" style={{ maxWidth: 1240, margin: '0 auto' }}>
      <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: 16, flexWrap: 'wrap', marginBottom: 18 }}>
        <div>
          <h1 style={{ margin: 0, fontSize: 24, fontWeight: 700, letterSpacing: '-.025em' }}>{L.nav.products}</h1>
          <p style={{ margin: '5px 0 0', color: 'var(--muted)', fontSize: 14 }}>{filtered.length} {L.ui.of} {products.length} {L.ui.products}</p>
        </div>
        <button className="btn-primary hoverable" style={{ padding: '10px 16px', borderRadius: 11, fontSize: 13.5, fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 8 }}>
          <Icon name="plus" size={16} />{L.ui.addProduct}
        </button>
      </div>

      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 16 }}>
        {chips.map(c => {
          const on = cat === c.key;
          return (
            <button key={c.key} onClick={() => setCat(c.key)} style={{ padding: '7px 14px', border: `1px solid ${on ? 'var(--accent)' : 'var(--line)'}`, borderRadius: 20, background: on ? 'var(--accent)' : 'var(--card)', color: on ? '#fff' : 'var(--ink)', fontSize: 13, fontWeight: 600, cursor: 'pointer', transition: 'all .15s' }}>
              {c.label}
            </button>
          );
        })}
      </div>

      <div style={{ background: 'var(--card)', border: '1px solid var(--line)', borderRadius: 16, overflow: 'hidden' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 2fr 1.2fr 0.9fr 1.4fr 1fr 40px', gap: 14, padding: '13px 20px', borderBottom: '1px solid var(--line)', fontSize: 11.5, fontWeight: 700, color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '.04em' }}>
          <span>SKU</span><span>{L.ui.product}</span><span>{L.ui.category}</span><span>{L.ui.location}</span><span>{L.ui.stock}</span><span>{L.ui.status}</span><span></span>
        </div>
        {filtered.map((p, i) => {
          const lv = level(p), bm = badgeMeta(lv);
          const pct = Math.min(100, Math.round(p.stock / p.max * 100));
          return (
            <div key={p.sku} onClick={() => onOpenDetail(p.sku)} className="hoverable" style={{ display: 'grid', gridTemplateColumns: '1.2fr 2fr 1.2fr 0.9fr 1.4fr 1fr 40px', gap: 14, padding: '14px 20px', borderBottom: '1px solid #f0f4f1', alignItems: 'center', cursor: 'pointer', animation: 'scIn .4s both', animationDelay: `${i * 45}ms` }}>
              <span style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 13, fontWeight: 600, color: 'var(--muted)' }}>{p.sku}</span>
              <span style={{ fontSize: 14, fontWeight: 600, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{nm(p, lang)}</span>
              <span style={{ fontSize: 13, color: 'var(--muted)' }}>{lang === 'es' ? catMeta(p.cat).es : catMeta(p.cat).en}</span>
              <span style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 13, color: 'var(--ink)' }}>{p.loc}</span>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
                <span style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 13.5, fontWeight: 600 }}>{p.stock} <span style={{ color: '#b7c0b9', fontWeight: 400 }}>/ {p.max}</span></span>
                <div style={{ height: 6, borderRadius: 4, background: '#eef2ef', overflow: 'hidden' }}>
                  <div className="growH" style={{ height: '100%', width: `${pct}%`, background: sevColor(lv), borderRadius: 4, animationDelay: `${i * 45}ms` }}></div>
                </div>
              </div>
              <span>
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: 5, padding: '4px 10px', borderRadius: 20, fontSize: 12, fontWeight: 600, background: bm.bg, color: bm.color }}>
                  <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'currentColor' }}></span>{L.status[lv]}
                </span>
              </span>
              <span style={{ display: 'flex', justifyContent: 'flex-end', color: '#b7c0b9' }}><Icon name="chevron" size={16} /></span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
