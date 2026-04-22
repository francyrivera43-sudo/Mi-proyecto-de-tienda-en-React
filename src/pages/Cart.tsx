import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useCartStore } from '../store/cartStore';
import Button from '../components/atoms/Button';

export default function Cart() {
  const { items, removeFromCart, updateQuantity, getTotalItems, getTotalPrice } = useCartStore();
  const navigate = useNavigate();

  const totalItems = getTotalItems();
  const subtotal = getTotalPrice();
  const tax = subtotal * 0.19;
  const total = subtotal + tax;

  if (items.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center">
        <div className="text-6xl mb-4">🛒</div>
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Tu carrito está vacío</h2>
        <p className="text-gray-600 mb-8">¡Añade algunos productos para empezar!</p>
        <Button onClick={() => navigate('/')}>Explorar productos</Button>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 min-h-screen">
      <h2 className="text-3xl font-extrabold text-gray-900 mb-10">Tu Carrito ({totalItems})</h2>
      
      <div className="lg:grid lg:grid-cols-12 lg:gap-x-12 lg:items-start">
        {/* Lista de productos */}
        <div className="lg:col-span-7">
          <div className="space-y-6">
            {items.map((item) => (
              <div key={item.id} className="flex py-6 border-b border-gray-100 last:border-0 group">
                <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200 bg-white p-2">
                  <img src={item.image} alt={item.title} className="h-full w-full object-contain" />
                </div>

                <div className="ml-4 flex flex-1 flex-col">
                  <div>
                    <div className="flex justify-between text-base font-medium text-gray-900">
                      <h3 className="line-clamp-1">{item.title}</h3>
                      <p className="ml-4 font-bold">${(item.price * item.quantity).toFixed(2)}</p>
                    </div>
                    <p className="mt-1 text-sm text-gray-500">{item.category}</p>
                  </div>
                  
                  <div className="flex flex-1 items-end justify-between text-sm">
                    <div className="flex items-center border border-gray-200 rounded-lg overflow-hidden">
                      <button 
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="px-3 py-1 hover:bg-gray-100 text-gray-600 font-bold"
                      >
                        -
                      </button>
                      <span className="px-3 py-1 font-semibold text-gray-900 border-x border-gray-200 min-w-[40px] text-center">
                        {item.quantity}
                      </span>
                      <button 
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="px-3 py-1 hover:bg-gray-100 text-gray-600 font-bold"
                      >
                        +
                      </button>
                    </div>

                    <button 
                      type="button" 
                      onClick={() => removeFromCart(item.id)}
                      className="font-medium text-red-600 hover:text-red-500 transition-colors"
                    >
                      Eliminar
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Resumen */}
        <div className="mt-16 lg:mt-0 lg:col-span-5">
          <div className="bg-white border border-gray-100 rounded-2xl shadow-sm p-8">
            <h3 className="text-lg font-bold text-gray-900 mb-6">Resumen de la orden</h3>
            
            <div className="space-y-4 border-b border-gray-100 pb-6">
              <div className="flex justify-between text-sm text-gray-600">
                <span>Subtotal</span>
                <span className="font-medium text-gray-900">${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm text-gray-600">
                <span>Envío estimado</span>
                <span className="text-green-600 font-medium font-bold uppercase text-[10px]">Gratis</span>
              </div>
              <div className="flex justify-between text-sm text-gray-600">
                <span>Impuestos (19%)</span>
                <span className="font-medium text-gray-900">${tax.toFixed(2)}</span>
              </div>
            </div>
            
            <div className="flex justify-between items-center py-6">
              <span className="text-xl font-extrabold text-gray-900">Total</span>
              <span className="text-xl font-extrabold text-gray-900">${total.toFixed(2)}</span>
            </div>

            <Button 
              className="w-full py-4 text-lg mb-4" 
              onClick={() => navigate('/checkout')}
            >
              Finalizar Compra
            </Button>
            
            <button 
              onClick={() => navigate('/')}
              className="w-full text-center text-sm font-medium text-gray-500 hover:text-gray-700 transition-colors"
            >
              Continuar comprando
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
