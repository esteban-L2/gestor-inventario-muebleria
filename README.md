# Gestor de Inventario — Mueblería

Sistema web para controlar el inventario de una mueblería: muebles terminados e insumos, bodegas y sala de exhibición, entradas y salidas, proveedores, órdenes de compra y reportes.

> 🚧 En construcción. Hoy el frontend funciona con datos de prueba; el backend con PostgreSQL es la siguiente fase.

## Stack

| Capa | Tecnología |
|---|---|
| Frontend | React 18 + Vite |
| Backend | FastAPI (Python) |
| Base de datos | PostgreSQL (local en desarrollo) |

## Estructura

```
gestor-inventario-muebleria/
├── frontend/   # interfaz web (React + Vite)
├── backend/    # API (FastAPI + SQLAlchemy + Alembic)
└── docs/       # análisis, modelo de datos y hoja de ruta
```

## Correr el frontend

```bash
cd frontend
npm install
npm run dev
```

Abre http://localhost:5173. El login es de demostración: entra con cualquier dato.

## Documentación

- [Análisis y plan del proyecto](docs/analisis.md)
- [Frontend](frontend/README.md)
- [Backend](backend/README.md)
