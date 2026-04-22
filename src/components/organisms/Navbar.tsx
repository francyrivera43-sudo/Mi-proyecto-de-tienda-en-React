import React from 'react';
import { Link } from 'react-router-dom';
import { useCartStore } from '../../store/cartStore';

export default function Navbar() {
  const totalItems = useCartStore(state => state.getTotalItems());

  return (
    <nav className="bg-white border-b sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-6">
            <Link to="/" className="text-xl font-bold text-gray-900 tracking-tight">
              Store
            </Link>
            <div className="hidden sm:flex space-x-4">
              <Link to="/" className="text-sm font-medium text-gray-600 hover:text-gray-900">
                Todo
              </Link>
              <Link to="/ropa-hombre" className="text-sm font-medium text-gray-600 hover:text-gray-900">
                Ropa de Hombre
              </Link>
            </div>
          </div>
          
          <div className="hidden md:flex flex-1 justify-center px-8">
            <div className="w-full max-w-lg relative">
              <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-500">
                🔍
              </span>
              <input 
                type="text" 
                placeholder="Search products..." 
                className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-md bg-gray-50 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>
          </div>

          <div className="flex items-center space-x-6 text-sm">
            <div className="hidden sm:flex items-center space-x-4">
              <span className="text-gray-500">Hello, <span className="font-semibold text-gray-900">Demo User</span></span>
              <button className="px-3 py-1.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-md font-medium transition-colors">
                Logout
              </button>
            </div>
            
            <Link to="/cart" className="relative text-gray-600 hover:text-blue-600 transition-colors flex items-center">
              <span className="text-2xl">🛒</span>
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-blue-600 text-white text-[10px] font-bold rounded-full h-5 w-5 flex items-center justify-center border-2 border-white">
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
