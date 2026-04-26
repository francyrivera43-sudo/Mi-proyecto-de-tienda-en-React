import React from 'react';
import { Link } from 'react-router-dom';
import { useCartStore } from '../../store/cartStore';
import type { Product } from '../../store/cartStore';
import Button from '../atoms/Button';
import Rating from '../atoms/Rating';

interface ProductItemProps {
  product: Product;
}

export default function ProductItem({ product }: ProductItemProps) {
  const { items, addToCart, removeFromCart, updateQuantity } = useCartStore();
  
  // Buscar si este producto ya está en el carrito
  const cartItem = items.find(item => item.id === product.id);
  const quantity = cartItem ? cartItem.quantity : 0;

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-all duration-200 flex flex-col">
      <Link to={`/product/${product.id}`} className="h-40 bg-white p-4 flex justify-center items-center relative group overflow-hidden">
        <img 
          src={product.image} 
          alt={product.title} 
          className="max-h-full object-contain group-hover:scale-110 transition-transform duration-500 ease-in-out"
        />
      </Link>
      <div className="p-3 flex flex-col flex-grow bg-gray-50 border-t border-gray-100">
        <Link to={`/product/${product.id}`} className="hover:text-violet-600 transition-colors">
          <h3 className="text-xs font-semibold text-gray-800 line-clamp-2 h-8 mb-1" title={product.title}>
            {product.title}
          </h3>
        </Link>
        
        <Rating rate={4.5} />

        <div className="mt-auto flex items-center justify-between pt-2">
          <span className="text-sm font-black text-gray-900">
            ${(product.price).toLocaleString("es-CO", { minimumFractionDigits: 0 })}
          </span>
          
          {quantity > 0 ? (
            <div className="flex items-center bg-white rounded border border-gray-300 shadow-sm">
              <button 
                onClick={() => quantity === 1 ? removeFromCart(product.id) : updateQuantity(product.id, quantity - 1)}
                className="px-2 py-1 text-gray-600 hover:bg-gray-100 font-bold text-xs"
              >
                -
              </button>
              <span className="px-2 text-xs font-bold w-6 text-center">{quantity}</span>
              <button 
                onClick={() => updateQuantity(product.id, quantity + 1)}
                className="px-2 py-1 text-gray-600 hover:bg-gray-100 font-bold text-xs"
              >
                +
              </button>
            </div>
          ) : (
            <Button size="sm" onClick={() => addToCart(product)}>
              + Add
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
