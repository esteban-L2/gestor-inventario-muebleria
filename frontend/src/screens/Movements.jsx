import { useState } from 'react'
import Icon from '../Icon.jsx'
import { nm } from '../utils.js'

export default function Movements({ L, lang, products, movements, onMove }) {
  const [productId, setProductId] = useState(products[0]?.sku || '');
  const [type, setType] = useState('in');
  const [qty, setQty] = useState('');
  const [note, setNote] = useState('');

  const submit = () => {
    onMove(productId, type, parseInt(qty) || 0);
    setQty(''); setNote('');
  };

  return (
    <div className="scIn" style={{ maxWidth: 1180, margin: '0 auto' }}>
      <div style={{ marginBottom: 20 }}>
        <h1 style={{ margin: 0, fontSize: 24, fontWeight: 700, letterSpacing: '-.025em' }}>{L.mov.title}</h1>
        <p style={{ margin: '5px 0 0', color: 'var(--muted)', fontSize: 14 }}>{L.mov.sub}</p>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '380px 1fr', gap: 16, alignItems: 'start' }}>
        <div style={{ background: 'var(--card)', border: '1px solid var(--line)', borderRadius: 16, padding: 22, position: 'sticky', top: 0 }}>
          <div style={{ fontSize: 15, fontWeight: 700, marginBottom: 18 }}>{L.mov.newMove}</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 15 }}>
            <label style={{ display: 'flex', flexDirection: 'column', gap: 7, fontSize: 12.5, fontWeight: 600, color: 'var(--muted)' }}>
              {L.mov.selectProduct}
              <select value={productId} onChange={e => setProductId(e.target.value)} style={{ padding: '12px 13px', border: '1px solid var(--line)', borderRadius: 10, fontSize: 14, background: '#fbfdfb', color: 'var(--ink)' }}>
                {products.map(o => <option key={o.sku} value={o.sku}>{o.sku} · {nm(o, lang)}</option>)}
              </select>
            </label>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 7 }}>
              <span style={{ fontSize: 12.5, fontWeight: 600, color: 'var(--muted)' }}>{L.mov.type}</span>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
                <button onClick={() => setType('in')} style={{ padding: 12, border: `1px solid ${type === 'in' ? 'var(--accent)' : 'var(--line)'}`, borderRadius: 10, background: type === 'in' ? 'var(--accent)' : 'var(--card)', color: type === 'in' ? '#fff' : 'var(--ink)', fontWeight: 700, fontSize: 13.5, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 7 }}>
                  <Icon name="arrowDown" size={15} />{L.ui.entry}
                </button>
                <button onClick={() => setType('out')} style={{ padding: 12, border: `1px solid ${type === 'out' ? 'var(--red)' : 'var(--line)'}`, borderRadius: 10, background: type === 'out' ? 'var(--red)' : 'var(--card)', color: type === 'out' ? '#fff' : 'var(--ink)', fontWeight: 700, fontSize: 13.5, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 7 }}>
                  <Icon name="arrowUp" size={15} />{L.ui.exit}
                </button>
              </div>
            </div>
            <label style={{ display: 'flex', flexDirection: 'column', gap: 7, fontSize: 12.5, fontWeight: 600, color: 'var(--muted)' }}>
              {L.ui.qty}
              <input value={qty} onChange={e => setQty(e.target.value)} type="number" min="1" placeholder="0" style={{ padding: '12px 13px', border: '1px solid var(--line)', borderRadius: 10, fontSize: 14, fontFamily: "'JetBrains Mono',monospace" }} />
            </label>
            <label style={{ display: 'flex', flexDirection: 'column', gap: 7, fontSize: 12.5, fontWeight: 600, color: 'var(--muted)' }}>
              {L.ui.note} <span style={{ fontWeight: 400, textTransform: 'none' }}>({L.ui.optional})</span>
              <input value={note} onChange={e => setNote(e.target.value)} style={{ padding: '12px 13px', border: '1px solid var(--line)', borderRadius: 10, fontSize: 14 }} />
            </label>
            <button onClick={submit} className="btn-primary hoverable" style={{ marginTop: 4, padding: 13, borderRadius: 11, fontWeight: 700, fontSize: 14.5, cursor: 'pointer' }}>{L.mov.register}</button>
          </div>
        </div>
        <div style={{ background: 'var(--card)', border: '1px solid var(--line)', borderRadius: 16, overflow: 'hidden' }}>
          <div style={{ padding: '16px 20px', borderBottom: '1px solid var(--line)', fontSize: 15, fontWeight: 700 }}>{L.mov.history}</div>
          <div style={{ display: 'grid', gridTemplateColumns: '90px 1.6fr 0.8fr 1fr 1fr', gap: 12, padding: '11px 20px', borderBottom: '1px solid var(--line)', fontSize: 11.5, fontWeight: 700, color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '.04em' }}>
            <span>{L.mov.type}</span><span>{L.ui.product}</span><span>{L.ui.qty}</span><span>{L.ui.location}</span><span>{L.ui.date}</span>
          </div>
          {movements.map((a, i) => (
            <div key={i} style={{ display: 'grid', gridTemplateColumns: '90px 1.6fr 0.8fr 1fr 1fr', gap: 12, padding: '13px 20px', borderBottom: '1px solid #f0f4f1', alignItems: 'center', animation: 'scIn .4s both', animationDelay: `${i * 40}ms` }}>
              <span>
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: 5, padding: '4px 9px', borderRadius: 8, fontSize: 11.5, fontWeight: 700, background: a.type === 'in' ? 'var(--mint-bg)' : '#FBE7E4', color: a.type === 'in' ? 'var(--accent)' : 'var(--red)' }}>
                  <Icon name={a.type === 'in' ? 'arrowDown' : 'arrowUp'} size={12} />{a.type === 'in' ? L.ui.entry : L.ui.exit}
                </span>
              </span>
              <span style={{ fontSize: 13.5, fontWeight: 600, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{a[lang]}</span>
              <span style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 13.5, fontWeight: 700, color: a.type === 'in' ? 'var(--accent)' : 'var(--red)' }}>{a.type === 'in' ? '+' : '−'}{a.qty}</span>
              <span style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 13, color: 'var(--muted)' }}>{a.loc}</span>
              <span style={{ fontSize: 12.5, color: 'var(--muted)' }}>{a.ago[lang]} · {a.user}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
