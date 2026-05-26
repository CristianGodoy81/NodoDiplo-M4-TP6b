import { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { api } from "../api/api";
import { ProfileContext } from "../context/ProfileContext";

export default function MovieDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [movie, setMovie] = useState(null);
  const [trailer, setTrailer] = useState(null);

  const { profile } = useContext(ProfileContext);

  const addToWatchlist = async () => {
    try {
      await api.post("/watchlist", {
        profileId: profile._id,
        movieId: movie._id
      });

      alert("¡Agregada a tu Watchlist!");
    } catch (error) {
      console.log(error);
      alert("Error al agregar. Es posible que ya esté en la lista.");
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        // traer película
        const movieRes = await api.get(`/movies/${id}`);
        setMovie(movieRes.data);

        // traer trailer 
        const trailerRes = await api.get(`/movies/${id}/trailer`);
        setTrailer(trailerRes.data.trailer);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [id]);

  if (!movie) return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center text-white">
        <p className="text-2xl animate-pulse">Cargando detalles...</p>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-900 text-white pb-10 pt-20">
      
      {/* Botón Volver */}
      <div className="p-6 max-w-7xl mx-auto">
        <button 
          onClick={() => navigate(-1)} 
          className="text-gray-400 hover:text-white flex items-center gap-2 transition-colors font-medium"
        >
          ← Volver
        </button>
      </div>

      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          
          {/* Columna Izquierda: Póster e Información */}
          <div className="lg:col-span-1 flex flex-col items-center lg:items-start">
            <img
              src={movie.image}
              alt={movie.title}
              className="w-64 lg:w-full rounded-2xl shadow-2xl shadow-black/60 mb-6 object-cover aspect-[2/3] border border-gray-800"
            />
            
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-center lg:text-left text-transparent bg-clip-text bg-gradient-to-r from-gray-100 to-gray-400">
              {movie.title}
            </h1>

            {/* Badges de Géneros y Edad */}
            <div className="flex flex-wrap gap-2 justify-center lg:justify-start mb-6 w-full">
              <span className="px-3 py-1 bg-gray-800 border border-gray-700 rounded-md text-sm font-semibold text-gray-300">
                +{movie.ageRating}
              </span>
              {movie.category?.map(cat => (
                <span key={cat} className="px-3 py-1 bg-blue-900/30 text-blue-400 border border-blue-800/50 rounded-md text-sm font-medium">
                  {cat}
                </span>
              ))}
            </div>

            <button
              onClick={addToWatchlist}
              className="w-full sm:w-auto bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-3 px-8 rounded-lg shadow-lg hover:shadow-emerald-600/40 transition-all transform hover:-translate-y-1 mb-8"
            >
              + Agregar a Mi Lista
            </button>

            {/* Sinopsis */}
            <div className="bg-gray-800/40 p-6 rounded-xl border border-gray-700 w-full">
              <h3 className="text-xl font-semibold mb-3 text-gray-200">Sinopsis</h3>
              <p className="text-gray-400 leading-relaxed text-sm md:text-base">
                {movie.synopsis}
              </p>
            </div>
          </div>

          {/* Columna Derecha: Tráiler */}
          <div className="lg:col-span-2 flex flex-col">
            <h2 className="text-2xl font-semibold mb-4 text-gray-200">Tráiler Oficial</h2>
            
            <div className="relative w-full aspect-video bg-black rounded-2xl overflow-hidden shadow-2xl border border-gray-800">
              {trailer ? (
                <iframe
                  className="absolute top-0 left-0 w-full h-full"
                  src={trailer.replace("watch?v=", "embed/")}
                  title={`Trailer de ${movie.title}`}
                  allowFullScreen
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                />
              ) : (
                <div className="flex items-center justify-center w-full h-full text-gray-500 bg-gray-800/50">
                  <p>Tráiler no disponible</p>
                </div>
              )}
            </div>
          </div>
          
        </div>
      </div>
    </div>
  );
}