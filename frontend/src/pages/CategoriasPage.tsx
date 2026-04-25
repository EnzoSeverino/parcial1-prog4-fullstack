import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getCategorias, deleteCategoria } from '../api/categoriasApi';
import CategoriaList from '../components/CategoriaList';
import CategoriaModal from '../components/CategoriaModal'; 
import type { Categoria } from '../types';

export default function CategoriasPage() {
  const queryClient = useQueryClient();
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [categoriaEditando, setCategoriaEditando] = useState<Categoria | null>(null);

  const { data: categorias, isLoading, isError } = useQuery({
    queryKey: ['categorias'],
    queryFn: getCategorias,
  });

  const deleteMutation = useMutation({
    mutationFn: deleteCategoria,
    onSuccess: () => {

      queryClient.invalidateQueries({ queryKey: ['categorias'] });
    },
  });

  const handleAdd = () => {
    setCategoriaEditando(null); 
    setIsModalOpen(true);
  };

  const handleEdit = (categoria: Categoria) => {
    setCategoriaEditando(categoria); 
    setIsModalOpen(true);
  };

  
  if (isLoading) return <div className="text-center p-10 text-gray-500">Cargando categorías...</div>;
  if (isError) return <div className="text-center text-red-500 p-10">Error al cargar los datos.</div>;

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Categorías</h1>
        <button 
          onClick={handleAdd} 
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
        >
          + Añadir Categoría
        </button>
      </div>

      <CategoriaList
        categorias={categorias || []}
        onEdit={handleEdit}
        onDelete={(id) => deleteMutation.mutate(id)}
      />

      <CategoriaModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        categoriaEditando={categoriaEditando}
      />
      
    </div>
  );
}