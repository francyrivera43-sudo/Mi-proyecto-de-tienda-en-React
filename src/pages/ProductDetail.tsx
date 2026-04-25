import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { customProducts } from '../mockdata/products';
import { useCartStore, type Product } from '../store/cartStore';
import Button from '../components/atoms/Button';
import Rating from '../components/atoms/Rating';

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const { addToCart, items } = useCartStore();

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      const found = customProducts.find((p) => p.id === Number(id));
      setProduct((found as unknown as Product) || null);
      setLoading(false);
    }, 400);
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <h2 className="text-2xl font-bold text-gray-900">Producto no encontrado</h2>
        <Button onClick={() => navigate('/')} className="mt-4">Volver al catálogo</Button>
      </div>
    );
  }

  const isInCart = items.some(item => item.id === product.id);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-12">
      <button 
        onClick={() => navigate(-1)}
        className="mb-6 sm:mb-8 flex items-center text-sm font-medium text-gray-500 hover:text-gray-700 transition-colors"
      >
        ← Volver
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-y-10 lg:gap-x-12 lg:items-start">
        {/* Imagen */}
        <div className="aspect-square bg-white rounded-3xl p-6 sm:p-12 border border-gray-100 shadow-sm flex justify-center items-center overflow-hidden">
          <img 
            src={product.image} 
            alt={product.title} 
            className="max-h-full w-full object-contain hover:scale-105 transition-transform duration-500"
          />
        </div>

        {/* Info */}
        <div className="flex flex-col">
          <div className="flex justify-between items-center mb-4">
            <span className="inline-flex items-center px-3 py-1 rounded-full text-[10px] font-bold bg-violet-50 text-violet-700 uppercase tracking-widest border border-violet-100">
              {product.category}
            </span>
            <Rating rate={4.5} />
          </div>
          
          <h1 className="text-2xl sm:text-4xl font-black tracking-tight text-gray-900 leading-tight">
            {product.title}
          </h1>

          <div className="mt-4 flex items-baseline space-x-2">
            <span className="text-3xl font-black text-violet-600">${product.price.toFixed(2)}</span>
            <span className="text-sm text-gray-400 line-through">${(product.price * 1.2).toFixed(2)}</span>
          </div>

          <div className="mt-8 border-t border-gray-100 pt-8">
            <h3 className="text-sm font-bold text-gray-900 uppercase tracking-widest">Descripción</h3>
            <p className="mt-4 text-gray-600 leading-relaxed text-sm sm:text-base">
              {product.description}
            </p>
          </div>

          <div className="mt-10 flex flex-col sm:flex-row gap-4">
            <Button 
              size="lg" 
              className="flex-1 py-4 text-lg font-bold shadow-lg shadow-blue-500/20"
              onClick={() => addToCart(product)}
            >
              {isInCart ? 'Añadir otra unidad' : 'Añadir al carrito'}
            </Button>
            <button className="hidden sm:flex p-4 rounded-2xl border border-gray-200 hover:bg-gray-50 transition-colors items-center justify-center">
              ❤️
            </button>
          </div>

          <div className="mt-8 pt-8 border-t border-gray-200">
            <ul className="space-y-4 text-sm text-gray-500">
              <li className="flex items-center">
                ✅ Envío gratis a todo el país
              </li>
              <li className="flex items-center">
                🔄 Devolución gratuita por 30 días
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
