import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getProductos, deleteProducto } from '../api/productosApi';
import ProductoList from '../components/ProductoList';
import ProductoModal from '../components/ProductoModal';
import type { Producto } from '../types';

export default function ProductsPage() {
  const queryClient = useQueryClient();
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [productoEditando, setProductoEditando] = useState<Producto | null>(null);

  const { data: productos, isLoading, isError } = useQuery({
    queryKey: ['productos'],
    queryFn: getProductos,
  });

  const deleteMutation = useMutation({
    mutationFn: deleteProducto,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['productos'] });
    },
  });

  const handleAdd = () => {
    setProductoEditando(null);
    setIsModalOpen(true);
  };

  const handleEdit = (producto: Producto) => {
    setProductoEditando(producto);
    setIsModalOpen(true);
  };

  if (isLoading) return <div className="text-center p-10 text-gray-500">Cargando productos...</div>;
  if (isError) return <div className="text-center text-red-500 p-10">Error al cargar los datos.</div>;

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Productos</h1>
        <button onClick={handleAdd} className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition">
          + Añadir Producto
        </button>
      </div>

      <ProductoList
        productos={productos || []}
        onEdit={handleEdit}
        onDelete={(id) => deleteMutation.mutate(id)}
      />

      <ProductoModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        productoEditando={productoEditando}
      />
    </div>
  );
}