import { useLocation } from "react-router-dom";
import tmdbLogo from "../assets/tmdb-logo.svg"; // <-- Cambiá esto si tu archivo se llama distinto (.png, etc.)

export default function Footer() {
  const location = useLocation();

  // (Opcional) Si querés ocultar el footer en el login/registro, igual que el Navbar
  if (
    location.pathname === "/login" ||
    location.pathname === "/register" ||
    location.pathname === "/profiles"
  ) {
    return null;
  }

  return (
    <footer className="bg-[#0d253f] text-[#90cea1] py-6">
      <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-center gap-6">
        
        {/* Logo de TMDB */}
        <a href="https://www.themoviedb.org/" target="_blank" rel="noopener noreferrer">
          <img 
            src={tmdbLogo} 
            alt="The Movie Database (TMDB) Logo" 
            className="h-12 w-auto"
          />
        </a>

        {/* Texto de atribución oficial */}
        <div className="text-center md:text-left text-sm max-w-lg">
          <p className="mb-1">
            "This product uses the TMDB API but is not endorsed or certified by TMDB."
          </p>
          <a 
            href="https://www.themoviedb.org/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-[#01b4e4] hover:text-white transition-colors"
          >
            www.themoviedb.org
          </a>
        </div>

      </div>
    </footer>
  );
}