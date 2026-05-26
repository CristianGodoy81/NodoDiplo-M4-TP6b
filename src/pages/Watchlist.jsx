import { useEffect, useState, useContext } from "react";
import { api } from "../api/api";
import { ProfileContext } from "../context/ProfileContext";
import { useNavigate, Link } from "react-router-dom";

export default function Watchlist() {
  const [movies, setMovies] = useState([]);
  const { profile } = useContext(ProfileContext);
  const navigate = useNavigate();

  const fetchWatchlist = async () => {
    try {
      const res = await api.get(`/watchlist/${profile._id}`);
      setMovies(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (profile) {
      fetchWatchlist();
    }
  }, [profile]);

  const removeFromWatchlist = async (watchlistId) => {
    try {
      // El backend requiere el id del item de la watchlist por URL
      await api.delete(`/watchlist/${watchlistId}`);

      // Filtramos la lista usando el _id del item de la watchlist
      setMovies((prevMovies) => prevMovies.filter((item) => item._id !== watchlistId));
    } catch (error) {
      console.log(error);
      alert("Error al eliminar la película de tu lista.");
    }
  };

  if (!profile) return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center text-white">
      <p className="text-xl">Seleccioná un perfil para continuar...</p>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-900 text-white pb-10 pt-20">
      <div className="max-w-7xl mx-auto p-6">
        
        {/* Cabecera */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-10 gap-4">
          <div>
            <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-linear-to-r from-blue-400 to-emerald-400">
              Mi Watchlist
            </h1>
            <p className="text-gray-400 mt-2">Películas guardadas para ver más tarde</p>
          </div>
          <Link to="/home" className="text-gray-300 hover:text-white px-4 py-2 bg-gray-800 rounded-lg flex items-center gap-2 border border-gray-700 hover:bg-gray-700 transition-colors w-max">
            <span>←</span> Volver al Catálogo
          </Link>
        </div>

        {/* Estado Vacío (Si no hay películas) */}
        {movies.length === 0 ? (
          <div className="flex flex-col items-center justify-center bg-gray-800/40 rounded-2xl p-12 border border-gray-700 mt-10 text-center shadow-lg">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-16 h-16 text-gray-500 mb-4">
              <path strokeLinecap="round" strokeLinejoin="round" d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0z" />
            </svg>
            <p className="text-2xl font-semibold text-gray-300 mb-2">Aún no agregaste películas</p>
            <p className="text-gray-500 mb-6 max-w-md">Navegá por el catálogo de películas y guardá las que quieras ver para más tarde. Van a aparecer en esta sección.</p>
            <Link to="/home" className="bg-blue-600 hover:bg-blue-500 text-white font-medium px-6 py-3 rounded-lg shadow transition-colors">
              Explorar Catálogo
            </Link>
          </div>
        ) : (
          /* Grilla de Películas de la List */
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
            {movies.map((item) => {
              // Si el backend lo devuelve populado ({ _id, profile, movie: {...datos} }), 
              // tomamos item.movie. Si lo devuelve directo, tomamos el mismo item.
              const movieData = item.movie || item; 
              // Para eliminar de la watchlist, usamos el _id de la película
              const movieIdToDelete = movieData._id;

              return (
                <div key={item._id} className="group relative flex flex-col">
                  
                  {/* Póster clickeable */}
                  <div 
                      className="w-full aspect-2/3 overflow-hidden rounded-xl shadow-lg cursor-pointer border border-transparent group-hover:border-gray-500 transition-all transform group-hover:-translate-y-1 group-hover:shadow-2xl mb-3"
                      onClick={() => navigate(`/movie/${movieData._id}`)}
                  >
                    <img 
                      src={movieData.image} 
                      alt={movieData.title} 
                      className="w-full h-full object-cover bg-gray-800"
                    />
                    {/* Overlay sutil */}
                    <div className="absolute inset-x-0 top-0 h-full bg-black/40 opacity-0 group-hover:opacity-100 flex flex-col items-center justify-center transition-opacity">
                        <span className="text-white font-medium bg-black/60 px-4 py-2 rounded-full backdrop-blur-sm shadow-lg mb-8 transition-transform group-hover:scale-105">
                          Ver detalle
                        </span>
                    </div>
                  </div>

                  <div className="flex flex-col grow justify-between gap-2">
                    <p className="text-center text-sm font-medium text-gray-200 truncate w-full px-1" title={movieData.title}>
                      {movieData.title}
                    </p>

                    <button
                      onClick={(e) => {
                         e.stopPropagation(); 
                         // Aquí pasamos item._id, no movieIdToDelete
                         removeFromWatchlist(item._id);
                      }}
                      className="w-full bg-red-600/80 hover:bg-red-500 text-white font-semibold py-2 px-2 rounded-lg shadow-sm transition-colors text-sm flex items-center justify-center gap-2 border border-red-700/50 hover:border-red-400"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                      </svg>
                      Quitar
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}