from sqlmodel import Session, select
from models import Categoria
from schemas.base import CategoriaCreate

def crear_categoria(session: Session, data: CategoriaCreate) -> Categoria:
    categoria = Categoria.model_validate(data)
    session.add(categoria)
    session.commit()
    session.refresh(categoria)
    return categoria

def listar_categorias(session: Session, limit: int, offset: int):
    statement = select(Categoria).offset(offset).limit(limit)
    return session.exec(statement).all()

def actualizar_categoria(session: Session, categoria_id: int, data: CategoriaCreate) -> Categoria | None:
    categoria_db = session.get(Categoria, categoria_id)
    if not categoria_db:
        return None
    
    datos_nuevos = data.model_dump(exclude_unset=True)
    for key, value in datos_nuevos.items():
        setattr(categoria_db, key, value)
        
    session.add(categoria_db)
    session.commit()
    session.refresh(categoria_db)
    return categoria_db

def eliminar_categoria(session: Session, categoria_id: int):
    categoria_db = session.get(Categoria, categoria_id)
    if not categoria_db:
        return False
    
    session.delete(categoria_db)
    session.commit()
    return True