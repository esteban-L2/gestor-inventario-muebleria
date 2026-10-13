import Icon from '../Icon.jsx'
import { level, sevColor, badgeMeta, nm } from '../utils.js'

export default function Alerts({ L, lang, products, onOrder }) {
  const lows = products.filter(p => level(p) !== 'ok').sort((a, b) => (a.stock / a.min) - (b.stock / b.min));

  return (
    <div className="scIn" style={{ maxWidth: 1080, margin: '0 auto' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 13, marginBottom: 20 }}>
        <div style={{ width: 46, height: 46, borderRadius: 13, background: 'var(--amber-bg)', color: 'var(--amber)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Icon name="alert" size={22} />
        </div>
        <div>
          <h1 style={{ margin: 0, fontSize: 24, fontWeight: 700, letterSpacing: '-.025em' }}>{L.alerts.title}</h1>
          <p style={{ margin: '4px 0 0', color: 'var(--muted)', fontSize: 14 }}>{lows.length} {L.alerts.count} · {L.alerts.sub}</p>
        </div>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        {lows.map((p, i) => {
          const lv = level(p), bm = badgeMeta(lv);
          const suggest = Math.max(p.min - p.stock, Math.round(p.max * 0.4));
          return (
            <div key={p.sku} style={{ background: 'var(--card)', border: '1px solid var(--line)', borderRadius: 16, padding: '18px 20px', display: 'flex', alignItems: 'center', gap: 18, flexWrap: 'wrap', borderLeft: `5px solid ${sevColor(lv)}`, animation: 'scIn .45s both', animationDelay: `${i * 60}ms` }}>
              <div style={{ flex: 1, minWidth: 200 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 9 }}>
                  <span style={{ fontSize: 15.5, fontWeight: 700 }}>{nm(p, lang)}</span>
                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: 5, padding: '3px 9px', borderRadius: 20, fontSize: 11.5, fontWeight: 700, background: bm.bg, color: bm.color }}>{L.status[lv]}</span>
                </div>
                <div style={{ marginTop: 4, fontSize: 12.5, color: 'var(--muted)', fontFamily: "'JetBrains Mono',monospace" }}>{p.sku} · {p.loc} · {p.supplier}</div>
              </div>
              <div style={{ textAlign: 'center' }}><div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 22, fontWeight: 700, color: sevColor(lv) }}>{p.stock}</div><div style={{ fontSize: 11, color: 'var(--muted)' }}>{L.ui.stock}</div></div>
              <div style={{ textAlign: 'center' }}><div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 22, fontWeight: 700, color: 'var(--muted)' }}>{p.min}</div><div style={{ fontSize: 11, color: 'var(--muted)' }}>min</div></div>
              <div style={{ textAlign: 'center' }}><div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 22, fontWeight: 700, color: 'var(--accent)' }}>+{suggest}</div><div style={{ fontSize: 11, color: 'var(--muted)' }}>{L.alerts.suggest}</div></div>
              <button onClick={onOrder} className="btn-primary hoverable" style={{ padding: '11px 16px', borderRadius: 11, fontWeight: 700, fontSize: 13, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 7 }}>
                <Icon name="clipboard" size={15} />{L.ui.createOrder}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
