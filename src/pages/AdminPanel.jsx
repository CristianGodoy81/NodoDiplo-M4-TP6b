import { useState } from "react";
import { api } from "../api/api";
import { useNavigate } from "react-router-dom";

export default function AdminPanel() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleImportMovies = async () => {
    setLoading(true);
    try {
      // Usaremos el endpoint que definiste en tu README de Backend
      const res = await api.post("/movies/import");
      alert(`¡Éxito! Se importaron las películas correctamente.`);
    } catch (error) {
      console.error(error);
      alert("Error al importar. ¿Tenés rol de Admin validado?");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-8 max-w-2xl mx-auto mt-10 shadow-lg border rounded-lg">
      <h1 className="text-3xl font-bold mb-6">Panel de Administración</h1>
      
      <p className="mb-6 text-gray-600">
        Desde acá podés conectarte con recursos externos para llenar tu base de datos de películas inicial.
      </p>

      <button
        onClick={handleImportMovies}
        disabled={loading}
        className="bg-purple-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-purple-700 disabled:opacity-50"
      >
        {loading ? "Importando..." : "Importar Películas Básicas (Seed)"}
      </button>

      <div className="mt-8">
        <button onClick={() => navigate("/profiles")} className="text-blue-500 underline">
          Volver a perfiles
        </button>
      </div>
    </div>
  );
}