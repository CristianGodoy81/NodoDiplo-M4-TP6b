import { useContext } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { ProfileContext } from "../context/ProfileContext";

export default function Navbar() {
  const { logout } = useContext(AuthContext);
  const { profile, selectProfile } = useContext(ProfileContext);
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const handleChangeProfile = () => {
    selectProfile(null);
    navigate("/profiles");
  };

  // No mostramos navbar ni en login, ni registro, ni en la selección de perfiles
  if (
    location.pathname === "/login" ||
    location.pathname === "/register" ||
    location.pathname === "/profiles"
  ) {
    return null;
  }

  return (
    <nav className="fixed top-0 w-full z-50 bg-gray-900/90 backdrop-blur border-b border-gray-800 shadow-md transition-all">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        
        {/* Logo / Home Link */}
        <Link 
          to="/home" 
          className="text-2xl font-bold text-transparent bg-clip-text bg-linear-to-r from-blue-400 to-emerald-400 hover:opacity-80 transition-opacity"
        >
          Nodo🎬Cine
        </Link>

        {/* Links de navegación y Acciones de Perfil */}
        <div className="flex items-center gap-6">
          <Link 
            to="/watchlist" 
            className={`font-medium transition-colors hover:text-white ${location.pathname === '/watchlist' ? 'text-white' : 'text-gray-400'}`}
          >
            Mi Lista
          </Link>

          {profile && (
            <div className="flex items-center gap-3 ml-4 border-l border-gray-700 pl-6">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded bg-linear-to-tr from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold text-sm shadow-sm ring-2 ring-gray-800">
                  {profile.name.charAt(0).toUpperCase()}
                </div>
                <span className="text-gray-200 text-sm hidden md:block font-medium">
                  {profile.name}
                </span>
              </div>
              
              <button
                onClick={handleChangeProfile}
                className="text-xs text-blue-400 hover:text-blue-300 transition-colors bg-gray-800/50 hover:bg-gray-700 px-3 py-1.5 rounded-full border border-gray-700"
              >
                Cambiar Perfil
              </button>

              <button
                onClick={handleLogout}
                className="text-xs text-red-400 hover:text-red-300 transition-colors font-medium ml-2"
              >
                Salir
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}