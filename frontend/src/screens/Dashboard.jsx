import { useEffect, useState } from 'react'
import Icon from '../Icon.jsx'
import { CATS, MONTHS_ES, MONTHS_EN, INB, OUTB } from '../data.js'
import { level, sevColor, badgeMeta, fmt, nm } from '../utils.js'

export default function Dashboard({ L, lang, products, movements, onGoMovements, onGoAlerts, onOpenDetail }) {
  const total = products.length;
  const invValue = products.reduce((a, p) => a + p.stock * p.price, 0);
  const lowCount = products.filter(p => level(p) !== 'ok').length;
  const pendingOrders = 2;

  const [disp, setDisp] = useState({ skus: 0, value: 0, low: 0, orders: 0 });
  useEffect(() => {
    const targets = { skus: total, value: invValue, low: lowCount, orders: pendingOrders };
    const start = performance.now(), dur = 850;
    let raf;
    const tick = (now) => {
      const p = Math.min(1, (now - start) / dur), e = 1 - Math.pow(1 - p, 3);
      setDisp({ skus: Math.round(targets.skus * e), value: Math.round(targets.value * e), low: Math.round(targets.low * e), orders: Math.round(targets.orders * e) });
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
    // eslint-disable-next-line
  }, []);

  const kpis = [
    { label: L.dash.kpiSkus, value: String(disp.skus), icon: 'box', iconBg: 'var(--mint-bg)', iconColor: 'var(--accent)', trend: '+2', up: true },
    { label: L.dash.kpiValue, value: '$' + fmt(disp.value), icon: 'dollar', iconBg: 'var(--mint-bg)', iconColor: 'var(--accent)', trend: '+4.2%', up: true },
    { label: L.dash.kpiLow, value: String(disp.low), icon: 'alert', iconBg: 'var(--amber-bg)', iconColor: 'var(--amber)', trend: '-1', up: false },
    { label: L.dash.kpiOrders, value: String(disp.orders), icon: 'clipboard', iconBg: '#EAF1FB', iconColor: '#2A6FB0', trend: '2', up: true }
  ];

  const maxFlow = 660;
  const months = lang === 'es' ? MONTHS_ES : MONTHS_EN;
  const flow = months.map((m, i) => ({
    m, inH: Math.round(INB[i] / maxFlow * 100), outH: Math.round(OUTB[i] / maxFlow * 100), delay: i * 60
  }));

  const counts = CATS.map(c => ({ c, n: products.filter(p => p.cat === c.key).length })).filter(x => x.n > 0);
  let acc = 0;
  const stops = counts.map(({ c, n }) => { const start = acc; acc += n / total * 100; return `${c.color} ${start.toFixed(1)}% ${acc.toFixed(1)}%`; });
  const donutBg = `conic-gradient(${stops.join(',')})`;

  const lows = products.filter(p => level(p) !== 'ok').sort((a, b) => (a.stock / a.min) - (b.stock / b.min)).slice(0, 4);
  const activity = movements.slice(0, 6);

  return (
    <div className="scIn" style={{ maxWidth: 1240, margin: '0 auto' }}>
      <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: 16, flexWrap: 'wrap', marginBottom: 22 }}>
        <div>
          <h1 style={{ margin: 0, fontSize: 24, fontWeight: 700, letterSpacing: '-.025em' }}>{L.dash.title}</h1>
          <p style={{ margin: '5px 0 0', color: 'var(--muted)', fontSize: 14 }}>{L.dash.sub}</p>
        </div>
        <div style={{ display: 'flex', gap: 10 }}>
          <button className="btn-ghost hoverable" style={{ padding: '10px 15px', borderRadius: 11, fontSize: 13.5, fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 8 }}>
            <Icon name="download" size={16} />{L.ui.export}
          </button>
          <button onClick={onGoMovements} className="btn-primary hoverable" style={{ padding: '10px 16px', borderRadius: 11, fontSize: 13.5, fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 8 }}>
            <Icon name="plus" size={16} />{L.ui.registerMove}
          </button>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 16 }}>
        {kpis.map((k, i) => (
          <div key={i} className="card-hover" style={{ background: 'var(--card)', border: '1px solid var(--line)', borderRadius: 16, padding: 18, animation: 'scIn .5s both', animationDelay: `${i * 70}ms` }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div style={{ width: 38, height: 38, borderRadius: 11, background: k.iconBg, color: k.iconColor, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Icon name={k.icon} size={19} />
              </div>
              <span style={{ display: 'flex', alignItems: 'center', gap: 3, fontSize: 12, fontWeight: 700, color: 'var(--accent)', background: 'var(--mint-bg)', padding: '3px 8px', borderRadius: 20 }}>
                <Icon name={k.up ? 'arrowUp' : 'arrowDown'} size={13} />{k.trend}
              </span>
            </div>
            <div style={{ marginTop: 15, fontFamily: "'JetBrains Mono',monospace", fontSize: 28, fontWeight: 700, letterSpacing: '-.02em' }}>{k.value}</div>
            <div style={{ marginTop: 3, fontSize: 13, color: 'var(--muted)', fontWeight: 500 }}>{k.label}</div>
          </div>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1.7fr 1fr', gap: 16, marginTop: 16 }}>
        <div style={{ background: 'var(--card)', border: '1px solid var(--line)', borderRadius: 16, padding: '20px 22px', animation: 'scIn .5s both', animationDelay: '120ms' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 6 }}>
            <div>
              <div style={{ fontSize: 15, fontWeight: 700 }}>{L.dash.flow}</div>
              <div style={{ fontSize: 12.5, color: 'var(--muted)' }}>{L.dash.flowSub}</div>
            </div>
            <div style={{ display: 'flex', gap: 16 }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 12.5, color: 'var(--muted)' }}><span style={{ width: 10, height: 10, borderRadius: 3, background: 'var(--accent)' }}></span>{L.dash.inLabel}</span>
              <span style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 12.5, color: 'var(--muted)' }}><span style={{ width: 10, height: 10, borderRadius: 3, background: 'var(--mint)' }}></span>{L.dash.outLabel}</span>
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'flex-end', gap: 18, height: 200, paddingTop: 18 }}>
            {flow.map((m, i) => (
              <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 9, height: '100%', justifyContent: 'flex-end' }}>
                <div style={{ display: 'flex', alignItems: 'flex-end', gap: 5, height: '100%', width: '100%', justifyContent: 'center' }}>
                  <div className="growV" style={{ width: 14, borderRadius: '5px 5px 0 0', background: 'var(--accent)', height: `${m.inH}%`, animationDelay: `${m.delay}ms` }}></div>
                  <div className="growV" style={{ width: 14, borderRadius: '5px 5px 0 0', background: 'var(--mint)', height: `${m.outH}%`, animationDelay: `${m.delay + 40}ms` }}></div>
                </div>
                <span style={{ fontSize: 12, color: 'var(--muted)', fontWeight: 600 }}>{m.m}</span>
              </div>
            ))}
          </div>
        </div>

        <div style={{ background: 'var(--card)', border: '1px solid var(--line)', borderRadius: 16, padding: '20px 22px', animation: 'scIn .5s both', animationDelay: '170ms' }}>
          <div style={{ fontSize: 15, fontWeight: 700, marginBottom: 16 }}>{L.dash.catTitle}</div>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '6px 0 18px' }}>
            <div className="pop" style={{ position: 'relative', width: 150, height: 150, borderRadius: '50%', background: donutBg }}>
              <div style={{ position: 'absolute', inset: 26, borderRadius: '50%', background: 'var(--card)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 24, fontWeight: 700 }}>{total}</div>
                <div style={{ fontSize: 11, color: 'var(--muted)' }}>SKUs</div>
              </div>
            </div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 9 }}>
            {counts.map(({ c, n }) => (
              <div key={c.key} style={{ display: 'flex', alignItems: 'center', gap: 9, fontSize: 13 }}>
                <span style={{ width: 10, height: 10, borderRadius: 3, background: c.color }}></span>
                <span style={{ flex: 1, color: 'var(--ink)' }}>{lang === 'es' ? c.es : c.en}</span>
                <span style={{ fontFamily: "'JetBrains Mono',monospace", color: 'var(--muted)', fontWeight: 600 }}>{n}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: 16, marginTop: 16 }}>
        <div style={{ background: 'var(--card)', border: '1px solid var(--line)', borderRadius: 16, padding: '20px 22px', animation: 'scIn .5s both', animationDelay: '210ms' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 9, fontSize: 15, fontWeight: 700 }}>
              <span style={{ color: 'var(--amber)', display: 'flex' }}><Icon name="alert" size={17} /></span>{L.dash.lowTitle}
            </div>
            <a onClick={onGoAlerts} style={{ fontSize: 13, fontWeight: 600, cursor: 'pointer' }}>{L.ui.viewAll}</a>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
            {lows.map((p, i) => {
              const lv = level(p), bm = badgeMeta(lv);
              return (
                <div key={p.sku} onClick={() => onOpenDetail(p.sku)} className="hoverable" style={{ display: 'flex', alignItems: 'center', gap: 13, padding: '10px 8px', borderRadius: 11, cursor: 'pointer', animation: 'scIn .45s both', animationDelay: `${i * 60}ms` }}>
                  <div style={{ flex: 'none', width: 8, height: 38, borderRadius: 5, background: sevColor(lv) }}></div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: 14, fontWeight: 600, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{nm(p, lang)}</div>
                    <div style={{ fontSize: 12, color: 'var(--muted)', fontFamily: "'JetBrains Mono',monospace" }}>{p.sku} · {p.loc}</div>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 15, fontWeight: 700, color: sevColor(lv) }}>{p.stock}</div>
                    <div style={{ fontSize: 11, color: 'var(--muted)' }}>min {p.min}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div style={{ background: 'var(--card)', border: '1px solid var(--line)', borderRadius: 16, padding: '20px 22px', animation: 'scIn .5s both', animationDelay: '250ms' }}>
          <div style={{ fontSize: 15, fontWeight: 700, marginBottom: 14 }}>{L.dash.activity}</div>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            {activity.map((a, i) => (
              <div key={i} style={{ display: 'flex', gap: 12, paddingBottom: 14, animation: 'scIn .45s both', animationDelay: `${i * 55}ms` }}>
                <div style={{ flex: 'none', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  <div style={{ width: 30, height: 30, borderRadius: 9, background: a.type === 'in' ? 'var(--mint-bg)' : '#FBE7E4', color: a.type === 'in' ? 'var(--accent)' : 'var(--red)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Icon name={a.type === 'in' ? 'arrowDown' : 'arrowUp'} size={15} />
                  </div>
                  <div style={{ width: 2, flex: 1, background: 'var(--line)', marginTop: 4 }}></div>
                </div>
                <div style={{ paddingTop: 2 }}>
                  <div style={{ fontSize: 13.5 }}>
                    <b style={{ fontWeight: 700, color: a.type === 'in' ? 'var(--accent)' : 'var(--red)' }}>{a.type === 'in' ? '+' : '−'}{a.qty}</b> {a[lang]}
                  </div>
                  <div style={{ fontSize: 12, color: 'var(--muted)' }}>{a.loc} · {a.ago[lang]} · {a.user}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
