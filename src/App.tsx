import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/organisms/Navbar';
import Home from './pages/Home';
import Cart from './pages/Cart';
import MensClothing from './pages/MensClothing';

function App() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/ropa-hombre" element={<MensClothing />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
