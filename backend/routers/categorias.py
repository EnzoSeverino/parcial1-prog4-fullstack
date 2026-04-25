from fastapi import APIRouter, Depends, status, HTTPException, Query, Path
from sqlmodel import Session
from typing import Annotated, List

from uow.unit_of_work import get_uow
from schemas.base import CategoriaCreate, CategoriaRead # <-- Importante
from services.categoria_service import crear_categoria, listar_categorias, actualizar_categoria, eliminar_categoria

router = APIRouter(prefix="/categorias", tags=["categorias"])

@router.post("/", response_model=CategoriaRead, status_code=status.HTTP_201_CREATED)
def create(categoria: CategoriaCreate, session: Session = Depends(get_uow)):
    return crear_categoria(session, categoria)

@router.get("/", response_model=List[CategoriaRead])
def listar(
    session: Session = Depends(get_uow),
    limit: Annotated[int, Query(ge=1, le=100)] = 10,
    offset: Annotated[int, Query(ge=0)] = 0
):
    categorias = listar_categorias(session, limit, offset)
    
    return categorias

@router.put("/{categoria_id}", response_model=CategoriaRead)
def actualizar(
    categoria_id: int = Path(..., gt=0),
    categoria_data: CategoriaCreate = None,
    session: Session = Depends(get_uow)
):
    categoria_actualizada = actualizar_categoria(session, categoria_id, categoria_data)
    if not categoria_actualizada:
        raise HTTPException(status_code=404, detail="Categoría no encontrada")
    return categoria_actualizada

@router.delete("/{categoria_id}", status_code=status.HTTP_204_NO_CONTENT)
def eliminar(
    categoria_id: int = Path(..., gt=0),
    session: Session = Depends(get_uow)
):
    categoria_eliminada = eliminar_categoria(session, categoria_id)
    if not categoria_eliminada:
        raise HTTPException(status_code=404, detail="Categoría no encontrada")
    return