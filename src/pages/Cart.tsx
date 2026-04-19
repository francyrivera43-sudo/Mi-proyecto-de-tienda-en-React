import React from 'react';
import { useCartStore } from '../store/cartStore';

export default function Cart() {
  const { items, removeFromCart, updateQuantity, clearCart, getTotalPrice } = useCartStore();

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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {items.map((item) => (
            <div key={item.id} className="flex flex-col border rounded-lg p-4 gap-4 hover:shadow-md transition-shadow">
              <div className="flex items-center space-x-4">
                <img src={item.image} alt={item.title} className="w-20 h-20 object-contain bg-white rounded" />
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-gray-800 line-clamp-2">{item.title}</h3>
                  <div className="flex items-center mt-3 space-x-3">
                    <span className="text-sm text-gray-500 font-medium">Cantidad:</span>
                    <div className="flex items-center bg-gray-100 rounded-lg shadow-sm border border-gray-200">
                      <button 
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="px-3 py-1 text-gray-600 hover:bg-gray-200 hover:text-black rounded-l-lg font-bold transition-colors"
                      >
                        -
                      </button>
                      <span className="px-3 font-semibold w-8 text-center">{item.quantity}</span>
                      <button 
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="px-3 py-1 text-gray-600 hover:bg-gray-200 hover:text-black rounded-r-lg font-bold transition-colors"
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-100">
                <span className="text-xl font-black text-gray-900">${(item.price * item.quantity).toFixed(2)}</span>
                <button 
                  onClick={() => removeFromCart(item.id)}
                  className="text-red-500 hover:text-white p-2 rounded-lg hover:bg-red-500 transition-colors font-bold text-sm"
                >
                  Eliminar
                </button>
              </div>
            </div>
          ))}
        </div>

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
