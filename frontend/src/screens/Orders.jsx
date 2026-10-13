import Icon from '../Icon.jsx'
import { ORDERS } from '../data.js'
import { fmt } from '../utils.js'

const STATUS_META = {
  intransit: { key: 'st_intransit', bg: '#EAF1FB', color: '#2A6FB0' },
  pending: { key: 'st_pending', bg: 'var(--amber-bg)', color: 'var(--amber)' },
  received: { key: 'st_received', bg: 'var(--mint-bg)', color: 'var(--accent)' },
  cancelled: { key: 'st_cancelled', bg: '#F0F0F0', color: '#8A8A8A' }
};

export default function Orders({ L, lang }) {
  return (
    <div className="scIn" style={{ maxWidth: 1100, margin: '0 auto' }}>
      <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: 16, flexWrap: 'wrap', marginBottom: 20 }}>
        <div>
          <h1 style={{ margin: 0, fontSize: 24, fontWeight: 700, letterSpacing: '-.025em' }}>{L.ord.title}</h1>
          <p style={{ margin: '5px 0 0', color: 'var(--muted)', fontSize: 14 }}>{L.ord.sub}</p>
        </div>
        <button className="btn-primary hoverable" style={{ padding: '10px 16px', borderRadius: 11, fontSize: 13.5, fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 8 }}>
          <Icon name="plus" size={16} />{L.ui.newOrder}
        </button>
      </div>
      <div style={{ background: 'var(--card)', border: '1px solid var(--line)', borderRadius: 16, overflow: 'hidden' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.6fr 0.8fr 1fr 1fr 1.1fr', gap: 14, padding: '13px 22px', borderBottom: '1px solid var(--line)', fontSize: 11.5, fontWeight: 700, color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '.04em' }}>
          <span>PO</span><span>{L.ui.supplier}</span><span>{L.ord.items}</span><span>{L.ord.total}</span><span>{L.ord.eta}</span><span>{L.ui.status}</span>
        </div>
        {ORDERS.map((o, i) => {
          const st = STATUS_META[o.status];
          return (
            <div key={o.po} className="hoverable" style={{ display: 'grid', gridTemplateColumns: '1fr 1.6fr 0.8fr 1fr 1fr 1.1fr', gap: 14, padding: '15px 22px', borderBottom: '1px solid #f0f4f1', alignItems: 'center', animation: 'scIn .4s both', animationDelay: `${i * 50}ms` }}>
              <span style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 13.5, fontWeight: 700, color: 'var(--accent)' }}>{o.po}</span>
              <span style={{ fontSize: 14, fontWeight: 600 }}>{o.supplier}</span>
              <span style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 13.5 }}>{o.items}</span>
              <span style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 13.5, fontWeight: 600 }}>${fmt(o.total)}</span>
              <span style={{ fontSize: 13, color: 'var(--muted)' }}>{o.eta[lang]}</span>
              <span>
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '5px 11px', borderRadius: 20, fontSize: 12, fontWeight: 600, background: st.bg, color: st.color }}>
                  <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'currentColor' }}></span>{L.ord[st.key]}
                </span>
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
