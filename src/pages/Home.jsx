import { useEffect, useState, useContext } from "react";
import { api } from "../api/api";
import { ProfileContext } from "../context/ProfileContext";
import { useNavigate } from "react-router-dom";

export default function Home() {
    const [movies, setMovies] = useState([]);
    const { profile } = useContext(ProfileContext);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchMovies = async () => {
            try {
                const res = await api.get("/movies", {
                    params: {
                        profileId: profile._id
                    }
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
        return <p>Seleccioná un perfil</p>;
    }

    return (
        <div className="p-6">
            <h1 className="text-2xl mb-6">Catálogo</h1>

            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                {movies.map((movie) => (
                    <div key={movie._id} className="cursor-pointer" onClick={() => navigate(`/movie/${movie._id}`)}>
                        <img
                            src={movie.image}
                            alt={movie.title}
                            className="rounded"
                        />
                        <p className="mt-2 text-sm">{movie.title}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}