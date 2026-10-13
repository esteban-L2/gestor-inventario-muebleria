# Modelo de datos

Base de datos: **PostgreSQL 18**, base `inventario_muebleria`.
Las tablas se crean con **migraciones de Alembic** a partir de los modelos de SQLAlchemy (Fase 2). Este documento es el diseño de referencia.

## Diagrama

```mermaid
erDiagram
    usuarios ||--o{ movimientos : "registra"
    usuarios ||--o{ ordenes_compra : "crea"
    usuarios ||--o{ reservas : "registra"

    categorias ||--o{ productos : "agrupa"
    proveedores ||--o{ productos : "abastece"
    proveedores ||--o{ ordenes_compra : "recibe"

    productos ||--o{ existencias : "tiene stock en"
    ubicaciones ||--o{ existencias : "guarda"

    productos ||--o{ movimientos : "se mueve en"
    ubicaciones ||--o{ movimientos : "origen / destino"

    ordenes_compra ||--|{ ordenes_compra_lineas : "contiene"
    productos ||--o{ ordenes_compra_lineas : "se pide en"
    ordenes_compra |o--o{ movimientos : "genera al recibir"

    productos ||--o{ reservas : "se aparta en"
    ubicaciones ||--o{ reservas : "desde"

    productos ||--o{ recetas : "mueble lleva"
    productos ||--o{ recetas : "insumo usado en"
    productos ||--o{ ordenes_produccion : "se fabrica en"
    usuarios ||--o{ ordenes_produccion : "crea"
    ordenes_produccion |o--o{ movimientos : "consume y produce"

    usuarios {
        int id PK
        text nombre
        text email UK
        text password_hash
        rol_usuario rol "admin | bodeguero | vendedor"
        bool activo
        timestamptz creado_en
    }
    categorias {
        int id PK
        text nombre UK
        text color
    }
    proveedores {
        int id PK
        text nombre
        text ruc UK "13 digitos, opcional"
        text contacto
        text telefono
        text email
        int dias_entrega
        bool activo
    }
    ubicaciones {
        int id PK
        text codigo UK "BOD-A1, EXH-01"
        text nombre
        tipo_ubicacion tipo "bodega | exhibicion | taller"
        bool activo
    }
    productos {
        int id PK
        text sku UK "MB-1001"
        text nombre
        text descripcion
        tipo_producto tipo "terminado | insumo"
        int categoria_id FK
        int proveedor_id FK "proveedor principal"
        text unidad "unidad, metro, par, plancha"
        numeric costo "costo promedio"
        numeric precio_venta "null en insumos"
        numeric stock_minimo
        numeric stock_maximo
        bool activo
        timestamptz creado_en
        timestamptz actualizado_en
    }
    existencias {
        int producto_id PK, FK
        int ubicacion_id PK, FK
        numeric cantidad "nunca negativa"
    }
    movimientos {
        bigint id PK
        tipo_movimiento tipo "entrada | salida | transferencia"
        motivo_movimiento motivo "compra, venta, devolucion, danio..."
        int producto_id FK
        int ubicacion_origen_id FK "null en entradas"
        int ubicacion_destino_id FK "null en salidas"
        numeric cantidad "mayor que 0"
        numeric costo_unitario
        int orden_compra_id FK "opcional"
        int orden_produccion_id FK "opcional"
        int usuario_id FK
        text nota
        timestamptz fecha
    }
    ordenes_compra {
        int id PK
        text numero UK "OC-0001"
        int proveedor_id FK
        estado_orden estado "borrador | enviada | parcial | recibida | cancelada"
        date fecha_emision
        date fecha_entrega_estimada
        int creado_por FK
        text nota
    }
    ordenes_compra_lineas {
        int id PK
        int orden_id FK
        int producto_id FK
        numeric cantidad_pedida
        numeric cantidad_recibida
        numeric costo_unitario
    }
    reservas {
        int id PK
        int producto_id FK
        int ubicacion_id FK
        numeric cantidad
        text cliente_nombre
        text cliente_telefono
        numeric abono
        estado_reserva estado "activa | entregada | cancelada"
        date fecha_limite
        int usuario_id FK
        timestamptz creado_en
    }
    recetas {
        int producto_id PK, FK "el mueble terminado"
        int insumo_id PK, FK "el insumo que lleva"
        numeric cantidad "por cada mueble"
    }
    ordenes_produccion {
        int id PK
        text numero UK "OP-0001"
        int producto_id FK "mueble a fabricar"
        numeric cantidad
        estado_produccion estado "planificada | en_proceso | terminada | cancelada"
        int ubicacion_taller_id FK
        int ubicacion_destino_id FK "donde queda el mueble"
        date fecha_inicio
        date fecha_fin
        numeric costo_mano_obra
        int creado_por FK
        text nota
    }
```

## Las tablas en una frase

| Tabla | Qué guarda |
|---|---|
| `usuarios` | Quién usa el sistema y con qué rol. |
| `categorias` | Sala, Comedor, Dormitorio, Oficina, Exterior, Insumos. |
| `proveedores` | A quién se le compra. |
| `ubicaciones` | Dónde puede estar algo físicamente: bodega, exhibición o taller. |
| `productos` | El catálogo: muebles terminados e insumos. **No guarda el stock.** |
| `existencias` | Cuántas unidades hay de cada producto **en cada ubicación**. |
| `movimientos` | El historial de todo lo que entra, sale o se traslada. Nunca se edita ni se borra. |
| `ordenes_compra` / `_lineas` | Pedidos a proveedores y lo que se ha recibido de cada uno. |
| `reservas` | Muebles apartados por un cliente con un abono. |
| `recetas` | La "lista de materiales" de cada mueble: qué insumos lleva y cuánto de cada uno. |
| `ordenes_produccion` | La fabricación de N muebles en el taller: consume insumos y produce muebles terminados. |

## Decisiones de diseño (y por qué)

1. **El stock vive en `existencias`, no en `productos`.** El mismo sofá puede tener 2 unidades en exhibición y 4 en bodega. El stock total es la suma de sus filas.

2. **Los movimientos son un libro contable.** Cada cambio de stock es una fila nueva en `movimientos`; las filas nunca se editan. Si hubo un error, se registra un movimiento contrario. Así siempre se puede reconstruir el **kardex** de un producto.

3. **Movimiento y existencias cambian en la misma transacción.** El backend inserta el movimiento y actualiza `existencias` dentro de una sola transacción, bloqueando la fila con `SELECT ... FOR UPDATE`. Si algo falla, no se guarda nada. Además, `CHECK (cantidad >= 0)` en `existencias` impide que el stock quede negativo, aunque el código tenga un error.

4. **Los tipos de movimiento definen qué ubicación es obligatoria**, con un `CHECK` en la tabla:
   - `entrada`: solo destino (compra, devolución de un cliente, ajuste positivo por conteo).
   - `salida`: solo origen (venta, daño, consumo en el taller, ajuste negativo).
   - `transferencia`: origen y destino distintos (de bodega a exhibición).

5. **Las cantidades son `numeric(12,2)`, no enteros.** Las telas se miden en metros (por ejemplo 2,5 m). Para muebles simplemente se usan números enteros.

6. **El dinero es `numeric(12,2)`, nunca `float`.** `float` tiene errores de redondeo (0,1 + 0,2 ≠ 0,3).

7. **El costo es promedio ponderado.** Con cada entrada por compra se recalcula `productos.costo`. El valor del inventario es la cantidad por el costo.

8. **Disponible no es lo mismo que en stock.** Disponible = existencias − reservas activas. Un sofá apartado sigue físicamente en la tienda, pero no se puede vender a otro cliente.

9. **Las variantes son SKUs separados (por ahora).** "Sofá 3 puestos gris" y "Sofá 3 puestos azul" son dos productos. Es más simple, y una tabla `variantes` se puede agregar después si hace falta.

10. **La fabricación se registra con los mismos movimientos.** La mueblería fabrica sus propios muebles. Cuando una orden de producción se **termina**, en una sola transacción:
    - se registra una `salida` (motivo `produccion`) por cada insumo de la receta × la cantidad fabricada, desde el taller;
    - se registra una `entrada` (motivo `produccion`) del mueble terminado en su ubicación de destino;
    - el costo del mueble = costo de los insumos consumidos + mano de obra.

    Si falta algún insumo, se rechaza la orden completa.

11. **Las fechas usan `timestamptz`** (con zona horaria), para que no haya confusiones con la hora de Ecuador.

12. **Nada se borra físicamente si tiene historial.** Productos, proveedores y ubicaciones usan `activo = false`.

## Orden de construcción

| Etapa | Tablas |
|---|---|
| Fase 2–4 (núcleo) | `usuarios`, `categorias`, `proveedores`, `ubicaciones`, `productos`, `existencias`, `movimientos` |
| Fase 6 | `ordenes_compra`, `ordenes_compra_lineas` |
| Fase 7 | `recetas`, `ordenes_produccion` (fabricación) |
| Fase 10 | `reservas` (y `variantes` si hace falta) |
