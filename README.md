# Netlify URL: https://nododiplo-m4-tp6b.netlify.app/

# 🎬 Proyecto Full Stack - App de Películas (Frontend)

Este proyecto es el Frontend de una aplicación web de películas (similar a plataformas de streaming), desarrollado con React y Vite. Permite a los usuarios registrarse, iniciar sesión, elegir perfiles, explorar películas en el inicio, ver el detalle de cada una, gestionar una lista de seguimiento (watchlist) y cuenta con un panel de administrador.

## 🚀 Tecnologías y Herramientas

El proyecto está desarrollado con el ecosistema de frontend moderno:

- **[React 19](https://react.dev/)**: Biblioteca principal para la construcción de interfaces de usuario.
- **[Vite 8](https://vitejs.dev/)**: Entorno de desarrollo rápido y empaquetador moderno.
- **[Tailwind CSS 4](https://tailwindcss.com/)**: Framework de CSS utility-first para los estilos.
- **[React Router DOM 7](https://reactrouter.com/)**: Para la navegación y el manejo de rutas de la aplicación (SPA).
- **[Axios](https://axios-http.com/)**: Cliente HTTP para las peticiones a la API local (tiene un interceptor para enviar tokens JWT).
- **[TanStack React Query 5](https://tanstack.com/query/latest)**: Para asincronía, fetching, caching y manejo de estado de las peticiones al backend.
- **[React Hook Form 7](https://react-hook-form.com/)**: Para lidiar de manera sencilla y eficiente con la validación y el control de los formularios.

## ✨ Características Principales

- **Autenticación de Usuarios:** Registro e inicio de sesión integrados (`Login`, `Register`). Utilización de un Context (`AuthContext`) y JWT guardados en el `localStorage`.
- **Perfiles Multiusuario:** Selección de perfil al ingresar a la plataforma, al estilo de aplicaciones de streaming (`ProfilesContext`).
- **Explorador de Películas:** Pantalla inicial (`Home`) y vistas de detalle por película (`MovieDetail`).
- **Watchlist (Mi Lista):** Funcionalidad que permite al usuario guardar sus películas favoritas o pendientes en una lista personal.
- **Panel de control:** Sección exclusiva para gestores (`AdminPanel`).
- **Navegación Protegida:** Rutas protegidas mediante un router global (`AppRouter.jsx`).

## 📋 Requisitos Previos

Necesitarás tener instalado Node.js en tu dispositivo.

- Node.js (v18 o superior recomendado)
- Tener operativo el Backend de este proyecto ejecutándose localmente (por defecto, espera recibir peticiones en `http://localhost:3000/api`).

## 🛠️ Instalación y ejecución

Sigue estos pasos para arrancar el entorno de desarrollo:

1. **Clona el repositorio** o sitúate en la carpeta del proyecto.

   cd m4_tp6b

2. **Instala las dependencias.**

   npm install

3. **Ejecuta el servidor de desarrollo.**

   npm run dev
   
4. Abre la aplicación en tu navegador (la consola te indicará el puerto, normalmente `http://localhost:5173/`).

## 📁 Estructura del proyecto

src/
├── api/          # Configuración del cliente Axios y sus interceptores
├── assets/       # Recursos estáticos (imágenes, iconos)
├── components/   # Componentes globales reutilizables (Navbar, Footer, etc.)
├── context/      # Contextos globales para Estado (AuthContext, ProfileContext)
├── hooks/        # Custom Hooks de React para lógica extraida
├── pages/        # Vistas y pantallas (Home, Login, Watchlist, AdminPanel...)
├── routes/       # Definición del React Router y protección de vistas
├── App.jsx       # Componente raíz
└── main.jsx      # Punto de entrada para el montado de React

## 📜 Scripts Disponibles

En el directorio del proyecto, puedes ejecutar:

- `npm run dev`: Inicia servidor local de desarrollo.
- `npm run build`: Construye la app y la optimiza para producción en la carpeta `dist`.
- `npm run lint`: Evalúa el código usando ESLint para encontrar problemas y mantener las mejores prácticas.
- `npm run preview`: Previsualiza la build de producción de forma local.