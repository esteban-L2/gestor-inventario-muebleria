import { useState } from 'react'
import Icon from '../Icon.jsx'
import { level, sevColor, badgeMeta, nm, catMeta } from '../utils.js'

export default function Detail({ L, lang, product, movements, onBack, onMove }) {
  const [qty, setQty] = useState('10');
  if (!product) return null;
  const lv = level(product), bm = badgeMeta(lv);
  const pct = Math.min(100, Math.round(product.stock / product.max * 100));
  const minPct = Math.min(96, Math.round(product.min / product.max * 100));
  const selMoves = movements.filter(a => a.es === product.es || a.en === product.en).slice(0, 4);

  const info = [
    { k: 'SKU', v: product.sku, mono: true },
    { k: L.ui.category, v: lang === 'es' ? catMeta(product.cat).es : catMeta(product.cat).en },
    { k: L.ui.location, v: product.loc, mono: true },
    { k: L.ui.supplier, v: product.supplier },
    { k: 'Min / Max', v: `${product.min} / ${product.max}`, mono: true },
    { k: 'Precio', v: `$${product.price.toFixed(2)}`, mono: true }
  ];

  return (
    <div className="scIn" style={{ maxWidth: 1080, margin: '0 auto' }}>
      <button onClick={onBack} className="btn-ghost hoverable" style={{ display: 'flex', alignItems: 'center', gap: 7, padding: '8px 13px', borderRadius: 10, fontSize: 13, fontWeight: 600, cursor: 'pointer', marginBottom: 18 }}>
        <Icon name="back" size={16} />{L.ui.back}
      </button>
      <div style={{ display: 'flex', alignItems: 'flex-start', gap: 14, flexWrap: 'wrap', justifyContent: 'space-between', marginBottom: 20 }}>
        <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
          <div style={{ width: 60, height: 60, borderRadius: 15, background: 'var(--mint-bg)', color: 'var(--accent)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Icon name="box" size={26} />
          </div>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <h1 style={{ margin: 0, fontSize: 23, fontWeight: 700, letterSpacing: '-.02em' }}>{nm(product, lang)}</h1>
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: 5, padding: '4px 10px', borderRadius: 20, fontSize: 12, fontWeight: 600, background: bm.bg, color: bm.color }}>
                <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'currentColor' }}></span>{L.status[lv]}
              </span>
            </div>
            <div style={{ marginTop: 5, fontSize: 13.5, color: 'var(--muted)' }}>
              <span style={{ fontFamily: "'JetBrains Mono',monospace", fontWeight: 600 }}>{product.sku}</span> · {lang === 'es' ? catMeta(product.cat).es : catMeta(product.cat).en} · {product.loc}
            </div>
          </div>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1.15fr 1fr', gap: 16 }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div style={{ background: 'var(--card)', border: '1px solid var(--line)', borderRadius: 16, padding: 22 }}>
            <div style={{ fontSize: 14, fontWeight: 700, marginBottom: 18 }}>{L.detail.stockLevel}</div>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 10, marginBottom: 14 }}>
              <span style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 40, fontWeight: 700, color: sevColor(lv) }}>{product.stock}</span>
              <span style={{ fontSize: 15, color: 'var(--muted)' }}>/ {product.max} {L.ui.units}</span>
            </div>
            <div style={{ position: 'relative', height: 12, borderRadius: 7, background: '#eef2ef', overflow: 'hidden', marginBottom: 8 }}>
              <div className="growH" style={{ height: '100%', width: `${pct}%`, background: sevColor(lv), borderRadius: 7 }}></div>
            </div>
            <div style={{ position: 'relative', height: 18, fontSize: 11, color: 'var(--muted)' }}>
              <span style={{ position: 'absolute', left: `${minPct}%`, transform: 'translateX(-50%)', fontFamily: "'JetBrains Mono',monospace" }}>▲ min {product.min}</span>
            </div>
          </div>
          <div style={{ background: 'var(--card)', border: '1px solid var(--line)', borderRadius: 16, padding: 22 }}>
            <div style={{ fontSize: 14, fontWeight: 700, marginBottom: 14 }}>{L.detail.quickMove}</div>
            <div style={{ display: 'flex', gap: 12, alignItems: 'flex-end', flexWrap: 'wrap' }}>
              <label style={{ flex: 1, minWidth: 120, display: 'flex', flexDirection: 'column', gap: 6, fontSize: 12.5, fontWeight: 600, color: 'var(--muted)' }}>
                {L.ui.qty}
                <input value={qty} onChange={e => setQty(e.target.value)} type="number" min="1" style={{ padding: '11px 13px', border: '1px solid var(--line)', borderRadius: 10, fontSize: 14, fontFamily: "'JetBrains Mono',monospace" }} />
              </label>
              <button onClick={() => onMove(product.sku, 'in', parseInt(qty) || 0)} className="btn-primary hoverable" style={{ flex: 1, minWidth: 110, padding: 12, borderRadius: 10, fontWeight: 700, fontSize: 13.5, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 7 }}>
                <Icon name="arrowDown" size={15} />{L.ui.entry}
              </button>
              <button onClick={() => onMove(product.sku, 'out', parseInt(qty) || 0)} className="btn-ghost hoverable" style={{ flex: 1, minWidth: 110, padding: 12, borderRadius: 10, fontWeight: 700, fontSize: 13.5, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 7 }}>
                <Icon name="arrowUp" size={15} />{L.ui.exit}
              </button>
            </div>
          </div>
          <div style={{ background: 'var(--card)', border: '1px solid var(--line)', borderRadius: 16, padding: 22 }}>
            <div style={{ fontSize: 14, fontWeight: 700, marginBottom: 8 }}>{L.detail.recent}</div>
            {selMoves.map((a, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '11px 0', borderBottom: '1px solid #f0f4f1' }}>
                <div style={{ flex: 'none', width: 28, height: 28, borderRadius: 8, background: a.type === 'in' ? 'var(--mint-bg)' : '#FBE7E4', color: a.type === 'in' ? 'var(--accent)' : 'var(--red)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Icon name={a.type === 'in' ? 'arrowDown' : 'arrowUp'} size={14} />
                </div>
                <span style={{ flex: 1, fontSize: 13.5, fontWeight: 600, color: a.type === 'in' ? 'var(--accent)' : 'var(--red)' }}>{a.type === 'in' ? '+' : '−'}{a.qty} {L.ui.units}</span>
                <span style={{ fontSize: 12.5, color: 'var(--muted)' }}>{a.ago[lang]} · {a.user}</span>
              </div>
            ))}
          </div>
        </div>
        <div style={{ background: 'var(--card)', border: '1px solid var(--line)', borderRadius: 16, padding: 22, height: 'fit-content' }}>
          <div style={{ fontSize: 14, fontWeight: 700, marginBottom: 14 }}>{L.detail.info}</div>
          {info.map((r, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 0', borderBottom: '1px solid #f0f4f1' }}>
              <span style={{ fontSize: 13, color: 'var(--muted)' }}>{r.k}</span>
              <span style={{ fontSize: 13.5, fontWeight: 600, fontFamily: r.mono ? "'JetBrains Mono',monospace" : 'inherit' }}>{r.v}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
