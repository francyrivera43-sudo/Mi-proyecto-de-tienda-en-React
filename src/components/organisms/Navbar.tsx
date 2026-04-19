import React from 'react';
import { Link } from 'react-router-dom';
import { useCartStore } from '../../store/cartStore';

export default function Navbar() {
  const totalItems = useCartStore(state => state.getTotalItems());

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link to="/" className="text-2xl font-extrabold text-blue-600 tracking-tight">
              MiTienda<span className="text-gray-800">.</span>
            </Link>
          </div>
          <div className="flex items-center space-x-6">
            <Link to="/" className="text-gray-600 hover:text-blue-600 font-medium transition-colors">
              Catálogo
            </Link>
            <Link to="/cart" className="relative text-gray-600 hover:text-blue-600 transition-colors">
              <span className="text-2xl">🛒</span>
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
