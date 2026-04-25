import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useCartStore } from '../store/cartStore';
import { useAuthStore } from '../store/authStore';
import { customProducts } from '../mockdata/products';
import ProductItem from '../components/molecules/ProductItem';

interface Product {
  id: number;
  title: string;
  price: number;
  image: string;
}

export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 8;

  const addToCart = useCartStore((state) => state.addToCart);
  const user = useAuthStore((state) => state.user);
  const searchTerm = useProductStore((state) => state.searchTerm);

  useEffect(() => {
    // Usar datos locales en lugar de API
    setLoading(true);
    setTimeout(() => {
      setProducts(customProducts as unknown as Product[]);
      setLoading(false);
    }, 400);
  }, []);

  // 1. Filtrar por término de búsqueda
  const filteredProducts = products.filter((product) =>
    product.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // 2. Paginación
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);

  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  // Reset page when searching
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm]);

  return (
    <div className="p-4">

      {/* HEADER */}
      <header className="mb-10 sm:mb-16 text-center mt-6">

        {user && (
          <p className="text-sm text-gray-500 mb-2">
            Hola <span className="font-bold text-violet-600">{user.name}</span> 👋
          </p>
        )}

        <h2 className="text-3xl sm:text-5xl font-black text-gray-900 mb-4 tracking-tighter uppercase">
          DOJO <span className="text-violet-600">SELECTION</span>
        </h2>

        <p className="text-gray-500 max-w-2xl mx-auto text-sm sm:text-base px-4">
          Equipamiento de combate profesional y estilo urbano para los guerreros modernos.
        </p>
      </header>

      {/* LOADING */}
      {loading && <p className="text-center font-semibold text-gray-500">Cargando productos...</p>}

      {/* NO HAY RESULTADOS */}
      {!loading && filteredProducts.length === 0 && (
        <p className="text-center text-gray-500 mt-10">
          No se encontraron productos para "{searchTerm}"
        </p>
      )}

      {/* PRODUCTOS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
        {!loading &&
          currentProducts.map((product) => (
            <ProductItem
              key={product.id}
              product={product}
              onAddToCart={() => addToCart(product)}
            />
          ))}
      </div>

      {/* CONTROLES DE PAGINACIÓN */}
      {!loading && totalPages > 1 && (
        <div className="flex justify-center items-center mt-12 space-x-4">
          <button
            onClick={handlePrevPage}
            disabled={currentPage === 1}
            className={`px-4 py-2 rounded-lg font-bold ${
              currentPage === 1
                ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                : 'bg-violet-600 text-white hover:bg-violet-700'
            }`}
          >
            Anterior
          </button>
          
          <span className="text-gray-700 font-semibold">
            Página {currentPage} de {totalPages}
          </span>
          
          <button
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
            className={`px-4 py-2 rounded-lg font-bold ${
              currentPage === totalPages
                ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                : 'bg-violet-600 text-white hover:bg-violet-700'
            }`}
          >
            Siguiente
          </button>
        </div>
      )}
    </div>
  );
}