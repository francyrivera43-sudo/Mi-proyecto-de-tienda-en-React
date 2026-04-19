import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useCartStore, Product } from '../store/cartStore';

export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const addToCart = useCartStore(state => state.addToCart);

  useEffect(() => {
    // Pedir los productos a FakeStore API
    axios.get('https://fakestoreapi.com/products')
      .then(response => {
        setProducts(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error("Error cargando productos:", error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <h2 className="text-3xl font-extrabold text-gray-900 mb-8 text-center">Nuestro Catálogo</h2>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {products.map(product => (
          <div key={product.id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300 flex flex-col">
            <div className="h-48 bg-white p-4 flex justify-center items-center">
              <img 
                src={product.image} 
                alt={product.title} 
                className="max-h-full object-contain"
              />
            </div>
            <div className="p-5 flex flex-col flex-grow">
              <span className="text-xs font-semibold text-blue-500 uppercase tracking-wider mb-2">
                {product.category}
              </span>
              <h3 className="text-lg font-bold text-gray-800 line-clamp-2 mb-2">
                {product.title}
              </h3>
              <div className="mt-auto flex items-center justify-between pt-4">
                <span className="text-xl font-black text-gray-900">
                  ${product.price.toFixed(2)}
                </span>
                <button 
                  onClick={() => addToCart(product)}
                  className="bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-full transition-colors"
                >
                  ➕🛒
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
