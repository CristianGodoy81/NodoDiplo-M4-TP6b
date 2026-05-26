import { useEffect, useContext } from "react";
import { BrowserRouter, Routes, Route, Navigate, useLocation } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Profiles from "../pages/Profiles";
import Home from "../pages/Home";
import MovieDetail from "../pages/MovieDetail";
import Watchlist from "../pages/Watchlist";
import AdminPanel from "../pages/AdminPanel";

// Componente utilitario para forzar que el Scroll suba a la cima cada vez que cambia la ruta
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

export default function AppRouter() {

  const { token } = useContext(AuthContext);
  const isAuth = !!token;
  
  return (
    <BrowserRouter>
      <ScrollToTop />
      {/* Envolver todo en un contenedor flex que ocupe el alto mínimo de la pantalla */}
      <div className="flex flex-col min-h-screen">
        
        <Navbar /> 
        
        {/* main con flex-grow empuja el Footer hacia abajo si hay poco contenido */}
        <main className="grow">
          <Routes>
            <Route path="/" element={isAuth ? <Navigate to="/profiles" /> : <Navigate to="/login" />} />
            <Route path="/login" element={isAuth ? <Navigate to="/profiles" /> : <Login />} />
            <Route path="/register" element={isAuth ? <Navigate to="/profiles" /> : <Register />} />
            
            <Route path="/admin" element={isAuth ? <AdminPanel /> : <Navigate to="/login" />} />
            <Route path="/profiles" element={isAuth ? <Profiles /> : <Navigate to="/login" />} />
            <Route path="/home" element={isAuth ? <Home /> : <Navigate to="/login" />} />
            <Route path="/movie/:id" element={isAuth ? <MovieDetail /> : <Navigate to="/login" />} />
            <Route path="/watchlist" element={isAuth ? <Watchlist /> : <Navigate to="/login" />} />
          </Routes>
        </main>

        {/* Footer al final */}
        <Footer />

      </div>
    </BrowserRouter>
  );
}