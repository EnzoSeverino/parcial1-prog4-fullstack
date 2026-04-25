// src/components/ProductoModal.tsx
import { useState, useEffect } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createProducto, updateProducto } from '../api/productosApi';
import type { Producto, ProductoCreate } from '../types';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  productoEditando: Producto | null;
}

export default function ProductoModal({ isOpen, onClose, productoEditando }: Props) {
  const queryClient = useQueryClient();

  const [nombre, setNombre] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [precioBase, setPrecioBase] = useState<number | ''>('');
  const [stock, setStock] = useState<number | ''>('');

  useEffect(() => {
    if (productoEditando) {
      setNombre(productoEditando.nombre);
      setDescripcion(productoEditando.descripcion || '');
      setPrecioBase(productoEditando.precio_base);
      setStock(productoEditando.stock_cantidad);
    } else {
      setNombre('');
      setDescripcion('');
      setPrecioBase('');
      setStock('');
    }
  }, [productoEditando, isOpen]);

  const createMutation = useMutation({
    mutationFn: createProducto,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['productos'] });
      onClose();
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: number; data: ProductoCreate }) => updateProducto(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['productos'] });
      onClose();
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const data: ProductoCreate = { 
      nombre, 
      descripcion, 
      precio_base: Number(precioBase), 
      stock_cantidad: Number(stock), 
      disponible: true 
    };

    if (productoEditando) {
      updateMutation.mutate({ id: productoEditando.id, data });
    } else {
      createMutation.mutate(data);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl shadow-lg w-full max-w-md p-6">
        <h2 className="text-xl font-bold text-gray-800 mb-4">
          {productoEditando ? 'Editar Producto' : 'Nuevo Producto'}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Fila 1: Nombre */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Nombre</label>
            <input type="text" required value={nombre} onChange={(e) => setNombre(e.target.value)} className="w-full border border-gray-300 rounded-lg px-3 py-2" />
          </div>

          {/* Fila 2: Descripción */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Descripción</label>
            <textarea
              value={descripcion}
              onChange={(e) => setDescripcion(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2"
              placeholder="Descripción del producto..."
              rows={2}
            />
          </div>

          {/* Fila 3: Precio y Stock */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Precio ($)</label>
              <input type="number" step="0.01" required value={precioBase} onChange={(e) => setPrecioBase(Number(e.target.value))} className="w-full border border-gray-300 rounded-lg px-3 py-2" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Stock</label>
              <input type="number" required value={stock} onChange={(e) => setStock(Number(e.target.value))} className="w-full border border-gray-300 rounded-lg px-3 py-2" />
            </div>
          </div>

          {/* Botones */}
          <div className="flex justify-end gap-3 mt-6">
            <button type="button" onClick={onClose} className="px-4 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg">Cancelar</button>
            <button type="submit" disabled={createMutation.isPending || updateMutation.isPending} className="px-4 py-2 text-white bg-blue-600 hover:bg-blue-700 rounded-lg disabled:opacity-50">
              Guardar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}