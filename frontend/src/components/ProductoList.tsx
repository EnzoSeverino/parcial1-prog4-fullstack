import type { Producto } from '../types';

interface Props {
  productos: Producto[];
  onEdit: (producto: Producto) => void;
  onDelete: (id: number) => void;
}

export default function ProductoList({ productos, onEdit, onDelete }: Props) {
  if (productos.length === 0) {
    return <p className="text-gray-500 text-center py-4">No hay productos registrados.</p>;
  }

  return (
    <div className="overflow-x-auto bg-white rounded-lg shadow-sm border border-gray-200">
      <table className="min-w-full text-left border-collapse">
        <thead className="bg-gray-100 text-gray-600 uppercase text-xs font-semibold">
          <tr>
            <th className="py-3 px-4 border-b">ID</th>
            <th className="py-3 px-4 border-b">Nombre</th>
            <th className="py-3 px-4 border-b">Precio</th>
            <th className="py-3 px-4 border-b">Stock</th>
            <th className="py-3 px-4 border-b text-center">Acciones</th>
          </tr>
        </thead>
        <tbody className="text-sm">
          {productos.map((prod) => (
            <tr key={prod.id} className="border-b hover:bg-gray-50 transition">
              <td className="py-3 px-4 text-gray-700">{prod.id}</td>
              <td className="py-3 px-4 font-medium text-gray-900">{prod.nombre}</td>
              <td className="py-3 px-4 text-green-600 font-semibold">${prod.precio_base}</td>
              <td className="py-3 px-4 text-gray-700">{prod.stock_cantidad}</td>
              <td className="py-3 px-4 text-center space-x-3">
                <button onClick={() => onEdit(prod)} className="text-blue-600 hover:text-blue-800 font-medium">
                  Editar
                </button>
                <button onClick={() => onDelete(prod.id)} className="text-red-600 hover:text-red-800 font-medium">
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