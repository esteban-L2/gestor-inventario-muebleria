import { useState, useRef } from 'react'
import Login from './components/Login.jsx'
import Sidebar from './components/Sidebar.jsx'
import Topbar from './components/Topbar.jsx'
import Toast from './components/Toast.jsx'
import Dashboard from './screens/Dashboard.jsx'
import Products from './screens/Products.jsx'
import Detail from './screens/Detail.jsx'
import Movements from './screens/Movements.jsx'
import Alerts from './screens/Alerts.jsx'
import Suppliers from './screens/Suppliers.jsx'
import Orders from './screens/Orders.jsx'
import Reports from './screens/Reports.jsx'
import { PRODUCTS, INITIAL_MOVEMENTS } from './data.js'
import { T, SCREEN_SUB } from './translations.js'
import { nm } from './utils.js'

export default function App() {
  const [authed, setAuthed] = useState(false);
  const [screen, setScreen] = useState('dashboard');
  const [lang, setLang] = useState('es');
  const [collapsed, setCollapsed] = useState(false);
  const [query, setQuery] = useState('');
  const [selectedId, setSelectedId] = useState('WH-1002');
  const [products, setProducts] = useState(PRODUCTS.map(p => ({ ...p })));
  const [movements, setMovements] = useState(INITIAL_MOVEMENTS);
  const [toast, setToast] = useState(null);
  const toastTimer = useRef(null);

  const L = T[lang];

  const showToast = (msg) => {
    if (toastTimer.current) clearTimeout(toastTimer.current);
    setToast({ msg });
    toastTimer.current = setTimeout(() => setToast(null), 2600);
  };

  const applyMove = (productId, type, qty) => {
    if (!qty || qty <= 0) return;
    let movedProduct = null;
    setProducts(prev => prev.map(p => {
      if (p.sku !== productId) return p;
      const ns = type === 'in' ? p.stock + qty : Math.max(0, p.stock - qty);
      movedProduct = { ...p, stock: ns, moved: p.moved + qty };
      return movedProduct;
    }));
    const prod = products.find(p => p.sku === productId);
    if (!prod) return;
    const mv = { type, es: prod.es, en: prod.en, qty, loc: prod.loc, ago: { es: 'ahora', en: 'now' }, user: lang === 'es' ? 'Tú' : 'You' };
    setMovements(prev => [mv, ...prev]);
    showToast(lang === 'es' ? 'Movimiento registrado' : 'Movement logged');
  };

  const openDetail = (id) => { setSelectedId(id); setScreen('detail'); };
  const goProducts = () => setScreen('products');

  if (!authed) {
    return <Login L={L} onLogin={() => setAuthed(true)} />;
  }

  const selectedProduct = products.find(p => p.sku === selectedId) || products[0];
  const pageTitle = screen === 'detail' ? nm(selectedProduct, lang) : L.nav[screen];
  const pageSub = screen === 'detail'
    ? `${selectedProduct.sku} · ${lang === 'es' ? '' : ''}`.trim()
    : SCREEN_SUB(screen, L);

  return (
    <div style={{ display: 'flex', height: '100vh', width: '100%' }}>
      <Sidebar L={L} screen={screen} onNavigate={setScreen} collapsed={collapsed} />
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0, background: 'var(--bg)' }}>
        <Topbar
          L={L}
          title={pageTitle}
          sub={pageSub}
          onToggleCollapse={() => setCollapsed(c => !c)}
          query={query}
          onSearch={setQuery}
          lang={lang}
          onSetLang={setLang}
        />
        <main style={{ flex: 1, overflowY: 'auto', padding: '28px 30px 44px' }}>
          {screen === 'dashboard' && (
            <Dashboard L={L} lang={lang} products={products} movements={movements}
              onGoMovements={() => setScreen('movements')} onGoAlerts={() => setScreen('alerts')} onOpenDetail={openDetail} />
          )}
          {screen === 'products' && (
            <Products L={L} lang={lang} products={products} query={query} onOpenDetail={openDetail} />
          )}
          {screen === 'detail' && (
            <Detail L={L} lang={lang} product={selectedProduct} movements={movements} onBack={goProducts} onMove={applyMove} />
          )}
          {screen === 'movements' && (
            <Movements L={L} lang={lang} products={products} movements={movements} onMove={applyMove} />
          )}
          {screen === 'alerts' && (
            <Alerts L={L} lang={lang} products={products} onOrder={() => showToast(lang === 'es' ? 'Orden de compra creada' : 'Purchase order created')} />
          )}
          {screen === 'suppliers' && (
            <Suppliers L={L} lang={lang} products={products} />
          )}
          {screen === 'orders' && (
            <Orders L={L} lang={lang} />
          )}
          {screen === 'reports' && (
            <Reports L={L} lang={lang} products={products} />
          )}
        </main>
      </div>
      <Toast toast={toast} />
    </div>
  );
}
