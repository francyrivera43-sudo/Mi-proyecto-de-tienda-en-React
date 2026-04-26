# Karate Pro Shop - E-commerce 🥋🚀

## 🎯 Objetivo General
Desarrollar una aplicación web tipo **E-commerce** utilizando React, aplicando conceptos clave como:
- Componentización (Atomic Design)
- Manejo de estado (Zustand)
- Datos locales simulados y filtrado dinámico
- Navegación entre vistas (SPA con React Router)
- Buenas prácticas de desarrollo frontend

---

## 📝 Presentación del Proyecto
### Información General
- **Nombre del Proyecto:** Karate Pro Shop - E-commerce
- **Autor:** Francy Rivera
- **Repositorio:** https://github.com/francyrivera43-sudo/Mi-proyecto-de-tienda-en-React
- **Deploy (Vercel):** [Añadir enlace de Vercel aquí una vez publicado]

---

## 🛠️ Tecnologías y Herramientas
- **React.js** (Vite)
- **TypeScript**
- **Tailwind CSS** (Estilos)
- **Zustand** (Estado Global)
- **React Router Dom** (Navegación)
- **Axios** (Peticiones HTTP)
- **FakeStore API** (Datos reales)

---

## 📂 Estructura del Proyecto (Atomic Design)
```text
src/
├── components/
│   ├── atoms/      (botones, inputs, badges, rating)
│   ├── molecules/  (cards de producto)
│   ├── organisms/  (navbar, footer)
│   └── templates/  (layouts de páginas)
├── pages/          (vistas principales: Home, Cart, Login, etc.)
├── store/          (Zustand stores: cart, auth, products)
├── styles/         (estilos globales)
└── App.tsx         (configuración de rutas)
```

---

## ⚙️ Instalación y Uso
Sigue estos pasos para ejecutar el proyecto localmente:

1. **Clonar el repositorio:**
   ```bash
   git clone https://github.com/francyrivera43-sudo/Mi-proyecto-de-tienda-en-React
   ```

2. **Entrar al proyecto:**
   ```bash
   cd mi-tienda
   ```

3. **Instalar dependencias:**
   ```bash
   npm install
   ```

4. **Ejecutar el proyecto:**
   ```bash
   npm run dev
   ```

---

## ✅ Funcionalidades Implementadas
- [x] Registro de usuarios y sesión persistente (LocalStorage).
- [x] Galería dinámica de productos desde API.
- [x] Paginación de productos (8 por página).
- [x] Buscador de productos en tiempo real (Global).
- [x] Carrito de compras funcional (Agregar/Quitar/Cantidades).
- [x] Previsualización de checkout y resumen de compra.
- [x] Diseño 100% Responsivo.
- [x] Rutas protegidas (Login requerido para Checkout).
