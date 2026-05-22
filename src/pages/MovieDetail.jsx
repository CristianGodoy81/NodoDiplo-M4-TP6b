import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { api } from "../api/api";

export default function MovieDetail() {
  const { id } = useParams();

  const [movie, setMovie] = useState(null);
  const [trailer, setTrailer] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // traer película
        const movieRes = await api.get(`/movies/${id}`);
        setMovie(movieRes.data);

        // traer trailer (on demand)
        const trailerRes = await api.get(`/movies/${id}/trailer`);
        setTrailer(trailerRes.data.trailer);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [id]);

  if (!movie) return <p>Cargando...</p>;

  return (
    <div className="p-6">
      <h1 className="text-2xl mb-4">{movie.title}</h1>

      <img
        src={movie.image}
        alt={movie.title}
        className="mb-4 w-64"
      />

      <p className="mb-4">{movie.synopsis}</p>

      <p className="mb-2">
        Edad: +{movie.ageRating}
      </p>

      <p className="mb-4">
        Géneros: {movie.category?.join(", ")}
      </p>

      {trailer ? (
        <iframe
          width="560"
          height="315"
          src={trailer.replace("watch?v=", "embed/")}
          title="Trailer"
          allowFullScreen
        />
      ) : (
        <p>No hay trailer disponible</p>
      )}
    </div>
  );
}