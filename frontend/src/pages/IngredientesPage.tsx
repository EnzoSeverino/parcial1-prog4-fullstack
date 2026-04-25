import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getIngredientes, deleteIngrediente } from '../api/ingredientesApi';
import IngredienteList from '../components/IngredienteList';
import IngredienteModal from '../components/IngredienteModal';
import type { Ingrediente } from '../types';

export default function IngredientesPage() {
  const queryClient = useQueryClient();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [ingredienteEditando, setIngredienteEditando] = useState<Ingrediente | null>(null);

  const { data: ingredientes, isLoading } = useQuery({ queryKey: ['ingredientes'], queryFn: getIngredientes });

  const deleteMutation = useMutation({
    mutationFn: deleteIngrediente,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['ingredientes'] }),
  });

  if (isLoading) return <p>Cargando...</p>;

  return (
    <div className="p-6">
      <div className="flex justify-between mb-6">
        <h1 className="text-2xl font-bold">Ingredientes</h1>
        <button onClick={() => { setIngredienteEditando(null); setIsModalOpen(true); }} className="bg-blue-600 text-white px-4 py-2 rounded">+ Añadir</button>
      </div>
      <IngredienteList ingredientes={ingredientes || []} onEdit={(i) => { setIngredienteEditando(i); setIsModalOpen(true); }} onDelete={(id) => deleteMutation.mutate(id)} />
      <IngredienteModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} ingredienteEditando={ingredienteEditando} />
    </div>
  );
}