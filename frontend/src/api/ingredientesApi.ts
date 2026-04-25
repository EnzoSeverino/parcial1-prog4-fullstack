import type { Ingrediente, IngredienteCreate } from '../types';

const API_URL = 'http://localhost:8000/ingredientes';

export const getIngredientes = async (): Promise<Ingrediente[]> => {
  const response = await fetch(API_URL);
  if (!response.ok) throw new Error('Error al cargar ingredientes');
  return response.json();
};

export const createIngrediente = async (data: IngredienteCreate): Promise<Ingrediente> => {
  const response = await fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!response.ok) throw new Error('Error al crear ingrediente');
  return response.json();
};

export const updateIngrediente = async (id: number, data: IngredienteCreate): Promise<Ingrediente> => {
  const response = await fetch(`${API_URL}/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!response.ok) throw new Error('Error al actualizar ingrediente');
  return response.json();
};

export const deleteIngrediente = async (id: number): Promise<void> => {
  const response = await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
  if (!response.ok) throw new Error('Error al eliminar ingrediente');
};