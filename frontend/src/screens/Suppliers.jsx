import Icon from '../Icon.jsx'
import { SUPPLIERS } from '../data.js'
import { catMeta } from '../utils.js'

export default function Suppliers({ L, lang, products }) {
  return (
    <div className="scIn" style={{ maxWidth: 1180, margin: '0 auto' }}>
      <div style={{ marginBottom: 20 }}>
        <h1 style={{ margin: 0, fontSize: 24, fontWeight: 700, letterSpacing: '-.025em' }}>{L.sup.title}</h1>
        <p style={{ margin: '5px 0 0', color: 'var(--muted)', fontSize: 14 }}>{L.sup.sub}</p>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 16 }}>
        {SUPPLIERS.map((s, i) => {
          const items = products.filter(p => p.supplier === s.name).length;
          const initials = s.name.split(' ').map(w => w[0]).slice(0, 2).join('').toUpperCase();
          const barColor = s.onTime >= 90 ? 'var(--accent)' : s.onTime >= 85 ? 'var(--mint)' : 'var(--amber)';
          return (
            <div key={s.name} className="card-hover" style={{ background: 'var(--card)', border: '1px solid var(--line)', borderRadius: 16, padding: 20, animation: 'scIn .45s both', animationDelay: `${i * 55}ms` }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
                <div style={{ width: 44, height: 44, borderRadius: 12, background: s.avBg, color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: 15 }}>{initials}</div>
                <div style={{ minWidth: 0 }}>
                  <div style={{ fontSize: 15, fontWeight: 700, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{s.name}</div>
                  <div style={{ fontSize: 12, color: 'var(--muted)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{s.contact}</div>
                </div>
              </div>
              <div style={{ display: 'flex', gap: 8, marginBottom: 16 }}>
                <span style={{ padding: '4px 10px', borderRadius: 8, background: 'var(--mint-bg)', color: 'var(--accent-deep)', fontSize: 12, fontWeight: 600 }}>{lang === 'es' ? catMeta(s.cat).es : catMeta(s.cat).en}</span>
                <span style={{ padding: '4px 10px', borderRadius: 8, background: '#f2f5f3', color: 'var(--muted)', fontSize: 12, fontWeight: 600, fontFamily: "'JetBrains Mono',monospace" }}>{items} {L.sup.items}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12.5, color: 'var(--muted)', marginBottom: 6 }}>
                <span>{L.sup.onTime}</span><span style={{ fontFamily: "'JetBrains Mono',monospace", fontWeight: 700, color: 'var(--ink)' }}>{s.onTime}%</span>
              </div>
              <div style={{ height: 7, borderRadius: 5, background: '#eef2ef', overflow: 'hidden', marginBottom: 14 }}>
                <div className="growH" style={{ height: '100%', width: `${s.onTime}%`, background: barColor, borderRadius: 5, animationDelay: `${i * 55}ms` }}></div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 7, fontSize: 12.5, color: 'var(--muted)' }}>
                <Icon name="clock" size={14} />{L.sup.lead}: <b style={{ color: 'var(--ink)', fontFamily: "'JetBrains Mono',monospace" }}>{s.lead} {L.sup.days}</b>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
