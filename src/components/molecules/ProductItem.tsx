import React from 'react';
import { Product } from '../../store/cartStore';

interface ProductItemProps {
  product: Product;
  onAdd: (product: Product) => void;
}

export default function ProductItem({ product, onAdd }: ProductItemProps) {
  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 flex flex-col border border-gray-100">
      <div className="h-56 bg-white p-6 flex justify-center items-center relative group">
        <img 
          src={product.image} 
          alt={product.title} 
          className="max-h-full object-contain group-hover:scale-110 transition-transform duration-300"
        />
      </div>
      <div className="p-5 flex flex-col flex-grow bg-gray-50 border-t border-gray-100">
        <span className="text-[10px] font-bold text-blue-500 uppercase tracking-widest mb-2">
          {product.category}
        </span>
        <h3 className="text-sm font-semibold text-gray-800 line-clamp-2 mb-3 h-10">
          {product.title}
        </h3>
        <div className="mt-auto flex items-center justify-between pt-4">
          <span className="text-lg font-black text-gray-900">
            ${product.price.toFixed(2)}
          </span>
          <button 
            onClick={() => onAdd(product)}
            className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold py-2 px-4 rounded-full shadow-sm hover:shadow-md transition-all flex items-center gap-2"
          >
            <span>+ Add</span>
          </button>
        </div>
      </div>
    </div>
  );
}
