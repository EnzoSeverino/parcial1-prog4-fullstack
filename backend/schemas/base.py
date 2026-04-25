from pydantic import BaseModel
from typing import Optional

# --- CATEGORÍAS ---
class CategoriaCreate(BaseModel):
    nombre: str
    descripcion: Optional[str] = None
    es_principal: bool = False

class CategoriaRead(CategoriaCreate):
    id: int

# --- INGREDIENTES ---
class IngredienteCreate(BaseModel):
    nombre: str
    descripcion: Optional[str] = None
    es_alergeno: bool = False

class IngredienteRead(IngredienteCreate):
    id: int

# --- PRODUCTOS ---
class ProductoCreate(BaseModel):
    nombre: str
    descripcion: Optional[str] = None
    precio_base: float
    stock_cantidad: int = 0
    disponible: bool = True
    imagenes_url: Optional[str] = None

class ProductoRead(ProductoCreate):
    id: int