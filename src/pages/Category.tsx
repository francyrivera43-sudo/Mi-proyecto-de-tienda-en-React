import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { customProducts } from '../mockdata/products';
import type { Product } from '../store/cartStore';
import ProductItem from '../components/molecules/ProductItem';

export default function Category() {
  const { categoryName } = useParams();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      const filtered = customProducts.filter(
        (p) => p.category.toLowerCase() === categoryName?.toLowerCase()
      );
      setProducts(filtered as unknown as Product[]);
      setLoading(false);
    }, 400);
  }, [categoryName]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-violet-600"></div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <header className="mb-8">
        <h2 className="text-3xl font-extrabold text-gray-900 capitalize">
          {categoryName?.replace('%20', ' ')}
        </h2>
        <p className="text-gray-500 mt-2">Viendo productos en la categoría {categoryName}.</p>
      </header>
      
      {products.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {products.map(product => (
            <ProductItem 
              key={product.id} 
              product={product} 
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-20 bg-white rounded-xl border border-dashed border-gray-300">
          <p className="text-xl text-gray-500">No hay productos disponibles en esta categoría.</p>
        </div>
      )}
    </div>
  );
}
