import Icon from '../Icon.jsx'

export default function Toast({ toast }) {
  if (!toast) return null;
  return (
    <div className="toastIn" style={{ position:'fixed', bottom:26, left:'50%', transform:'translateX(-50%)', display:'flex', alignItems:'center', gap:11, padding:'13px 20px', borderRadius:13, background:'var(--accent-deep)', color:'#fff', boxShadow:'0 18px 40px -18px rgba(14,59,42,.6)', zIndex:50 }}>
      <span style={{ display:'flex', width:24, height:24, borderRadius:'50%', background:'var(--mint)', color:'var(--accent-deep)', alignItems:'center', justifyContent:'center' }}>
        <Icon name="check" size={14} />
      </span>
      <span style={{ fontSize:14, fontWeight:600 }}>{toast.msg}</span>
    </div>
  );
}
