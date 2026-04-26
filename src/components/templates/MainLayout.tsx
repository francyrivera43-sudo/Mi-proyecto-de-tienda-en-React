import React from 'react';
import Navbar from '../organisms/Navbar';

interface MainLayoutProps {
  children: React.ReactNode;
}

export default function MainLayout({ children }: MainLayoutProps) {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-sans">
      <Navbar />
      <main className="flex-grow">
        {children}
      </main>
      <footer className="bg-white border-t py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div>
              <h3 className="text-xl font-black text-violet-600 mb-4">KARATE PRO SHOP</h3>
              <p className="text-gray-500 text-sm leading-relaxed">
                Tu tienda favorita de moda y tecnología. Calidad y confianza en cada clic.
              </p>
            </div>
            <div>
              <h4 className="text-sm font-bold text-gray-900 uppercase tracking-widest mb-4">Categorías</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>Uniformes</li>
                <li>Ropa</li>
                <li>Protecciones</li>
                <li>Cinturones</li>
              </ul>
            </div>
            <div>
              <h4 className="text-sm font-bold text-gray-900 uppercase tracking-widest mb-4">Soporte</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>Centro de ayuda</li>
                <li>Términos y condiciones</li>
                <li>Privacidad</li>
              </ul>
            </div>
          </div>
          <div className="mt-12 pt-8 border-t border-gray-100 text-center text-gray-400 text-xs">
            &copy; 2024 Fullstack Challenge E-commerce. Desarrollado por Francy Rivera.
          </div>
        </div>
      </footer>
    </div>
  );
}
