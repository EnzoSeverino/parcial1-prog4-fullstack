from fastapi import APIRouter, Depends, status, HTTPException, Query, Path
from sqlmodel import Session
from typing import Annotated, List

from uow.unit_of_work import get_uow
from schemas.base import IngredienteCreate, IngredienteRead # <-- Importante
from services.ingrediente_service import crear_ingrediente, listar_ingredientes, actualizar_ingrediente, eliminar_ingrediente

router = APIRouter(prefix="/ingredientes", tags=["ingredientes"])

@router.post("/", response_model=IngredienteRead, status_code=status.HTTP_201_CREATED)
def create(ingrediente: IngredienteCreate, session: Session = Depends(get_uow)):
    return crear_ingrediente(session, ingrediente)

@router.get("/", response_model=List[IngredienteRead])
def listar(
    session: Session = Depends(get_uow),
    limit: Annotated[int, Query(ge=1, le=100)] = 10,
    offset: Annotated[int, Query(ge=0)] = 0
):
    ingredientes = listar_ingredientes(session, limit, offset)
    
    return ingredientes

@router.put("/{ingrediente_id}", response_model=IngredienteRead)
def actualizar(
    ingrediente_id: int = Path(..., gt=0),
    ingrediente_data: IngredienteCreate = None,
    session: Session = Depends(get_uow)
):
    ingrediente_actualizado = actualizar_ingrediente(session, ingrediente_id, ingrediente_data)
    if not ingrediente_actualizado:
        raise HTTPException(status_code=404, detail="Ingrediente no encontrado")
    return ingrediente_actualizado

@router.delete("/{ingrediente_id}", status_code=status.HTTP_204_NO_CONTENT)
def eliminar(
    ingrediente_id: int = Path(..., gt=0),
    session: Session = Depends(get_uow)
):
    ingrediente_eliminado = eliminar_ingrediente(session, ingrediente_id)
    if not ingrediente_eliminado:
        raise HTTPException(status_code=404, detail="Ingrediente no encontrado")
    return