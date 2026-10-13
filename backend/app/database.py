from sqlalchemy import MetaData, create_engine
from sqlalchemy.orm import DeclarativeBase, sessionmaker

from app.config import settings

# Nombres predecibles para índices y restricciones (los usa Alembic en las migraciones)
NAMING_CONVENTION = {
    "ix": "ix_%(column_0_label)s",
    "uq": "uq_%(table_name)s_%(column_0_name)s",
    "ck": "ck_%(table_name)s_%(constraint_name)s",
    "fk": "fk_%(table_name)s_%(column_0_name)s_%(referred_table_name)s",
    "pk": "pk_%(table_name)s",
}

engine = create_engine(settings.database_url, pool_pre_ping=True)

SessionLocal = sessionmaker(bind=engine, autoflush=False)


class Base(DeclarativeBase):
    """Clase base de la que heredan todos los modelos (tablas)."""

    metadata = MetaData(naming_convention=NAMING_CONVENTION)


def get_db():
    """Entrega una sesión de base de datos por petición y la cierra al terminar."""
    with SessionLocal() as db:
        yield db