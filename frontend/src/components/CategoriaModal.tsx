// src/components/CategoriaModal.tsx

import { useState, useEffect } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createCategoria, updateCategoria } from '../api/categoriasApi';
import type { Categoria, CategoriaCreate } from '../types';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  categoriaEditando: Categoria | null;
}

export default function CategoriaModal({ isOpen, onClose, categoriaEditando }: Props) {
  const queryClient = useQueryClient();

  // Rúbrica: Estado local para el formulario
  const [nombre, setNombre] = useState('');
  const [descripcion, setDescripcion] = useState('');

  // Si estamos editando, llenamos los campos al abrir el modal
  useEffect(() => {
    if (categoriaEditando) {
      setNombre(categoriaEditando.nombre);
      setDescripcion(categoriaEditando.descripcion || '');
    } else {
      setNombre('');
      setDescripcion('');
    }
  }, [categoriaEditando, isOpen]);

  // Mutación para Crear
  const createMutation = useMutation({
    mutationFn: createCategoria,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['categorias'] }); // Sincronización
      onClose();
    },
  });

  // Mutación para Editar
  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: number; data: CategoriaCreate }) => updateCategoria(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['categorias'] }); // Sincronización
      onClose();
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const data: CategoriaCreate = { nombre, descripcion, es_principal: false };

    if (categoriaEditando) {
      updateMutation.mutate({ id: categoriaEditando.id, data });
    } else {
      createMutation.mutate(data);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl shadow-lg w-full max-w-md p-6">
        <h2 className="text-xl font-bold text-gray-800 mb-4">
          {categoriaEditando ? 'Editar Categoría' : 'Nueva Categoría'}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Nombre</label>
            <input
              type="text"
              required
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Ej: Pizzas"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Descripción</label>
            <textarea
              value={descripcion}
              onChange={(e) => setDescripcion(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Masa madre, al horno de barro..."
              rows={3}
            />
          </div>

          <div className="flex justify-end gap-3 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={createMutation.isPending || updateMutation.isPending}
              className="px-4 py-2 text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition disabled:opacity-50"
            >
              {createMutation.isPending || updateMutation.isPending ? 'Guardando...' : 'Guardar'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}