import { useEffect, useState, useContext } from "react";
import { api } from "../api/api";
import { ProfileContext } from "../context/ProfileContext";

export default function Watchlist() {
  const [movies, setMovies] = useState([]);
  const { profile } = useContext(ProfileContext);

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

  const removeFromWatchlist = async (movieId) => {
    try {
      await api.delete("/watchlist", {
        data: {
          profileId: profile._id,
          movieId
        }
      });

      fetchWatchlist();
    } catch (error) {
      console.log(error);
    }
  };

  if (!profile) return <p>Seleccioná un perfil</p>;

  return (
    <div className="p-6">
      <h1 className="text-2xl mb-6">Mi Watchlist</h1>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {movies.map((movie) => (
          <div key={movie._id}>
            <img src={movie.image} alt={movie.title} />

            <p>{movie.title}</p>

            <button
              onClick={() => removeFromWatchlist(movie._id)}
              className="bg-red-500 text-white px-2 py-1 mt-2"
            >
              Eliminar
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}