# Acopio — Gestión de inventario (React + Vite)

Prototipo de front-end para gestión de inventario/almacén, generado a partir de un diseño HTML de referencia. Verde fresco, bilingüe (ES/EN), animado.

## Instalar y correr

```bash
npm install
npm run dev
```

Abre http://localhost:5173

## Build

```bash
npm run build
npm run preview
```

## Estructura

- `src/data.js` — datos mock (productos, categorías, proveedores, órdenes, movimientos).
- `src/translations.js` — diccionario ES/EN.
- `src/utils.js` — helpers (nivel de stock, colores de severidad, formato).
- `src/Icon.jsx` — set de iconos SVG inline.
- `src/components/` — Login, Sidebar, Topbar, Toast (shell de la app).
- `src/screens/` — Dashboard, Products, Detail, Movements, Alerts, Suppliers, Orders, Reports.
- `src/App.jsx` — estado global (auth, pantalla activa, idioma, productos, movimientos) y enrutamiento simple por estado (sin react-router).

## Notas

- Todo el estado vive en `App.jsx` con hooks (`useState`). No hay backend: los datos son mock y los movimientos de stock se aplican en memoria.
- Los estilos son inline (mismo enfoque que el prototipo original) + una hoja `index.css` mínima para variables CSS, keyframes y estados hover.
- Para producción real: conectar `applyMove`, `products` y `movements` a una API, añadir validación de formularios y manejo de errores.
