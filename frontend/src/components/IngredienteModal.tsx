import { useState, useEffect } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createIngrediente, updateIngrediente } from '../api/ingredientesApi';
import type { Ingrediente, IngredienteCreate } from '../types';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  ingredienteEditando: Ingrediente | null;
}

export default function IngredienteModal({ isOpen, onClose, ingredienteEditando }: Props) {
  const queryClient = useQueryClient();
  const [nombre, setNombre] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [esAlergeno, setEsAlergeno] = useState(false);

  useEffect(() => {
    if (ingredienteEditando) {
      setNombre(ingredienteEditando.nombre);
      setDescripcion(ingredienteEditando.descripcion || '');
      setEsAlergeno(ingredienteEditando.es_alergeno);
    } else {
      setNombre(''); setDescripcion(''); setEsAlergeno(false);
    }
  }, [ingredienteEditando, isOpen]);

  const mutation = useMutation({
    mutationFn: (data: IngredienteCreate) => 
      ingredienteEditando ? updateIngrediente(ingredienteEditando.id, data) : createIngrediente(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['ingredientes'] });
      onClose();
    },
  });

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl p-6 w-full max-w-md">
        <h2 className="text-xl font-bold mb-4">{ingredienteEditando ? 'Editar' : 'Nuevo'} Ingrediente</h2>
        <form onSubmit={(e) => {
          e.preventDefault();
          mutation.mutate({ nombre, descripcion, es_alergeno: esAlergeno });
        }} className="space-y-4">
          <input type="text" required placeholder="Nombre" value={nombre} onChange={(e) => setNombre(e.target.value)} className="w-full border p-2 rounded" />
          <textarea placeholder="Descripción" value={descripcion} onChange={(e) => setDescripcion(e.target.value)} className="w-full border p-2 rounded" />
          <label className="flex items-center gap-2">
            <input type="checkbox" checked={esAlergeno} onChange={(e) => setEsAlergeno(e.target.checked)} />
            ¿Es alérgeno?
          </label>
          <div className="flex justify-end gap-2">
            <button type="button" onClick={onClose} className="bg-gray-200 px-4 py-2 rounded">Cancelar</button>
            <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">Guardar</button>
          </div>
        </form>
      </div>
    </div>
  );
}