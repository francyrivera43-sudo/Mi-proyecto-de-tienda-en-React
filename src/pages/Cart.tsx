import React from 'react';
import { useCartStore } from '../store/cartStore';

export default function Cart() {
  const { items, removeFromCart, updateQuantity, getTotalItems, getTotalPrice } = useCartStore();

  const totalItems = getTotalItems();
  const subtotal = getTotalPrice();
  const tax = subtotal * 0.19; // Asumiendo 19% de impuestos como en la imagen
  const total = subtotal + tax;

  if (items.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16 text-center">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Your cart is empty</h2>
        <p className="text-gray-600">Go back to the store to add some products!</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-10 bg-white min-h-screen">
      <h2 className="text-xl font-bold text-gray-900 mb-8">Shopping Cart ({totalItems} items)</h2>
      
      <div className="space-y-6">
        {items.map((item) => (
          <div key={item.id} className="flex flex-col sm:flex-row items-center sm:items-start justify-between border-b border-gray-100 pb-6 gap-4">
            <div className="flex items-start space-x-4 w-full sm:w-auto">
              <img src={item.image} alt={item.title} className="w-20 h-20 object-contain rounded-md" />
              <div className="flex-1">
                <h3 className="text-sm font-medium text-gray-900">{item.title}</h3>
                <p className="text-xs text-gray-500 mt-1">${item.price.toFixed(2)}</p>
                
                <div className="flex items-center mt-3 space-x-6">
                  <div className="flex items-center bg-gray-50 rounded-md border border-gray-200">
                    <button 
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="px-3 py-1 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-l-md"
                    >
                      -
                    </button>
                    <span className="px-3 text-sm font-medium w-8 text-center bg-white border-x border-gray-200 py-1">
                      {item.quantity}
                    </span>
                    <button 
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="px-3 py-1 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-r-md"
                    >
                      +
                    </button>
                  </div>
                  
                </div>
              </div>
            </div>
            
            <div className="flex flex-col items-end justify-between h-full min-h-[5rem]">
              <span className="text-sm font-bold text-gray-900">${(item.price * item.quantity).toFixed(2)}</span>
              <button 
                onClick={() => removeFromCart(item.id)}
                className="text-red-500 hover:text-red-700 text-sm mt-auto"
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-12 max-w-lg">
        <h3 className="text-lg font-bold text-gray-900 mb-6">Order Summary</h3>
        
        <div className="space-y-4 text-sm text-gray-600 border-b border-gray-100 pb-4">
          <div className="flex justify-between">
            <span>Subtotal</span>
            <span>${subtotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span>Shipping</span>
            <span className="text-green-500 font-medium">Free</span>
          </div>
          <div className="flex justify-between">
            <span>Tax (19%)</span>
            <span>${tax.toFixed(2)}</span>
          </div>
        </div>
        
        <div className="flex justify-between items-center py-4">
          <span className="text-base font-bold text-gray-900">Total</span>
          <span className="text-base font-bold text-gray-900">${total.toFixed(2)}</span>
        </div>

        <div className="space-y-3 mt-4">
          <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-md transition-colors text-sm">
            Proceed to Checkout
          </button>
          <button className="w-full bg-gray-50 hover:bg-gray-100 text-gray-800 font-medium py-3 px-4 rounded-md transition-colors text-sm">
            Continue Shopping
          </button>
        </div>
      </div>
    </div>
  );
}
