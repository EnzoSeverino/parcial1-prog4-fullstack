import type { Ingrediente } from '../types';

interface Props {
  ingredientes: Ingrediente[];
  onEdit: (ingrediente: Ingrediente) => void;
  onDelete: (id: number) => void;
}

export default function IngredienteList({ ingredientes, onEdit, onDelete }: Props) {
  if (ingredientes.length === 0) return <p className="text-gray-500 text-center py-4">No hay ingredientes.</p>;

  return (
    <div className="overflow-x-auto bg-white rounded-lg shadow-sm border border-gray-200">
      <table className="min-w-full text-left border-collapse">
        <thead className="bg-gray-100 text-gray-600 uppercase text-xs font-semibold">
          <tr>
            <th className="py-3 px-4 border-b">Nombre</th>
            <th className="py-3 px-4 border-b">Alérgeno</th>
            <th className="py-3 px-4 border-b text-center">Acciones</th>
          </tr>
        </thead>
        <tbody className="text-sm">
          {ingredientes.map((ing) => (
            <tr key={ing.id} className="border-b hover:bg-gray-50 transition">
              <td className="py-3 px-4 font-medium text-gray-900">{ing.nombre}</td>
              <td className="py-3 px-4">
                {ing.es_alergeno ? 
                  <span className="text-red-600 font-bold">SÍ</span> : 
                  <span className="text-green-600">No</span>
                }
              </td>
              <td className="py-3 px-4 text-center space-x-3">
                <button onClick={() => onEdit(ing)} className="text-blue-600 hover:text-blue-800">Editar</button>
                <button onClick={() => onDelete(ing.id)} className="text-red-600 hover:text-red-800">Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}