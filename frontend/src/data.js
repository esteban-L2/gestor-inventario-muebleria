export const PRODUCTS = [
  {sku:'WH-1001', es:'Tornillos M6', en:'M6 Screws', cat:'hardware', loc:'A-12', stock:1240, min:300, max:2000, price:0.05, supplier:'Aceros del Norte', moved:320},
  {sku:'WH-1002', es:'Cinta de embalaje', en:'Packing tape', cat:'packaging', loc:'B-03', stock:84, min:100, max:600, price:2.8, supplier:'PackPro', moved:210},
  {sku:'WH-1003', es:'Guantes de nitrilo', en:'Nitrile gloves', cat:'safety', loc:'C-07', stock:32, min:50, max:400, price:0.18, supplier:'SafeHands', moved:180},
  {sku:'WH-1004', es:'Cajas de cartón 40×40', en:'Cardboard boxes 40×40', cat:'packaging', loc:'B-01', stock:560, min:200, max:1500, price:1.4, supplier:'PackPro', moved:260},
  {sku:'WH-1005', es:'Aceite lubricante', en:'Lubricant oil', cat:'maintenance', loc:'D-09', stock:18, min:24, max:120, price:11, supplier:'MecaSupply', moved:64},
  {sku:'WH-1006', es:'Palets de madera', en:'Wooden pallets', cat:'logistics', loc:'E-02', stock:210, min:80, max:500, price:24, supplier:'Maderera Sur', moved:140},
  {sku:'WH-1007', es:'Etiquetas térmicas', en:'Thermal labels', cat:'office', loc:'A-05', stock:940, min:200, max:1200, price:0.04, supplier:'PrintHub', moved:150},
  {sku:'WH-1008', es:'Casco de seguridad', en:'Safety helmet', cat:'safety', loc:'C-01', stock:65, min:30, max:200, price:18, supplier:'SafeHands', moved:48},
  {sku:'WH-1009', es:'Bridas plásticas', en:'Cable ties', cat:'hardware', loc:'A-15', stock:7, min:100, max:800, price:0.03, supplier:'Aceros del Norte', moved:90},
  {sku:'WH-1010', es:'Film estirable', en:'Stretch film', cat:'packaging', loc:'B-08', stock:145, min:60, max:400, price:21, supplier:'PackPro', moved:120}
];

export const CATS = [
  {key:'hardware', es:'Ferretería', en:'Hardware', color:'#0E3B2A'},
  {key:'packaging', es:'Embalaje', en:'Packaging', color:'#117A4F'},
  {key:'safety', es:'Seguridad', en:'Safety', color:'#2BA86B'},
  {key:'maintenance', es:'Mantenimiento', en:'Maintenance', color:'#5FD39A'},
  {key:'logistics', es:'Logística', en:'Logistics', color:'#88CFAB'},
  {key:'office', es:'Oficina', en:'Office', color:'#C2E8D2'}
];

export const SUPPLIERS = [
  {name:'Aceros del Norte', contact:'ventas@acerosdelnorte.mx', lead:5, onTime:96, cat:'hardware', avBg:'#0E3B2A'},
  {name:'PackPro', contact:'orders@packpro.com', lead:3, onTime:91, cat:'packaging', avBg:'#117A4F'},
  {name:'SafeHands', contact:'hello@safehands.io', lead:7, onTime:88, cat:'safety', avBg:'#2BA86B'},
  {name:'MecaSupply', contact:'soporte@mecasupply.mx', lead:9, onTime:79, cat:'maintenance', avBg:'#5FA882'},
  {name:'Maderera Sur', contact:'contacto@maderasur.cl', lead:6, onTime:84, cat:'logistics', avBg:'#3E7A5C'},
  {name:'PrintHub', contact:'team@printhub.co', lead:2, onTime:98, cat:'office', avBg:'#6BAA87'}
];

export const ORDERS = [
  {po:'PO-2041', supplier:'PackPro', items:3, total:1240, eta:{es:'2 jul', en:'Jul 2'}, status:'intransit'},
  {po:'PO-2040', supplier:'SafeHands', items:5, total:860, eta:{es:'5 jul', en:'Jul 5'}, status:'pending'},
  {po:'PO-2039', supplier:'Aceros del Norte', items:2, total:2310, eta:{es:'recibida', en:'received'}, status:'received'},
  {po:'PO-2038', supplier:'MecaSupply', items:1, total:180, eta:{es:'8 jul', en:'Jul 8'}, status:'pending'},
  {po:'PO-2037', supplier:'Maderera Sur', items:4, total:1500, eta:{es:'—', en:'—'}, status:'cancelled'}
];

export const MONTHS_ES = ['Ene','Feb','Mar','Abr','May','Jun'];
export const MONTHS_EN = ['Jan','Feb','Mar','Apr','May','Jun'];
export const INB = [420,380,510,460,540,610];
export const OUTB = [360,400,420,480,500,560];

export const INITIAL_MOVEMENTS = [
  {type:'in', es:'Cajas de cartón 40×40', en:'Cardboard boxes 40×40', qty:200, loc:'B-01', ago:{es:'hace 2 h', en:'2h ago'}, user:'Juan R.'},
  {type:'out', es:'Tornillos M6', en:'M6 Screws', qty:50, loc:'A-12', ago:{es:'hace 3 h', en:'3h ago'}, user:'María L.'},
  {type:'in', es:'Etiquetas térmicas', en:'Thermal labels', qty:120, loc:'A-05', ago:{es:'hace 5 h', en:'5h ago'}, user:'Juan R.'},
  {type:'out', es:'Guantes de nitrilo', en:'Nitrile gloves', qty:12, loc:'C-07', ago:{es:'ayer', en:'yesterday'}, user:'Sofía P.'},
  {type:'in', es:'Film estirable', en:'Stretch film', qty:30, loc:'B-08', ago:{es:'ayer', en:'yesterday'}, user:'Carlos M.'},
  {type:'out', es:'Palets de madera', en:'Wooden pallets', qty:8, loc:'E-02', ago:{es:'hace 2 d', en:'2d ago'}, user:'María L.'}
];
