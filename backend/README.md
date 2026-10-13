# Backend — API del Gestor de Inventario

API REST en **FastAPI** conectada a **PostgreSQL**. En local, Postgres está instalado en tu propia máquina.

> Estado: solo existe la estructura de carpetas. El código se escribe en la Fase 2 (ver `../docs/analisis.md`).

## Stack previsto

- **FastAPI**: la API.
- **SQLAlchemy 2**: el ORM, para trabajar las tablas como clases de Python.
- **Alembic**: las migraciones (versionado del esquema de la base de datos).
- **Pydantic**: para validar lo que entra y sale de la API.
- **psycopg**: el driver de PostgreSQL.

## Estructura

```
backend/
├── app/
│   ├── main.py        # (Fase 2) crea la app FastAPI y registra los routers
│   ├── config.py      # (Fase 2) lee las variables de entorno (.env)
│   ├── database.py    # (Fase 2) conexión y sesión a PostgreSQL
│   ├── models/        # tablas (SQLAlchemy): producto, bodega, movimiento...
│   ├── schemas/       # formas de entrada/salida de la API (Pydantic)
│   ├── routers/       # endpoints agrupados por recurso (/productos, /movimientos...)
│   └── services/      # reglas de negocio (ej. registrar un movimiento y actualizar el stock)
├── alembic/           # (Fase 2) migraciones
├── tests/             # pruebas
└── .env.example       # variables de entorno necesarias (copiar a .env)
```

## Correr en local (cuando exista el código)

```bash
python -m venv .venv
.venv\Scripts\activate
pip install -r requirements.txt
alembic upgrade head
uvicorn app.main:app --reload
```
