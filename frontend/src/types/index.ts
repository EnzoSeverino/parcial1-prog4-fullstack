export interface Categoria {
  id: number;
  nombre: string;
  descripcion?: string;
  es_principal: boolean;
}

export type CategoriaCreate = Omit<Categoria, 'id'>;

export interface Producto {
  id: number;
  nombre: string;
  descripcion?: string;
  precio_base: number;
  stock_cantidad: number;
  disponible: boolean;
  imagenes_url?: string;
}

export type ProductoCreate = Omit<Producto, 'id'>;

export interface Ingrediente {
  id: number;
  nombre: string;
  descripcion?: string;
  es_alergeno: boolean;
}

export type IngredienteCreate = Omit<Ingrediente, 'id'>;