import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Button from '../components/atoms/Button';

export default function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  // 👇 LEER USUARIOS GUARDADOS
  const users = JSON.parse(localStorage.getItem('registered_users') || '[]');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const existingUsers = JSON.parse(localStorage.getItem('registered_users') || '[]');

    // validar email repetido
    if (existingUsers.some((u: any) => u.email === email)) {
      alert('Este correo ya está registrado');
      return;
    }

    const newUser = {
      id: Date.now().toString(),
      name,
      email,
      password
    };

    localStorage.setItem(
      'registered_users',
      JSON.stringify([...existingUsers, newUser])
    );

    alert('¡Registro exitoso!');

    setName('');
    setEmail('');
    setPassword('');

    navigate('/login');
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 px-4 py-12">
      <div className="max-w-md w-full">

        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-100">

          {/* HEADER */}
          <div className="bg-violet-600 py-10 px-8 text-center">
            <h2 className="text-3xl font-black text-white">Crea tu cuenta</h2>
            <p className="text-violet-100 mt-2 text-sm">
              Únete a la mejor experiencia en STORE.
            </p>
          </div>

          {/* FORM */}
          <form className="p-8 space-y-5" onSubmit={handleSubmit}>

            {/* NOMBRE */}
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Tu nombre"
              className="w-full px-4 py-3 border rounded-xl"
            />

            {/* EMAIL */}
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Correo"
              className="w-full px-4 py-3 border rounded-xl"
            />

            {/* PASSWORD */}
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Contraseña"
              className="w-full px-4 py-3 border rounded-xl"
            />

            <Button type="submit" className="w-full py-4 font-bold">
              Crear Cuenta
            </Button>

            <p className="text-center text-sm text-gray-500">
              ¿Ya tienes cuenta?{' '}
              <Link to="/login" className="text-blue-600 font-bold">
                Inicia sesión
              </Link>
            </p>
          </form>
        </div>

        {/* 👇 AQUÍ YA VAS A VER TU NOMBRE Y CORREO */}
        <div className="mt-6 bg-gray-100 p-4 rounded-xl">
          <h3 className="font-bold mb-2">Usuarios registrados:</h3>

          {users.length === 0 ? (
            <p className="text-sm text-gray-500">No hay usuarios aún</p>
          ) : (
            users.map((u: any) => (
              <div key={u.id} className="text-sm border-b py-2">
                <p><b>Nombre:</b> {u.name}</p>
                <p><b>Correo:</b> {u.email}</p>
              </div>
            ))
          )}
        </div>

      </div>
    </div>
  );
}