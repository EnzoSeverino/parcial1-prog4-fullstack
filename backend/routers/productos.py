from fastapi import APIRouter, Depends, status, HTTPException, Query, Path
from sqlmodel import Session
from typing import Annotated, List

from uow.unit_of_work import get_uow
from schemas.base import ProductoCreate, ProductoRead
from services.producto_service import crear_producto, listar_productos, actualizar_producto, eliminar_producto

router = APIRouter(prefix="/productos", tags=["productos"])

@router.post("/", response_model=ProductoRead ,status_code=status.HTTP_201_CREATED)
def create(producto: ProductoCreate, session: Session = Depends(get_uow)):
    # El endpoint solo delega
    return crear_producto(session, producto)


@router.get("/", response_model=List[ProductoRead])
def listar(
    session: Session = Depends(get_uow),
    limit: Annotated[int, Query(ge=1, le=100, description="Límite")] = 10,
    offset: Annotated[int, Query(ge=0, description="Offset")] = 0
):
    productos = listar_productos(session, limit, offset)
    
    return productos


@router.put("/{producto_id}", response_model=ProductoRead)
def actualizar(
    producto_id: int = Path(..., gt=0),
    producto_data: ProductoCreate = None,
    session: Session = Depends(get_uow)
):
    
    producto_actualizado = actualizar_producto(session, producto_id, producto_data)

    if not producto_actualizado:
        raise HTTPException(status_code=404, detail="Producto no encontrado")
    
    return producto_actualizado


@router.delete("/{producto_id}", status_code=status.HTTP_204_NO_CONTENT)
def eliminar(
    producto_id: int = Path(..., gt=0),
    session: Session = Depends(get_uow)
):
    producto_eliminado = eliminar_producto(session, producto_id)

    if not producto_eliminado:
        raise HTTPException(status_code=404, detail="Producto no encontrado")
    
    return 