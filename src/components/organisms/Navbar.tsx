import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCartStore } from '../../store/cartStore';
import { useAuthStore } from '../../store/authStore';
import { useProductStore } from '../../store/productStore';

export default function Navbar() {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const totalItems = useCartStore(state => state.getTotalItems());
  const { user, isAuthenticated, logout } = useAuthStore();
  const { searchTerm, setSearchTerm } = useProductStore();

  const handleLogout = () => {
    logout();
    setIsMenuOpen(false);
    navigate('/login');
  };

  return (
    <nav className="bg-white border-b sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo y Links Desktop */}
          <div className="flex items-center space-x-8">
            <Link to="/" className="text-2xl font-black text-violet-600 tracking-tighter">
              KARATE PRO<span className="text-gray-900"> SHOP</span>
            </Link>
            <div className="hidden lg:flex space-x-6">
              <Link to="/" className="text-sm font-semibold text-gray-600 hover:text-violet-600 transition-colors">Inicio</Link>
              <Link to="/category/electronics" className="text-sm font-semibold text-gray-600 hover:text-violet-600 transition-colors">Electrónica</Link>
              <Link to="/category/men's clothing" className="text-sm font-semibold text-gray-600 hover:text-violet-600 transition-colors">Hombres</Link>
            </div>
          </div>
          
          {/* Buscador - Visible en Desktop */}
          <div className="hidden md:flex flex-1 justify-center px-10">
            <div className="w-full max-w-md relative group">
              <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-400 group-focus-within:text-violet-500 transition-colors">
                🔍
              </span>
              <input 
                type="text" 
                placeholder="¿Qué estás buscando?" 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-violet-500/20 focus:border-violet-500 transition-all"
              />
            </div>
          </div>

          {/* Acciones */}
          <div className="flex items-center space-x-4">
            <div className="hidden sm:flex items-center space-x-4 border-r pr-4 border-gray-100">
              {isAuthenticated ? (
                <div className="flex items-center space-x-3">
                  <div className="text-right">
                    <p className="text-[10px] text-gray-400 uppercase font-bold leading-none">Bienvenido</p>
                    <p className="text-sm font-bold text-gray-900">{user?.name.split(' ')[0]}</p>
                  </div>
                  <button 
                    onClick={handleLogout}
                    className="p-2 text-gray-400 hover:text-red-500 transition-colors"
                    title="Cerrar sesión"
                  >
                    🚪
                  </button>
                </div>
              ) : (
                <Link to="/login" className="text-sm font-bold text-blue-600 hover:text-blue-700">
                  Iniciar Sesión
                </Link>
              )}
            </div>
            
            <Link to="/cart" className="relative p-2 text-gray-600 hover:text-blue-600 transition-all hover:scale-110">
              <span className="text-2xl">🛒</span>
              {totalItems > 0 && (
                <span className="absolute top-0 right-0 bg-red-500 text-white text-[10px] font-black rounded-full h-5 w-5 flex items-center justify-center border-2 border-white shadow-sm">
                  {totalItems}
                </span>
              )}
            </Link>

            {/* Botón Menú Móvil */}
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden p-2 rounded-md text-gray-600 hover:bg-gray-100 transition-colors"
            >
              <span className="text-2xl">{isMenuOpen ? '✕' : '☰'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Menú Móvil Desplegable */}
      {isMenuOpen && (
        <div className="lg:hidden bg-white border-t border-gray-100 py-4 px-4 space-y-4 animate-in slide-in-from-top duration-200">
          <div className="relative">
            <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-400">🔍</span>
            <input 
              type="text" 
              placeholder="Buscar..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none"
            />
          </div>
          <div className="grid grid-cols-2 gap-2">
            <Link onClick={() => setIsMenuOpen(false)} to="/" className="p-3 bg-gray-50 rounded-lg text-sm font-semibold text-gray-700 text-center">Inicio</Link>
            <Link onClick={() => setIsMenuOpen(false)} to="/category/electronics" className="p-3 bg-gray-50 rounded-lg text-sm font-semibold text-gray-700 text-center">Electrónica</Link>
            <Link onClick={() => setIsMenuOpen(false)} to="/category/men's clothing" className="p-3 bg-gray-50 rounded-lg text-sm font-semibold text-gray-700 text-center">Hombres</Link>
            <Link onClick={() => setIsMenuOpen(false)} to="/category/women's clothing" className="p-3 bg-gray-50 rounded-lg text-sm font-semibold text-gray-700 text-center">Mujeres</Link>
          </div>
          {!isAuthenticated && (
            <Link 
              onClick={() => setIsMenuOpen(false)} 
              to="/login" 
              className="block w-full py-3 bg-blue-600 text-white text-center rounded-xl font-bold"
            >
              Iniciar Sesión
            </Link>
          )}
          {isAuthenticated && (
            <button 
              onClick={handleLogout}
              className="w-full py-3 bg-gray-100 text-gray-700 text-center rounded-xl font-bold"
            >
              Cerrar Sesión ({user?.name})
            </button>
          )}
        </div>
      )}
    </nav>
  );
}
