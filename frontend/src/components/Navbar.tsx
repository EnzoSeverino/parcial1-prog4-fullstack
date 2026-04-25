import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <nav className="bg-blue-800 p-4 text-white">
      <div className="container mx-auto flex gap-4">
        <Link to="/categorias" className="hover:underline">Categorías</Link>
        <Link to="/productos" className="hover:underline">Productos</Link>
        <Link to="/ingredientes" className="hover:underline">Ingredientes</Link>
      </div>
    </nav>
  );
}