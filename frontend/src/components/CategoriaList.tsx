// src/components/CategoriaList.tsx
import type { Categoria } from '../types';

// Rúbrica: Props debidamente tipadas con interfaces
interface Props {
  categorias: Categoria[];
  onEdit: (categoria: Categoria) => void;
  onDelete: (id: number) => void;
}

export default function CategoriaList({ categorias, onEdit, onDelete }: Props) {
  if (categorias.length === 0) {
    return <p className="text-gray-500 text-center py-4">No hay categorías registradas.</p>;
  }

  return (
    <div className="overflow-x-auto bg-white rounded-lg shadow-sm border border-gray-200">
      <table className="min-w-full text-left border-collapse">
        <thead className="bg-gray-100 text-gray-600 uppercase text-xs font-semibold">
          <tr>
            <th className="py-3 px-4 border-b">Número</th>
            <th className="py-3 px-4 border-b">Nombre</th>
            <th className="py-3 px-4 border-b">Descripción</th>
            <th className="py-3 px-4 border-b text-center">Acciones</th>
          </tr>
        </thead>
        <tbody className="text-sm">
          {categorias.map((cat) => (
            <tr key={cat.id} className="border-b hover:bg-gray-50 transition">
              <td className="py-3 px-4 text-gray-700">{cat.id}</td>
              <td className="py-3 px-4 font-medium text-gray-900">{cat.nombre}</td>
              <td className="py-3 px-4 text-gray-500">{cat.descripcion || '-'}</td>
              <td className="py-3 px-4 text-center space-x-3">
                <button 
                  onClick={() => onEdit(cat)} 
                  className="text-blue-600 hover:text-blue-800 font-medium"
                >
                  Editar
                </button>
                <button 
                  onClick={() => onDelete(cat.id)} 
                  className="text-red-600 hover:text-red-800 font-medium"
                >
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}