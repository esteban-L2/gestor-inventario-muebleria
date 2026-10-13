# Análisis y plan: Gestor de Inventario para mueblería

## 1. Punto de partida

El proyecto empezó como un **prototipo de interfaz** (React 18 + Vite 5) generado en el diseñador: 8 pantallas, en español e inglés, sin backend y con datos de prueba.

### Lo que funciona (solo en memoria)
- Lista de productos con filtro por categoría y búsqueda.
- Registrar entradas y salidas, que cambian el stock.
- Nivel de stock (ok, bajo o crítico) calculado contra el mínimo.
- Valor del inventario y distribución por categoría.
- Cambio de idioma ES/EN.

### Lo que es solo decorado
- **Login**: acepta cualquier dato.
- **Botones sin acción**: Exportar, Añadir producto, Nueva orden, la campana de notificaciones y "¿Olvidaste tu contraseña?".
- **Gráficas de flujo mensual**: usan números fijos (`INB` / `OUTB` en `data.js`).
- **Reportes**: los KPI son fijos (`3.4×`, `1,284`, `98.6%`) y el selector 7d/30d/90d no filtra nada.
- **Órdenes de compra**: solo se pueden ver; no se crean ni se reciben.
- **Dashboard**: "órdenes pendientes = 2" y las tendencias están fijas en el código.

### Errores y limitaciones detectados
1. Una salida mayor al stock deja el stock en 0, pero el historial guarda la cantidad completa, así que los datos no cuadran.
2. El campo "nota" del movimiento se descarta.
3. Los movimientos se asocian al producto **por nombre**, no por SKU.
4. Las fechas son textos fijos ("hace 2 h"), no fechas reales.
5. El contador `moved` suma entradas y salidas juntas.
6. Cada producto tiene una sola ubicación: no hay varias bodegas ni sala de exhibición.
7. Al recargar se pierde todo, y las pantallas no tienen URL (el botón "atrás" del navegador no funciona).
8. No se adapta al celular: grillas con columnas fijas.
9. Los estilos están dentro de cada componente, lo que los hace difíciles de mantener.

## 2. Lo particular de una mueblería

Además del inventario genérico, una mueblería necesita:

- **Producto terminado e insumos**: la mueblería **fabrica sus propios muebles**. Compra materia prima (tableros, telas, herrajes), la transforma en el taller y vende el mueble terminado.
- **Fabricación**: cada mueble tiene una receta (qué insumos lleva). Al terminar una orden de producción se descuentan los insumos y entra el mueble al stock con su costo real.
- **Variantes**: el mismo modelo en distintos colores, telas o acabados, cada uno con su propio stock.
- **Exhibición y bodega**: saber qué unidad está en el showroom y cuál en bodega, y poder moverlas entre ubicaciones.
- **Apartados o reservas**: un cliente abona y el mueble queda reservado. Sigue en stock, pero ya no está disponible para la venta.
- **Entregas a domicilio**: la salida se confirma cuando el mueble se entrega.
- **Daños y devoluciones**: ajustes de stock con motivo (rayado en transporte, garantía).

## 3. Arquitectura

```
[React + Vite]  ──HTTP/JSON──>  [FastAPI]  ──SQL──>  [PostgreSQL]
   frontend/                     backend/            local en tu PC
```

- **¿Por qué hace falta un backend?** El navegador no puede conectarse directamente a PostgreSQL: necesita una API en el medio que valide los datos y controle los permisos.
- **¿Por qué Postgres local?** Para aprender SQL de verdad (tablas, relaciones, transacciones, índices) sin depender de un servicio externo. Al publicar, se usa un Postgres en la nube (Neon, Render o Supabase) con el mismo esquema.

## 4. Modelo de datos (primera versión)

| Tabla | Para qué |
|---|---|
| `usuarios` | Quién entra; rol: `admin`, `bodeguero` o `vendedor` |
| `categorias` | Sala, Comedor, Dormitorio, Oficina, Exterior, Insumos |
| `proveedores` | Datos de contacto y tiempo de entrega |
| `ubicaciones` | Bodegas y sala de exhibición (`BOD-A1`, `EXH-01`…) |
| `productos` | SKU, nombre, categoría, tipo (terminado/insumo), costo, precio, mínimo, máximo |
| `variantes` | Color, tela o acabado de un producto (opcional al inicio) |
| `stock` | Cantidad de cada producto en cada ubicación |
| `movimientos` | **Libro de registro**: entrada, salida, ajuste o transferencia, con fecha, usuario, cantidad y nota. Nunca se borra. |
| `ordenes_compra` + `ordenes_compra_lineas` | Pedidos a proveedores; al recibirlos se generan las entradas |
| `reservas` | Apartados de clientes |

**Regla clave:** el stock solo cambia a través de un movimiento, dentro de una **transacción**. Si una salida deja el stock negativo, se rechaza todo el movimiento.

## 5. Hoja de ruta

| Fase | Contenido | Estado |
|---|---|---|
| 0 | Repo, prototipo, estructura de carpetas y adaptación a mueblería | ✅ |
| 1 | Ordenar el frontend: React Router, estilos aparte, componentes reutilizables, diseño para celular | ⏳ |
| 2 | Instalar Postgres, esquema, migraciones con Alembic y API base en FastAPI | ⏳ |
| 3 | CRUD de productos, categorías, proveedores y ubicaciones; conectar el frontend | ⏳ |
| 4 | Movimientos reales con transacciones y kardex por producto | ⏳ |
| 5 | Login real (JWT) y roles | ⏳ |
| 6 | Órdenes de compra: crear → enviar → recibir | ⏳ |
| 7 | Fabricación: recetas (lista de materiales) y órdenes de producción | ⏳ |
| 8 | Dashboard y reportes con datos reales; exportar a Excel/PDF | ⏳ |
| 9 | Publicación: Postgres en la nube, API en Render y frontend en Vercel | ⏳ |
| 10 | Extras: reservas, variantes, código de barras con cámara, toma física | ⏳ |
