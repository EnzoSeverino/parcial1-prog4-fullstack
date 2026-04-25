// src/api/categoriasApi.ts

import type { Categoria, CategoriaCreate } from '../types';

const API_URL = 'http://localhost:8000/categorias';

export const getCategorias = async (): Promise<Categoria[]> => {
  const response = await fetch(API_URL);
  if (!response.ok) throw new Error('Error al cargar categorías');
  return response.json();
};

export const createCategoria = async (data: CategoriaCreate): Promise<Categoria> => {
  const response = await fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!response.ok) throw new Error('Error al crear categoría');
  return response.json();
};

export const updateCategoria = async (id: number, data: CategoriaCreate): Promise<Categoria> => {
  const response = await fetch(`${API_URL}/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!response.ok) throw new Error('Error al actualizar categoría');
  return response.json();
};

export const deleteCategoria = async (id: number): Promise<void> => {
  const response = await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
  if (!response.ok) throw new Error('Error al eliminar categoría');
};