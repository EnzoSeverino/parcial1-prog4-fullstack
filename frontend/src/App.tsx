import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Navbar from './components/Navbar';
import CategoriasPage from './pages/CategoriasPage';
import ProductsPage from './pages/ProductsPage';
import IngredientesPage from './pages/IngredientesPage';

// Inicializamos el cliente de TanStack Query
const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <div className="min-h-screen bg-gray-50">
          <Navbar />
          
          <main className="container mx-auto p-4">
            <Routes>
              <Route path="/" element={<Navigate to="/categorias" replace />} />
              <Route path="/categorias" element={<CategoriasPage />} />
              <Route path="/productos" element={<ProductsPage />} />
              <Route path="/ingredientes" element={<IngredientesPage />} />
            </Routes>
          </main>
        </div>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;