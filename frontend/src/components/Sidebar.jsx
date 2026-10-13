import Icon from '../Icon.jsx'

const NAV = [
  ['dashboard','dashboard'], ['products','box'], ['movements','swap'],
  ['alerts','alert'], ['suppliers','truck'], ['orders','clipboard'], ['reports','chart']
];

export default function Sidebar({ L, screen, onNavigate, collapsed }) {
  const w = collapsed ? 74 : 244;
  const labelOpacity = collapsed ? 0 : 1;

  return (
    <aside style={{ flex:'none', width:w, background:'var(--accent-deep)', color:'#cfe0d7', display:'flex', flexDirection:'column', padding:'18px 14px', transition:'width .26s cubic-bezier(.2,.7,.2,1)', overflow:'hidden' }}>
      <div style={{ display:'flex', alignItems:'center', gap:11, padding:'6px 8px 22px' }}>
        <div style={{ flex:'none', width:32, height:32, borderRadius:9, background:'var(--mint)', display:'flex', alignItems:'center', justifyContent:'center', color:'var(--accent-deep)' }}>
          <Icon name="box" size={18} />
        </div>
        <span style={{ fontWeight:800, fontSize:17, letterSpacing:'-.02em', color:'#fff', whiteSpace:'nowrap', opacity:labelOpacity, transition:'opacity .2s' }}>Acopio</span>
      </div>
      <nav style={{ display:'flex', flexDirection:'column', gap:3 }}>
        {NAV.map(([key, icon]) => {
          const active = screen === key || (key === 'products' && screen === 'detail');
          return (
            <a
              key={key}
              onClick={() => onNavigate(key)}
              title={L.nav[key]}
              className="hoverable"
              style={{
                position:'relative', display:'flex', alignItems:'center', gap:13, padding:'11px 12px', borderRadius:11, cursor:'pointer',
                color: active ? '#ffffff' : '#acc4b8',
                background: active ? 'rgba(255,255,255,.12)' : 'transparent',
                fontWeight: active ? 700 : 500, fontSize:14.5, whiteSpace:'nowrap'
              }}
            >
              <span style={{ flex:'none', display:'flex', width:20, height:20, alignItems:'center', justifyContent:'center' }}>
                <Icon name={icon} size={19} />
              </span>
              <span style={{ opacity:labelOpacity, transition:'opacity .2s' }}>{L.nav[key]}</span>
            </a>
          );
        })}
      </nav>
      <div style={{ marginTop:'auto', display:'flex', flexDirection:'column', gap:12 }}>
        <div style={{ display:'flex', alignItems:'center', gap:11, padding:10, borderRadius:12, background:'rgba(255,255,255,.05)' }}>
          <div style={{ flex:'none', width:34, height:34, borderRadius:'50%', background:'var(--mint)', color:'var(--accent-deep)', display:'flex', alignItems:'center', justifyContent:'center', fontWeight:700, fontSize:13 }}>AR</div>
          <div style={{ overflow:'hidden', opacity:labelOpacity }}>
            <div style={{ fontSize:13.5, fontWeight:600, color:'#fff', whiteSpace:'nowrap' }}>Ana Rojas</div>
            <div style={{ fontSize:11.5, color:'#8FB0A0', whiteSpace:'nowrap' }}>{L.login.brandTag}</div>
          </div>
        </div>
      </div>
    </aside>
  );
}
