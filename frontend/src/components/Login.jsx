import Icon from '../Icon.jsx'
import { APP_NAME } from '../config.js'

export default function Login({ L, onLogin }) {
  return (
    <div style={{ height:'100vh', width:'100%', display:'flex', alignItems:'center', justifyContent:'center', background:'radial-gradient(120% 120% at 0% 0%, #EAF4EE 0%, var(--bg) 46%)', padding:24 }}>
      <div className="pop" style={{ display:'flex', width:'min(940px,100%)', minHeight:560, background:'var(--card)', border:'1px solid var(--line)', borderRadius:24, overflow:'hidden', boxShadow:'0 30px 70px -40px rgba(14,59,42,.45)' }}>
        <div style={{ flex:1, background:'var(--accent-deep)', color:'#fff', padding:'44px 40px', display:'flex', flexDirection:'column', justifyContent:'space-between', minWidth:0 }}>
          <div style={{ display:'flex', alignItems:'center', gap:11 }}>
            <div style={{ width:34, height:34, borderRadius:9, background:'var(--mint)', display:'flex', alignItems:'center', justifyContent:'center', color:'var(--accent-deep)' }}>
              <Icon name="box" size={18} />
            </div>
            <span style={{ fontWeight:800, fontSize:18, letterSpacing:'-.02em' }}>{APP_NAME}</span>
          </div>
          <div>
            <div style={{ fontSize:13, color:'var(--mint)', fontWeight:600, letterSpacing:'.06em', textTransform:'uppercase', marginBottom:14 }}>{L.login.brandTag}</div>
            <div style={{ fontSize:30, lineHeight:1.18, fontWeight:700, letterSpacing:'-.02em' }}>{L.login.hero}</div>
            <div style={{ marginTop:26, display:'flex', gap:26 }}>
              <div><div style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:26, fontWeight:700 }}>2.4k</div><div style={{ fontSize:12, color:'#9FBDAE' }}>SKUs</div></div>
              <div><div style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:26, fontWeight:700 }}>99.1%</div><div style={{ fontSize:12, color:'#9FBDAE' }}>{L.rep.accuracy}</div></div>
            </div>
          </div>
          <div style={{ fontSize:12, color:'#7FA08F' }}>© 2026 {APP_NAME} · {L.login.brandTag}</div>
        </div>
        <div style={{ flex:1, padding:'48px 44px', display:'flex', flexDirection:'column', justifyContent:'center', maxWidth:440, margin:'0 auto', width:'100%' }}>
          <div style={{ fontSize:24, fontWeight:700, letterSpacing:'-.02em' }}>{L.login.title}</div>
          <div style={{ color:'var(--muted)', marginTop:7, fontSize:14.5 }}>{L.login.sub}</div>
          <div style={{ marginTop:28, display:'flex', flexDirection:'column', gap:16 }}>
            <label style={{ display:'flex', flexDirection:'column', gap:7, fontSize:13, fontWeight:600, color:'var(--muted)' }}>
              {L.login.email}
              <input defaultValue="admin@muebleria.local" style={inputStyle} />
            </label>
            <label style={{ display:'flex', flexDirection:'column', gap:7, fontSize:13, fontWeight:600, color:'var(--muted)' }}>
              {L.login.pass}
              <input type="password" defaultValue="demodemo" style={inputStyle} />
            </label>
            <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', fontSize:13 }}>
              <label style={{ display:'flex', alignItems:'center', gap:8, color:'var(--muted)', cursor:'pointer' }}>
                <input type="checkbox" defaultChecked style={{ accentColor:'var(--accent)', width:15, height:15 }} />{L.login.remember}
              </label>
              <a style={{ color:'var(--accent)', fontWeight:600, cursor:'pointer' }}>{L.login.forgot}</a>
            </div>
            <button onClick={onLogin} className="btn-primary hoverable" style={{ marginTop:6, padding:14, borderRadius:12, fontSize:15, fontWeight:700, cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center', gap:8 }}>
              {L.login.signin} <Icon name="arrowRight" size={16} />
            </button>
            <button onClick={onLogin} style={{ padding:12, border:'1px dashed #C7D6CC', borderRadius:12, background:'transparent', color:'var(--accent-deep)', fontSize:13.5, fontWeight:600, cursor:'pointer' }}>
              {L.login.demo}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

const inputStyle = { padding:'13px 14px', border:'1px solid var(--line)', borderRadius:11, fontSize:14.5, color:'var(--ink)', background:'#fbfdfb' };
