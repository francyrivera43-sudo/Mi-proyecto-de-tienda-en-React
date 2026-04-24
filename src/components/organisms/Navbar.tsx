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

  const firstName = user?.name ? user.name.split(' ')[0] : '';

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
              <Link to="/" className="text-sm font-semibold text-gray-600 hover:text-violet-600">
                Inicio
              </Link>
              <Link to="/category/electronics" className="text-sm font-semibold text-gray-600 hover:text-violet-600">
                Electrónica
              </Link>
              <Link to="/category/men's clothing" className="text-sm font-semibold text-gray-600 hover:text-violet-600">
                Hombres
              </Link>
            </div>
          </div>

          {/* Buscador */}
          <div className="hidden md:flex flex-1 justify-center px-10">
            <div className="w-full max-w-md relative">
              <span className="absolute left-3 top-2.5 text-gray-400">🔍</span>
              <input
                type="text"
                placeholder="¿Qué estás buscando?"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-gray-50 border rounded-xl text-sm"
              />
            </div>
          </div>

          {/* Acciones */}
          <div className="flex items-center space-x-4">

            {/* Usuario */}
            <div className="hidden sm:flex items-center space-x-3">
              {isAuthenticated ? (
                <>
                  <div className="text-right">
                    <p className="text-[10px] text-gray-400 uppercase">Bienvenido</p>
                    <p className="text-sm font-bold text-gray-900">
                      {firstName}
                    </p>
                  </div>

                  <button onClick={handleLogout} title="Cerrar sesión">
                    🚪
                  </button>
                </>
              ) : (
                <Link to="/login" className="text-sm font-bold text-blue-600">
                  Iniciar Sesión
                </Link>
              )}
            </div>

            {/* Carrito */}
            <Link to="/cart" className="relative text-2xl">
              🛒
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full px-2">
                  {totalItems}
                </span>
              )}
            </Link>

            {/* Menú móvil */}
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="lg:hidden text-2xl">
              {isMenuOpen ? '✕' : '☰'}
            </button>

          </div>
        </div>
      </div>

      {/* Mobile */}
      {isMenuOpen && (
        <div className="lg:hidden p-4 space-y-3 border-t">
          <input
            type="text"
            placeholder="Buscar..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full p-2 border rounded"
          />

          <Link to="/" onClick={() => setIsMenuOpen(false)}>Inicio</Link>
          <Link to="/category/electronics" onClick={() => setIsMenuOpen(false)}>Electrónica</Link>
          <Link to="/category/men's clothing" onClick={() => setIsMenuOpen(false)}>Hombres</Link>
          <Link to="/category/women's clothing" onClick={() => setIsMenuOpen(false)}>Mujeres</Link>

          {!isAuthenticated ? (
            <Link to="/login" className="block bg-blue-600 text-white text-center p-2 rounded">
              Iniciar Sesión
            </Link>
          ) : (
            <button onClick={handleLogout} className="w-full bg-gray-200 p-2 rounded">
              Cerrar Sesión
            </button>
          )}
        </div>
      )}
    </nav>
  );
}