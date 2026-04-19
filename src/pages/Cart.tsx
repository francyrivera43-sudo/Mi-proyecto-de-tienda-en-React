import React from 'react';
import { useCartStore } from '../store/cartStore';

export default function Cart() {
  const { items, removeFromCart, clearCart, getTotalPrice } = useCartStore();

  if (items.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 text-center">
        <h2 className="text-3xl font-bold text-gray-800 mb-4">Tu carrito está vacío 😢</h2>
        <p className="text-gray-600">¡Vuelve al catálogo para agregar algunos productos increíbles!</p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <h2 className="text-3xl font-extrabold text-gray-900 mb-8">Tu Carrito de Compras</h2>
      
      <div className="bg-white rounded-xl shadow-lg p-6">
        {items.map((item) => (
          <div key={item.id} className="flex items-center justify-between border-b py-4 last:border-b-0">
            <div className="flex items-center space-x-4">
              <img src={item.image} alt={item.title} className="w-16 h-16 object-contain" />
              <div>
                <h3 className="text-lg font-bold text-gray-800 line-clamp-1">{item.title}</h3>
                <p className="text-sm text-gray-500">Cantidad: {item.quantity}</p>
              </div>
            </div>
            <div className="flex items-center space-x-6">
              <span className="text-xl font-bold text-gray-900">${(item.price * item.quantity).toFixed(2)}</span>
              <button 
                onClick={() => removeFromCart(item.id)}
                className="text-red-500 hover:text-red-700 p-2 rounded-full hover:bg-red-50 transition-colors"
                title="Eliminar del carrito"
              >
                🗑️
              </button>
            </div>
          </div>
        ))}

        <div className="mt-8 pt-6 border-t border-gray-200 flex flex-col sm:flex-row justify-between items-center">
          <div className="text-2xl font-black text-gray-900 mb-4 sm:mb-0">
            Total: ${getTotalPrice().toFixed(2)}
          </div>
          <div className="flex space-x-4">
            <button 
              onClick={clearCart}
              className="px-6 py-3 border-2 border-red-500 text-red-500 hover:bg-red-50 font-bold rounded-lg transition-colors"
            >
              Vaciar Carrito
            </button>
            <button className="px-6 py-3 bg-green-600 hover:bg-green-700 text-white font-bold rounded-lg shadow-md hover:shadow-lg transition-all">
              Proceder al Pago
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
