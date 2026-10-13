import Icon from '../Icon.jsx'

export default function Topbar({ L, title, sub, onToggleCollapse, query, onSearch, lang, onSetLang }) {
  return (
    <header style={{ flex:'none', height:68, display:'flex', alignItems:'center', gap:16, padding:'0 26px', borderBottom:'1px solid var(--line)', background:'rgba(255,255,255,.72)', backdropFilter:'blur(8px)' }}>
      <button onClick={onToggleCollapse} className="btn-ghost hoverable" style={{ flex:'none', width:38, height:38, borderRadius:10, display:'flex', alignItems:'center', justifyContent:'center', cursor:'pointer' }}>
        <Icon name="menu" size={18} />
      </button>
      <div style={{ minWidth:0 }}>
        <div style={{ fontSize:17, fontWeight:700, letterSpacing:'-.02em', lineHeight:1.1, whiteSpace:'nowrap', overflow:'hidden', textOverflow:'ellipsis' }}>{title}</div>
        <div style={{ fontSize:12.5, color:'var(--muted)', whiteSpace:'nowrap', overflow:'hidden', textOverflow:'ellipsis' }}>{sub}</div>
      </div>
      <div style={{ marginLeft:'auto', display:'flex', alignItems:'center', gap:12 }}>
        <div style={{ display:'flex', alignItems:'center', gap:9, padding:'9px 13px', border:'1px solid var(--line)', borderRadius:11, background:'var(--card)', width:260, maxWidth:'30vw' }}>
          <span style={{ color:'#9aa69e', display:'flex' }}><Icon name="search" size={17} /></span>
          <input value={query} onChange={e => onSearch(e.target.value)} placeholder={L.ui.searchPh} style={{ border:'none', background:'transparent', fontSize:14, width:'100%', color:'var(--ink)' }} />
        </div>
        <div style={{ display:'flex', border:'1px solid var(--line)', borderRadius:10, overflow:'hidden', background:'var(--card)' }}>
          <button onClick={() => onSetLang('es')} style={{ padding:'8px 11px', cursor:'pointer', fontSize:12.5, fontWeight:700, background: lang==='es' ? 'var(--accent)' : 'transparent', color: lang==='es' ? '#fff' : 'var(--muted)' }}>ES</button>
          <button onClick={() => onSetLang('en')} style={{ padding:'8px 11px', cursor:'pointer', fontSize:12.5, fontWeight:700, background: lang==='en' ? 'var(--accent)' : 'transparent', color: lang==='en' ? '#fff' : 'var(--muted)' }}>EN</button>
        </div>
        <button className="btn-ghost hoverable" style={{ position:'relative', flex:'none', width:38, height:38, borderRadius:10, display:'flex', alignItems:'center', justifyContent:'center', cursor:'pointer' }}>
          <Icon name="bell" size={18} />
          <span style={{ position:'absolute', top:8, right:9, width:7, height:7, borderRadius:'50%', background:'var(--red)', border:'1.5px solid var(--card)' }}></span>
        </button>
      </div>
    </header>
  );
}
