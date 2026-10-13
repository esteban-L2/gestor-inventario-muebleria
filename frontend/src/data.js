export const PRODUCTS = [
  {sku:'MB-1001', es:'Sofá 3 puestos tela gris', en:'3-seat gray fabric sofa', cat:'sala', loc:'EXH-01', stock:6, min:4, max:15, price:420, supplier:'Tapicería Andina', moved:18},
  {sku:'MB-1002', es:'Juego de comedor 6 sillas', en:'6-chair dining set', cat:'comedor', loc:'BOD-B2', stock:2, min:3, max:10, price:780, supplier:'Maderas del Valle', moved:9},
  {sku:'MB-1003', es:'Cama 2 plazas tipo cajón', en:'Double storage bed', cat:'dormitorio', loc:'BOD-C1', stock:5, min:3, max:12, price:350, supplier:'Maderas del Valle', moved:11},
  {sku:'MB-1004', es:'Colchón ortopédico 2 plazas', en:'Orthopedic double mattress', cat:'dormitorio', loc:'BOD-C4', stock:1, min:4, max:16, price:260, supplier:'Colchones Descanso', moved:20},
  {sku:'MB-1005', es:'Escritorio ejecutivo', en:'Executive desk', cat:'oficina', loc:'EXH-03', stock:7, min:2, max:10, price:310, supplier:'OfiMuebles', moved:6},
  {sku:'MB-1006', es:'Silla ergonómica', en:'Ergonomic chair', cat:'oficina', loc:'BOD-D1', stock:14, min:6, max:30, price:95, supplier:'OfiMuebles', moved:25},
  {sku:'MB-1007', es:'Juego de jardín 4 piezas', en:'4-piece patio set', cat:'exterior', loc:'BOD-E1', stock:3, min:2, max:8, price:540, supplier:'Metálicas del Sur', moved:4},
  {sku:'MB-1008', es:'Tablero MDF 15 mm', en:'15 mm MDF board', cat:'insumos', loc:'BOD-F2', stock:48, min:30, max:150, price:38, supplier:'Tableros Pacífico', moved:70},
  {sku:'MB-1009', es:'Tela chenille (metro)', en:'Chenille fabric (meter)', cat:'insumos', loc:'BOD-F5', stock:12, min:40, max:200, price:9.5, supplier:'Tapicería Andina', moved:85},
  {sku:'MB-1010', es:'Bisagras cierre lento (par)', en:'Soft-close hinges (pair)', cat:'insumos', loc:'BOD-F7', stock:160, min:80, max:400, price:3.2, supplier:'Herrajes Cuenca', moved:120}
];

export const CATS = [
  {key:'sala', es:'Sala', en:'Living room', color:'#0E3B2A'},
  {key:'comedor', es:'Comedor', en:'Dining room', color:'#117A4F'},
  {key:'dormitorio', es:'Dormitorio', en:'Bedroom', color:'#2BA86B'},
  {key:'oficina', es:'Oficina', en:'Office', color:'#5FD39A'},
  {key:'exterior', es:'Exterior', en:'Outdoor', color:'#88CFAB'},
  {key:'insumos', es:'Insumos', en:'Supplies', color:'#C2E8D2'}
];

export const SUPPLIERS = [
  {name:'Tapicería Andina', contact:'ventas@tapiceriaandina.ec', lead:7, onTime:92, cat:'sala', avBg:'#0E3B2A'},
  {name:'Maderas del Valle', contact:'pedidos@maderasdelvalle.ec', lead:10, onTime:88, cat:'comedor', avBg:'#117A4F'},
  {name:'Colchones Descanso', contact:'distribucion@colchonesdescanso.ec', lead:4, onTime:95, cat:'dormitorio', avBg:'#2BA86B'},
  {name:'OfiMuebles', contact:'contacto@ofimuebles.ec', lead:6, onTime:90, cat:'oficina', avBg:'#5FA882'},
  {name:'Metálicas del Sur', contact:'ventas@metalicasdelsur.ec', lead:12, onTime:78, cat:'exterior', avBg:'#3E7A5C'},
  {name:'Tableros Pacífico', contact:'ventas@tablerospacifico.ec', lead:3, onTime:97, cat:'insumos', avBg:'#6BAA87'},
  {name:'Herrajes Cuenca', contact:'info@herrajescuenca.ec', lead:2, onTime:98, cat:'insumos', avBg:'#4F8F6E'}
];

export const ORDERS = [
  {po:'OC-2041', supplier:'Colchones Descanso', items:2, total:2080, eta:{es:'2 jul', en:'Jul 2'}, status:'intransit'},
  {po:'OC-2040', supplier:'Tapicería Andina', items:3, total:1650, eta:{es:'5 jul', en:'Jul 5'}, status:'pending'},
  {po:'OC-2039', supplier:'Tableros Pacífico', items:2, total:1900, eta:{es:'recibida', en:'received'}, status:'received'},
  {po:'OC-2038', supplier:'Maderas del Valle', items:1, total:3120, eta:{es:'8 jul', en:'Jul 8'}, status:'pending'},
  {po:'OC-2037', supplier:'Metálicas del Sur', items:1, total:1080, eta:{es:'—', en:'—'}, status:'cancelled'}
];

export const MONTHS_ES = ['Ene','Feb','Mar','Abr','May','Jun'];
export const MONTHS_EN = ['Jan','Feb','Mar','Apr','May','Jun'];
export const INB = [420,380,510,460,540,610];
export const OUTB = [360,400,420,480,500,560];

export const INITIAL_MOVEMENTS = [
  {type:'in', es:'Tablero MDF 15 mm', en:'15 mm MDF board', qty:40, loc:'BOD-F2', ago:{es:'hace 2 h', en:'2h ago'}, user:'Juan R.'},
  {type:'out', es:'Sofá 3 puestos tela gris', en:'3-seat gray fabric sofa', qty:1, loc:'EXH-01', ago:{es:'hace 3 h', en:'3h ago'}, user:'María L.'},
  {type:'in', es:'Bisagras cierre lento (par)', en:'Soft-close hinges (pair)', qty:100, loc:'BOD-F7', ago:{es:'hace 5 h', en:'5h ago'}, user:'Juan R.'},
  {type:'out', es:'Colchón ortopédico 2 plazas', en:'Orthopedic double mattress', qty:2, loc:'BOD-C4', ago:{es:'ayer', en:'yesterday'}, user:'Sofía P.'},
  {type:'in', es:'Silla ergonómica', en:'Ergonomic chair', qty:10, loc:'BOD-D1', ago:{es:'ayer', en:'yesterday'}, user:'Carlos M.'},
  {type:'out', es:'Juego de comedor 6 sillas', en:'6-chair dining set', qty:1, loc:'BOD-B2', ago:{es:'hace 2 d', en:'2d ago'}, user:'María L.'}
];
