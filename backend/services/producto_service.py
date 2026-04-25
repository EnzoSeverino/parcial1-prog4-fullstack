from sqlmodel import Session, select
from models import Producto
from schemas.base import ProductoCreate

def crear_producto(session: Session, data: ProductoCreate) -> Producto:
    # El servicio recibe la sesion y los datos ya validados
    producto = Producto.model_validate(data)

    # La transaccion se controla aca
    session.add(producto)
    session.commit()
    session.refresh(producto)

    return producto

def listar_productos(session: Session, limit: int, offset: int):
    statement = select(Producto).offset(offset).limit(limit)
    return session.exec(statement).all()

def actualizar_producto(session: Session, product_id: int, data: ProductoCreate) -> Producto | None:
    
    # 1. Buscamos el producto en la DB
    producto_db = session.get(Producto, product_id)

    if not producto_db:
        return None
    
    # 2. Actualizamos los atributos del producto viejo con los datos nuevos
    # Extraemos los datos del esquema como un diccionario excluyendo lo que no se envió
    datos_nuevos = data.model_dump(exclude_unset=True)

    for key, value in datos_nuevos.items():
        setattr(producto_db, key, value)

    # 3. Guardamos los cambios
    session.add(producto_db)
    session.commit()
    session.refresh(producto_db)

    return producto_db

def eliminar_producto(session: Session, product_id: int):

    producto_db = session.get(Producto, product_id)

    if not producto_db:
        return False
    
    session.delete(producto_db)
    session.commit()

    return True
    