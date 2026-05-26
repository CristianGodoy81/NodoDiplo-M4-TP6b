import { useEffect, useState, useContext } from "react";
import { api } from "../api/api";
import { ProfileContext } from "../context/ProfileContext";
import { useNavigate, Link } from "react-router-dom";

export default function Home() {
    const [movies, setMovies] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const { profile } = useContext(ProfileContext);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchMovies = async () => {
            try {
                // Obtenemos todas las películas
                const res = await api.get("/movies", {
                    params: { profileId: profile._id }
                });
                setMovies(res.data);
            } catch (error) {
                console.log(error);
            }
        };

        if (profile) {
            fetchMovies();
        }
    }, [profile]);

    if (!profile) {
        return <div className="p-6 text-center text-xl">Seleccioná un perfil para continuar...</div>;
    }

    // Filtrar películas por el título ingresado en el buscador
    const filteredMovies = movies.filter((movie) =>
        movie.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="min-h-screen bg-gray-900 text-white pb-10 pt-10">
            {/* Cabecera / Buscador Central */}
            <div className="flex flex-col items-center justify-center pt-24 pb-12 px-4 bg-gray-800 shadow-md">
                <h1 className="text-4xl md:text-5xl font-bold mb-6 text-center text-transparent bg-clip-text bg-linear-to-r from-blue-400 to-emerald-400">
                    ¿Qué querés ver hoy?
                </h1>
                
                <input
                    type="text"
                    placeholder="Buscar películas..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full max-w-2xl px-6 py-4 rounded-full bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 text-lg shadow-lg transition-all"
                />
            </div>

            {/* Grilla de Películas */}
            <div className="p-6 max-w-7xl mx-auto mt-6">
                <h2 className="text-2xl font-semibold mb-6">
                    {searchTerm ? "Resultados de búsqueda" : "Catálogo destacado"}
                </h2>

                {filteredMovies.length === 0 ? (
                    <p className="text-gray-400 text-center text-lg mt-10">No se encontraron películas para "{searchTerm}".</p>
                ) : (
                    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
                        {filteredMovies.map((movie) => (
                            <div 
                                key={movie._id} 
                                className="group cursor-pointer flex flex-col items-center transition-transform hover:scale-105"
                                onClick={() => navigate(`/movie/${movie._id}`)}
                            >
                                <div className="relative w-full aspect-2/3 overflow-hidden rounded-xl shadow-lg">
                                    <img
                                        src={movie.image}
                                        alt={movie.title}
                                        className="w-full h-full object-cover"
                                    />
                                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                                        <span className="text-white font-semibold">Ver detalle</span>
                                    </div>
                                </div>
                                <p className="mt-3 text-center text-sm font-medium text-gray-200 truncate w-full px-2">
                                    {movie.title}
                                </p>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}