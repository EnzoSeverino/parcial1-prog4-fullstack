from sqlmodel import SQLModel, Field, Relationship
from typing import List, Optional

class ProductoCategoria(SQLModel, table=True):
    producto_id: int | None = Field(default=None, foreign_key="producto.id", primary_key=True)
    categoria_id: int | None = Field(default=None, foreign_key="categoria.id", primary_key=True)

class ProductoIngrediente(SQLModel, table=True):
    producto_id: int | None = Field(default=None, foreign_key="producto.id", primary_key=True)
    ingrediente_id: int | None = Field(default=None, foreign_key="ingrediente.id", primary_key=True)
    es_removible: bool = Field(default=False)

class Categoria(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    nombre: str = Field(max_length=100, unique=True)
    descripcion: Optional[str] = None
    es_principal: bool = Field(default=False)
    # Relación N:N
    productos: List["Producto"] = Relationship(back_populates="categorias", link_model=ProductoCategoria)

class Ingrediente(SQLModel, table=True):
    id: int | None = Field(default=None, primary_key=True)
    nombre: str = Field(max_length=100, unique=True)
    descripcion: str | None = None
    es_alergeno: bool = Field(default=False)
    productos: List["Producto"] = Relationship(back_populates="ingredientes", link_model=ProductoIngrediente)

class Producto(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    nombre: str = Field(max_length=150)
    descripcion: Optional[str] = None
    precio_base: float
    stock_cantidad: int = Field(default=0)
    disponible: bool = Field(default=True)
    imagenes_url: Optional[str] = Field(default=None) 
    
    categorias: List[Categoria] = Relationship(back_populates="productos", link_model=ProductoCategoria)
    ingredientes: List["Ingrediente"] = Relationship(back_populates="productos", link_model=ProductoIngrediente)