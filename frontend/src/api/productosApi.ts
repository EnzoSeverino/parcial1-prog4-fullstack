// src/api/productosApi.ts

import type { Producto, ProductoCreate } from '../types';

const API_URL = 'http://localhost:8000/productos';

export const getProductos = async (): Promise<Producto[]> => {
  const response = await fetch(API_URL);
  if (!response.ok) throw new Error('Error al cargar productos');
  return response.json();
};

export const createProducto = async (data: ProductoCreate): Promise<Producto> => {
  const response = await fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!response.ok) throw new Error('Error al crear producto');
  return response.json();
};

export const updateProducto = async (id: number, data: ProductoCreate): Promise<Producto> => {
  const response = await fetch(`${API_URL}/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!response.ok) throw new Error('Error al actualizar producto');
  return response.json();
};

export const deleteProducto = async (id: number): Promise<void> => {
  const response = await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
  if (!response.ok) throw new Error('Error al eliminar producto');
};