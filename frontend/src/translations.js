export const T = {
  es:{
    login:{title:'Bienvenido de nuevo', sub:'Inicia sesión en tu panel de inventario', email:'Correo', pass:'Contraseña', signin:'Iniciar sesión', remember:'Recordarme', forgot:'¿Olvidaste tu contraseña?', demo:'Entrar a la demo', brandTag:'Gestión de almacén', hero:'Controla cada caja, palet y SKU de tu bodega en un solo lugar.'},
    nav:{dashboard:'Panel', products:'Productos', movements:'Movimientos', alerts:'Alertas', suppliers:'Proveedores', orders:'Órdenes', reports:'Reportes'},
    ui:{searchPh:'Buscar productos, SKU…', registerMove:'Registrar movimiento', export:'Exportar', all:'Todas', viewAll:'Ver todo', back:'Volver', filter:'Filtrar', newOrder:'Nueva orden', createOrder:'Crear orden', addProduct:'Añadir producto', units:'uds', of:'de', entry:'Entrada', exit:'Salida', qty:'Cantidad', note:'Nota', optional:'opcional', location:'Ubicación', supplier:'Proveedor', category:'Categoría', stock:'Stock', status:'Estado', product:'Producto', date:'Fecha', products:'productos'},
    dash:{title:'Panel general', sub:'Resumen de tu almacén en tiempo real', kpiSkus:'SKUs activos', kpiValue:'Valor de inventario', kpiLow:'Stock bajo', kpiOrders:'Órdenes pendientes', flow:'Flujo mensual', flowSub:'Entradas y salidas', inLabel:'Entradas', outLabel:'Salidas', catTitle:'Inventario por categoría', lowTitle:'Necesita reposición', activity:'Actividad reciente'},
    status:{ok:'En stock', low:'Stock bajo', critical:'Crítico'},
    detail:{stockLevel:'Nivel de stock', quickMove:'Movimiento rápido', recent:'Movimientos recientes', info:'Información'},
    mov:{title:'Movimientos', sub:'Registra entradas y salidas de stock', newMove:'Nuevo movimiento', selectProduct:'Producto', type:'Tipo', history:'Historial', register:'Registrar movimiento'},
    alerts:{title:'Alertas de stock', sub:'productos por debajo del mínimo', suggest:'Sugerido', count:'alertas activas'},
    sup:{title:'Proveedores', sub:'Tus socios de abastecimiento', items:'prod.', lead:'Entrega', onTime:'Entregas a tiempo', days:'días'},
    ord:{title:'Órdenes de compra', sub:'Seguimiento de pedidos a proveedores', items:'Ítems', total:'Total', eta:'Entrega est.', st_intransit:'En tránsito', st_pending:'Pendiente', st_received:'Recibida', st_cancelled:'Cancelada'},
    rep:{title:'Reportes', sub:'Analítica de tu inventario', accuracy:'Exactitud', valueByCat:'Valor por categoría', topMoved:'Más movidos', monthlyFlow:'Flujo mensual'}
  },
  en:{
    login:{title:'Welcome back', sub:'Sign in to your inventory dashboard', email:'Email', pass:'Password', signin:'Sign in', remember:'Remember me', forgot:'Forgot password?', demo:'Enter demo', brandTag:'Warehouse management', hero:'Track every box, pallet and SKU in your warehouse from one place.'},
    nav:{dashboard:'Dashboard', products:'Products', movements:'Movements', alerts:'Alerts', suppliers:'Suppliers', orders:'Orders', reports:'Reports'},
    ui:{searchPh:'Search products, SKU…', registerMove:'Register movement', export:'Export', all:'All', viewAll:'View all', back:'Back', filter:'Filter', newOrder:'New order', createOrder:'Create order', addProduct:'Add product', units:'units', of:'of', entry:'Entry', exit:'Exit', qty:'Quantity', note:'Note', optional:'optional', location:'Location', supplier:'Supplier', category:'Category', stock:'Stock', status:'Status', product:'Product', date:'Date', products:'products'},
    dash:{title:'Overview', sub:'Your warehouse at a glance', kpiSkus:'Active SKUs', kpiValue:'Inventory value', kpiLow:'Low stock', kpiOrders:'Pending orders', flow:'Monthly flow', flowSub:'Inbound vs outbound', inLabel:'Inbound', outLabel:'Outbound', catTitle:'Inventory by category', lowTitle:'Needs restock', activity:'Recent activity'},
    status:{ok:'In stock', low:'Low', critical:'Critical'},
    detail:{stockLevel:'Stock level', quickMove:'Quick movement', recent:'Recent movements', info:'Details'},
    mov:{title:'Movements', sub:'Log stock entries and exits', newMove:'New movement', selectProduct:'Product', type:'Type', history:'History', register:'Register movement'},
    alerts:{title:'Stock alerts', sub:'items below minimum', suggest:'Suggested', count:'active alerts'},
    sup:{title:'Suppliers', sub:'Your sourcing partners', items:'prod.', lead:'Lead time', onTime:'On-time delivery', days:'days'},
    ord:{title:'Purchase orders', sub:'Track supplier orders', items:'Items', total:'Total', eta:'ETA', st_intransit:'In transit', st_pending:'Pending', st_received:'Received', st_cancelled:'Cancelled'},
    rep:{title:'Reports', sub:'Inventory analytics', accuracy:'Accuracy', valueByCat:'Value by category', topMoved:'Top moved', monthlyFlow:'Monthly flow'}
  }
};

export const SCREEN_SUB = (screen, L) => ({
  dashboard:L.dash.sub, products:L.ui.products, movements:L.mov.sub,
  alerts:L.alerts.sub, suppliers:L.sup.sub, orders:L.ord.sub, reports:L.rep.sub
}[screen] || '');
