import { useState } from 'react'
import { CATS, MONTHS_ES, MONTHS_EN, INB, OUTB } from '../data.js'
import { fmt, nm } from '../utils.js'

export default function Reports({ L, lang, products }) {
  const [period, setPeriod] = useState('30d');
  const invValue = products.reduce((a, p) => a + p.stock * p.price, 0);

  const maxFlow = 660;
  const months = lang === 'es' ? MONTHS_ES : MONTHS_EN;
  const flow = months.map((m, i) => ({
    m, inH: Math.round(INB[i] / maxFlow * 100), outH: Math.round(OUTB[i] / maxFlow * 100), delay: i * 60
  }));

  const repKpis = [
    { label: L.rep.title, value: '3.4×', delta: '+0.3' },
    { label: L.dash.kpiValue, value: '$' + fmt(invValue), delta: '+4.2%' },
    { label: L.nav.movements, value: '1,284', delta: '+128' },
    { label: L.rep.accuracy, value: '98.6%', delta: '+0.4%' }
  ];

  const maxMoved = Math.max(...products.map(p => p.moved));
  const topMoved = [...products].sort((a, b) => b.moved - a.moved).slice(0, 5).map(p => ({
    name: nm(p, lang), moved: p.moved, pct: Math.round(p.moved / maxMoved * 100)
  }));

  const catVals = CATS.map(c => ({ c, v: products.filter(p => p.cat === c.key).reduce((a, p) => a + p.stock * p.price, 0) })).filter(x => x.v > 0).sort((a, b) => b.v - a.v);
  const maxVal = Math.max(...catVals.map(x => x.v));

  return (
    <div className="scIn" style={{ maxWidth: 1200, margin: '0 auto' }}>
      <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: 16, flexWrap: 'wrap', marginBottom: 20 }}>
        <div>
          <h1 style={{ margin: 0, fontSize: 24, fontWeight: 700, letterSpacing: '-.025em' }}>{L.rep.title}</h1>
          <p style={{ margin: '5px 0 0', color: 'var(--muted)', fontSize: 14 }}>{L.rep.sub}</p>
        </div>
        <div style={{ display: 'flex', border: '1px solid var(--line)', borderRadius: 10, overflow: 'hidden', background: 'var(--card)' }}>
          {['7d', '30d', '90d'].map(p => (
            <button key={p} onClick={() => setPeriod(p)} style={{ padding: '9px 15px', cursor: 'pointer', fontSize: 13, fontWeight: 700, background: period === p ? 'var(--accent)' : 'var(--card)', color: period === p ? '#fff' : 'var(--ink)' }}>{p}</button>
          ))}
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 16, marginBottom: 16 }}>
        {repKpis.map((k, i) => (
          <div key={i} style={{ background: 'var(--card)', border: '1px solid var(--line)', borderRadius: 16, padding: 18, animation: 'scIn .45s both', animationDelay: `${i * 55}ms` }}>
            <div style={{ fontSize: 13, color: 'var(--muted)', fontWeight: 500 }}>{k.label}</div>
            <div style={{ marginTop: 8, fontFamily: "'JetBrains Mono',monospace", fontSize: 26, fontWeight: 700, letterSpacing: '-.02em' }}>{k.value}</div>
            <div style={{ marginTop: 4, fontSize: 12, fontWeight: 600, color: 'var(--accent)' }}>{k.delta}</div>
          </div>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: 16 }}>
        <div style={{ background: 'var(--card)', border: '1px solid var(--line)', borderRadius: 16, padding: 22, animation: 'scIn .5s both', animationDelay: '120ms' }}>
          <div style={{ fontSize: 15, fontWeight: 700, marginBottom: 6 }}>{L.rep.monthlyFlow}</div>
          <div style={{ display: 'flex', alignItems: 'flex-end', gap: 18, height: 210, paddingTop: 18 }}>
            {flow.map((m, i) => (
              <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 9, height: '100%', justifyContent: 'flex-end' }}>
                <div style={{ display: 'flex', alignItems: 'flex-end', gap: 5, height: '100%', width: '100%', justifyContent: 'center' }}>
                  <div className="growV" style={{ width: 15, borderRadius: '5px 5px 0 0', background: 'var(--accent)', height: `${m.inH}%`, animationDelay: `${m.delay}ms` }}></div>
                  <div className="growV" style={{ width: 15, borderRadius: '5px 5px 0 0', background: 'var(--mint)', height: `${m.outH}%`, animationDelay: `${m.delay + 40}ms` }}></div>
                </div>
                <span style={{ fontSize: 12, color: 'var(--muted)', fontWeight: 600 }}>{m.m}</span>
              </div>
            ))}
          </div>
        </div>
        <div style={{ background: 'var(--card)', border: '1px solid var(--line)', borderRadius: 16, padding: 22, animation: 'scIn .5s both', animationDelay: '170ms' }}>
          <div style={{ fontSize: 15, fontWeight: 700, marginBottom: 18 }}>{L.rep.topMoved}</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 15 }}>
            {topMoved.map((t, i) => (
              <div key={i}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, marginBottom: 6 }}>
                  <span style={{ fontWeight: 600, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: 160 }}>{t.name}</span>
                  <span style={{ fontFamily: "'JetBrains Mono',monospace", fontWeight: 700, color: 'var(--muted)' }}>{t.moved}</span>
                </div>
                <div style={{ height: 8, borderRadius: 5, background: '#eef2ef', overflow: 'hidden' }}>
                  <div className="growH" style={{ height: '100%', width: `${t.pct}%`, background: 'var(--accent)', borderRadius: 5, animationDelay: `${i * 55}ms` }}></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div style={{ background: 'var(--card)', border: '1px solid var(--line)', borderRadius: 16, padding: 22, marginTop: 16, animation: 'scIn .5s both', animationDelay: '220ms' }}>
        <div style={{ fontSize: 15, fontWeight: 700, marginBottom: 18 }}>{L.rep.valueByCat}</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          {catVals.map(({ c, v }, i) => {
            const pct = Math.max(14, Math.round(v / maxVal * 100));
            return (
              <div key={c.key} style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                <span style={{ width: 130, fontSize: 13, fontWeight: 600, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{lang === 'es' ? c.es : c.en}</span>
                <div style={{ flex: 1, height: 24, borderRadius: 7, background: '#f4f7f5', overflow: 'hidden' }}>
                  <div className="growH" style={{ height: '100%', width: `${pct}%`, background: c.color, borderRadius: 7, animationDelay: `${i * 55}ms`, display: 'flex', alignItems: 'center', justifyContent: 'flex-end', paddingRight: 10, color: '#fff', fontSize: 11.5, fontWeight: 700, fontFamily: "'JetBrains Mono',monospace" }}>${fmt(v)}</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
