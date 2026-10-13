# Frontend — Gestor de Inventario (React + Vite)

Interfaz web del gestor de inventario para la mueblería. Por ahora funciona con **datos de prueba** (`src/data.js`); en las siguientes fases se conecta al backend.

## Correr en local

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

- `src/config.js`: nombre de la aplicación.
- `src/data.js`: datos de prueba (muebles, categorías, proveedores, órdenes, movimientos).
- `src/translations.js`: textos en español e inglés.
- `src/utils.js`: helpers (nivel de stock, colores de severidad, formato).
- `src/Icon.jsx`: iconos SVG.
- `src/components/`: Login, Sidebar, Topbar y Toast (el armazón de la app).
- `src/screens/`: Dashboard, Products, Detail, Movements, Alerts, Suppliers, Orders y Reports.
- `src/App.jsx`: estado global y navegación entre pantallas (por ahora sin react-router).

## Estado actual

- No hay backend: los movimientos de stock se aplican solo en memoria y se pierden al recargar.
- El login es de demostración: acepta cualquier dato.
- Los estilos van dentro de cada componente, más una hoja `index.css` mínima con variables CSS y animaciones.

Ver [`../docs/analisis.md`](../docs/analisis.md) para la lista de pendientes.
