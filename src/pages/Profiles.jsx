import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../api/api";
import { ProfileContext } from "../context/ProfileContext";

export default function Profiles() {
  const [profiles, setProfiles] = useState([]);
  const [newProfileName, setNewProfileName] = useState("");
  const [isKid, setIsKid] = useState(false);
  
  const navigate = useNavigate();
  const { selectProfile } = useContext(ProfileContext);

  const fetchProfiles = async () => {
    try {
      const res = await api.get("/profiles");
      setProfiles(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchProfiles();
  }, []);

  const handleSelect = (profile) => {
    selectProfile(profile);
    navigate("/home");
  };

  const handleCreateProfile = async (e) => {
    e.preventDefault();
    try {
      await api.post("/profiles", { name: newProfileName, isKid });
      setNewProfileName("");
      setIsKid(false);
      fetchProfiles(); // recargamos la lista
    } catch (error) {
      console.log(error);
      alert("Error al crear el perfil");
    }
  };

  // Función para dar un color de gradiente distinto a cada perfil según su índice
  const getGradient = (index) => {
    const gradients = [
      "from-blue-500 to-purple-600",
      "from-emerald-400 to-teal-600",
      "from-pink-500 to-rose-500",
      "from-orange-400 to-red-500",
      "from-indigo-500 to-cyan-500"
    ];
    return gradients[index % gradients.length];
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center p-6">
      <div className="max-w-4xl w-full flex flex-col items-center">
        
        <h1 className="text-4xl md:text-5xl mb-12 font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-gray-100 to-gray-400">
          ¿Quién está viendo?
        </h1>

        <div className="flex gap-8 mb-16 flex-wrap justify-center">
          {profiles.map((p, index) => (
            <div
              key={p._id}
              onClick={() => handleSelect(p)}
              className="group cursor-pointer flex flex-col items-center transition-all transform hover:scale-105"
            >
              <div className={`w-32 h-32 md:w-40 md:h-40 rounded-2xl mb-4 flex items-center justify-center text-6xl shadow-xl bg-gradient-to-tr ${getGradient(index)} ring-4 ring-transparent group-hover:ring-white transition-all overflow-hidden relative`}>
                <span className="font-bold text-white relative z-10 drop-shadow-md">
                  {p.name.charAt(0).toUpperCase()}
                </span>
                {/* Superposición oscura sutil */}
                <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors"></div>
              </div>
              
              <p className="font-medium text-xl text-gray-300 group-hover:text-white transition-colors">
                {p.name}
              </p>
              <p className="text-sm font-semibold text-gray-500 mt-1 uppercase tracking-wider">
                {p.isKid ? "Infantil" : "Adulto"}
              </p>
            </div>
          ))}

          {profiles.length === 0 && (
            <div className="text-center w-full my-8">
              <p className="text-xl text-gray-400">No tienes perfiles creados.</p>
              <p className="text-gray-500 mt-2">¡Comienza creando uno abajo!</p>
            </div>
          )}
        </div>

        {/* Separador */}
        <div className="w-full max-w-md border-t border-gray-800 mb-12"></div>

        {/* Formulario para Crear Perfil en estilo oscuro */}
        <div className="w-full max-w-md bg-gray-800/50 backdrop-blur border border-gray-700 p-8 rounded-2xl shadow-2xl">
          <h2 className="text-2xl font-semibold mb-6 flex items-center gap-2 text-gray-200">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6 text-blue-400">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
            </svg>
            Agregar Nuevo Perfil
          </h2>
          
          <form onSubmit={handleCreateProfile} className="flex flex-col gap-5">
            <div>
              <input
                className="w-full px-4 py-3 bg-gray-900 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                placeholder="Nombre del perfil (ej: Papá, Juan)"
                value={newProfileName}
                onChange={(e) => setNewProfileName(e.target.value)}
                required
              />
            </div>
            
            <label className="flex items-center gap-3 cursor-pointer p-3 rounded-lg border border-gray-700 bg-gray-900/50 hover:bg-gray-800 transition-colors">
              <div className="relative flex items-center p-1 cursor-pointer">
                <input
                  type="checkbox"
                  className="w-5 h-5 accent-blue-500 bg-gray-700 border-gray-600 rounded focus:ring-blue-600 focus:ring-2 cursor-pointer"
                  checked={isKid}
                  onChange={(e) => setIsKid(e.target.checked)}
                />
              </div>
              <div className="flex flex-col">
                <span className="text-gray-300 font-medium">Perfil Kids (Infantil)</span>
                <span className="text-xs text-gray-500">Restringe contenidos mayores de 13 años</span>
              </div>
            </label>

            <button 
              type="submit" 
              className="mt-2 w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-3 rounded-lg shadow-lg hover:shadow-blue-500/30 transition-all font-medium border border-blue-500/50"
            >
              Crear Perfil
            </button>
          </form>
        </div>

      </div>
    </div>
  );
}