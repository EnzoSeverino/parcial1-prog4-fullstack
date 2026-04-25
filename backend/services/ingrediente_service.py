from sqlmodel import Session, select
from models import Ingrediente
from schemas.base import IngredienteCreate

def crear_ingrediente(session: Session, data: IngredienteCreate) -> Ingrediente:
    ingrediente = Ingrediente.model_validate(data)
    session.add(ingrediente)
    session.commit()
    session.refresh(ingrediente)
    return ingrediente

def listar_ingredientes(session: Session, limit: int, offset: int):
    statement = select(Ingrediente).offset(offset).limit(limit)
    return session.exec(statement).all()

def actualizar_ingrediente(session: Session, ingrediente_id: int, data: IngredienteCreate) -> Ingrediente | None:
    ingrediente_db = session.get(Ingrediente, ingrediente_id)
    if not ingrediente_db:
        return None
    
    datos_nuevos = data.model_dump(exclude_unset=True)
    for key, value in datos_nuevos.items():
        setattr(ingrediente_db, key, value)
        
    session.add(ingrediente_db)
    session.commit()
    session.refresh(ingrediente_db)
    return ingrediente_db

def eliminar_ingrediente(session: Session, ingrediente_id: int):
    ingrediente_db = session.get(Ingrediente, ingrediente_id)
    if not ingrediente_db:
        return False
    
    session.delete(ingrediente_db)
    session.commit()
    return True