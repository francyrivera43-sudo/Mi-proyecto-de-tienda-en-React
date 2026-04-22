import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useCartStore } from '../store/cartStore';
import { useProductStore } from '../store/productStore';
import type { Product } from '../store/cartStore';
import ProductItem from '../components/molecules/ProductItem';
import { customProducts } from '../mockdata/products';

export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const searchTerm = useProductStore(state => state.searchTerm);
  
  // Paginación
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 8;

  useEffect(() => {
    axios.get('https://fakestoreapi.com/products')
      .then(response => {
        // Combinar productos de la API con los exclusivos
        setProducts([...customProducts, ...response.data]);
        setLoading(false);
      })
      .catch(error => {
        console.error("Error cargando productos:", error);
        setProducts(customProducts); // Cargar al menos los exclusivos si falla la API
        setLoading(false);
      });
  }, []);

  // 🔍 filtro de búsqueda global
  const filteredProducts = products.filter((product) =>
    product.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Lógica de paginación
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  const paginate = (pageNumber: number) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-16">

      <header className="mb-10 sm:mb-16 text-center">
        <h2 className="text-3xl sm:text-5xl font-black text-gray-900 mb-4 tracking-tighter uppercase">
          DOJO <span className="text-violet-600">SELECTION</span>
        </h2>
        <p className="text-gray-500 max-w-2xl mx-auto text-sm sm:text-base px-4">
          Equipamiento de combate profesional y estilo urbano para los guerreros modernos.
        </p>
      </header>

      {currentProducts.length > 0 ? (
        <>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-8">
            {currentProducts.map(product => (
              <ProductItem 
                key={product.id} 
                product={product} 
              />
            ))}
          </div>

          {/* Paginación Responsive */}
          {totalPages > 1 && (
            <div className="flex flex-wrap justify-center items-center mt-16 gap-2">
              <button
                onClick={() => paginate(currentPage - 1)}
                disabled={currentPage === 1}
                className="px-3 py-2 sm:px-4 sm:py-2 text-sm font-bold border-2 border-gray-100 rounded-xl disabled:opacity-30 hover:bg-white hover:border-blue-500 hover:text-blue-600 transition-all"
              >
                ←
              </button>
              <div className="flex gap-1">
                {[...Array(totalPages)].map((_, i) => (
                  <button
                    key={i}
                    onClick={() => paginate(i + 1)}
                    className={`w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center rounded-xl text-sm font-black transition-all ${
                      currentPage === i + 1 
                      ? 'bg-violet-600 text-white shadow-lg shadow-violet-600/30' 
                      : 'bg-white border-2 border-gray-100 text-gray-400 hover:border-violet-200'
                    }`}
                  >
                    {i + 1}
                  </button>
                ))}
              </div>
              <button
                onClick={() => paginate(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="px-3 py-2 sm:px-4 sm:py-2 text-sm font-bold border-2 border-gray-100 rounded-xl disabled:opacity-30 hover:bg-white hover:border-blue-500 hover:text-blue-600 transition-all"
              >
                →
              </button>
            </div>
          )}
        </>
      ) : (
        <div className="text-center py-20">
          <p className="text-xl text-gray-500">No se encontraron productos que coincidan con "{searchTerm}".</p>
        </div>
      )}
    </div>
  );
}