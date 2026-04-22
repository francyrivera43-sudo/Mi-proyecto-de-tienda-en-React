import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Button from '../components/atoms/Button';

export default function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const existingUsers = JSON.parse(localStorage.getItem('registered_users') || '[]');
    if (existingUsers.some((u: any) => u.email === email)) {
      alert('Este correo ya está registrado');
      return;
    }
    const newUser = { id: Date.now().toString(), name, email, password };
    localStorage.setItem('registered_users', JSON.stringify([...existingUsers, newUser]));
    alert('¡Registro exitoso!');
    navigate('/login');
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 px-4 py-12">
      <div className="max-w-md w-full">
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-100">
          <div className="bg-violet-600 py-10 px-8 text-center">
            <h2 className="text-3xl font-black text-white tracking-tight">Crea tu cuenta</h2>
            <p className="text-violet-100 mt-2 text-sm">Únete a la mejor experiencia en STORE.</p>
          </div>
          
          <form className="p-8 space-y-5" onSubmit={handleSubmit}>
            <div className="space-y-4">
              <div>
                <label className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-1">Nombre Completo</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full mt-1 px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-violet-500/20 focus:border-violet-500 outline-none transition-all text-sm"
                  placeholder="Tu nombre"
                />
              </div>
              <div>
                <label className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-1">Email</label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full mt-1 px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all text-sm"
                  placeholder="ejemplo@correo.com"
                />
              </div>
              <div>
                <label className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-1">Contraseña</label>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full mt-1 px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all text-sm"
                  placeholder="••••••••"
                />
              </div>
            </div>

            <Button type="submit" className="w-full py-4 shadow-lg shadow-blue-500/30 text-base font-bold mt-4">
              Crear Cuenta
            </Button>

            <div className="text-center pt-4 border-t border-gray-50">
              <p className="text-sm text-gray-500">
                ¿Ya tienes cuenta?{' '}
                <Link to="/login" className="text-blue-600 font-bold hover:underline">
                  Inicia sesión
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
