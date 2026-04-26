import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCartStore } from '../store/cartStore';
import Button from '../components/atoms/Button';

export default function Checkout() {
  const { items, getTotalPrice, clearCart } = useCartStore();
  const navigate = useNavigate();
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const subtotal = getTotalPrice();
  const tax = subtotal * 0.19;
  const total = subtotal + tax;

  const handlePayment = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    
    // Simular procesamiento
    setTimeout(() => {
      setIsProcessing(false);
      setIsSuccess(true);
      clearCart();
    }, 2000);
  };

  if (isSuccess) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <div className="mb-6 text-6xl">🎉</div>
        <h2 className="text-3xl font-extrabold text-gray-900">¡Compra completada!</h2>
        <p className="mt-4 text-lg text-gray-600">Tu pedido ha sido procesado con éxito. Pronto recibirás un correo de confirmación.</p>
        <Button onClick={() => navigate('/')} className="mt-8">Volver a la tienda</Button>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <h2 className="text-2xl font-bold text-gray-900">Tu carrito está vacío</h2>
        <Button onClick={() => navigate('/')} className="mt-4">Ir a comprar</Button>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h2 className="text-3xl font-extrabold text-gray-900 mb-10">Checkout</h2>

      <div className="lg:grid lg:grid-cols-12 lg:gap-x-12 lg:items-start">
        {/* Formulario */}
        <div className="lg:col-span-7">
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
            <h3 className="text-lg font-bold text-gray-900 mb-6">Detalles de Envío y Pago</h3>
            <form onSubmit={handlePayment} className="space-y-8">
              <div>
                <h3 className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-4">Información de Envío</h3>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div className="sm:col-span-2">
                    <label className="text-[10px] font-black text-gray-400 uppercase ml-1">Dirección</label>
                    <input type="text" required placeholder="Calle, Número, Depto" className="w-full mt-1 px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all text-sm" />
                  </div>
                  <div>
                    <label className="text-[10px] font-black text-gray-400 uppercase ml-1">Ciudad</label>
                    <input type="text" required placeholder="Ciudad" className="w-full mt-1 px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all text-sm" />
                  </div>
                  <div>
                    <label className="text-[10px] font-black text-gray-400 uppercase ml-1">Código Postal</label>
                    <input type="text" required placeholder="00000" className="w-full mt-1 px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all text-sm" />
                  </div>
                </div>
              </div>

              <div className="pt-6 border-t border-gray-50">
                <h3 className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-4">Método de Pago</h3>
                <div className="space-y-4">
                  <div>
                    <label className="text-[10px] font-black text-gray-400 uppercase ml-1">Número de Tarjeta</label>
                    <input type="text" required placeholder="0000 0000 0000 0000" className="w-full mt-1 px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-violet-500/20 focus:border-violet-500 outline-none transition-all text-sm font-mono" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-[10px] font-black text-gray-400 uppercase ml-1">Vencimiento</label>
                      <input type="text" required placeholder="MM/AA" className="w-full mt-1 px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-violet-500/20 focus:border-violet-500 outline-none transition-all text-sm" />
                    </div>
                    <div>
                      <label className="text-[10px] font-black text-gray-400 uppercase ml-1">CVC</label>
                      <input type="text" required placeholder="123" className="w-full mt-1 px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-violet-500/20 focus:border-violet-500 outline-none transition-all text-sm" />
                    </div>
                  </div>
                </div>
              </div>

              <Button 
                type="submit" 
                className="w-full py-5 text-lg font-bold shadow-xl shadow-violet-500/20 mt-4" 
                disabled={isProcessing}
              >
                {isProcessing ? '⚡ Procesando pago...' : `Confirmar y Pagar $${(total).toLocaleString("es-CO", { minimumFractionDigits: 0 })}`}
              </Button>
            </form>
          </div>
        </div>

        {/* Resumen */}
        <div className="mt-16 lg:mt-0 lg:col-span-5">
          <div className="bg-gray-50 p-8 rounded-2xl border border-gray-100">
            <h3 className="text-lg font-bold text-gray-900 mb-6">Resumen del Pedido</h3>
            <div className="flow-root">
              <ul className="-my-6 divide-y divide-gray-200">
                {items.map((item) => (
                  <li key={item.id} className="py-6 flex">
                    <div className="flex-shrink-0 w-16 h-16 border border-gray-200 rounded-md overflow-hidden bg-white">
                      <img src={item.image} alt={item.title} className="w-full h-full object-contain" />
                    </div>
                    <div className="ml-4 flex-1 flex flex-col">
                      <div className="flex justify-between text-sm font-medium text-gray-900">
                        <h4 className="line-clamp-1">{item.title}</h4>
                        <p className="ml-4">${((item.price * item.quantity)).toLocaleString("es-CO", { minimumFractionDigits: 0 })}</p>
                      </div>
                      <p className="mt-1 text-sm text-gray-500">Cant: {item.quantity}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-10 space-y-4 text-sm text-gray-600 border-t border-gray-200 pt-6">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="font-medium text-gray-900">${(subtotal).toLocaleString("es-CO", { minimumFractionDigits: 0 })}</span>
              </div>
              <div className="flex justify-between">
                <span>Envío</span>
                <span className="text-green-600 font-medium">Gratis</span>
              </div>
              <div className="flex justify-between">
                <span>Impuestos (19%)</span>
                <span className="font-medium text-gray-900">${(tax).toLocaleString("es-CO", { minimumFractionDigits: 0 })}</span>
              </div>
              <div className="flex justify-between text-base font-bold text-gray-900 pt-4 border-t border-gray-200">
                <span>Total</span>
                <span>${(total).toLocaleString("es-CO", { minimumFractionDigits: 0 })}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
