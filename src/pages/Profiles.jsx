import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../api/api";
import { ProfileContext } from "../context/ProfileContext";

export default function Profiles() {
  const [profiles, setProfiles] = useState([]);
  const navigate = useNavigate();

  const { selectProfile } = useContext(ProfileContext);

  useEffect(() => {
    const fetchProfiles = async () => {
      try {
        const res = await api.get("/profiles");
        setProfiles(res.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchProfiles();
  }, []);

  const handleSelect = (profile) => {
    selectProfile(profile);
    navigate("/home");
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl mb-6">¿Quién está viendo?</h1>

      <div className="flex gap-4">
        {profiles.map((p) => (
          <div
            key={p._id}
            onClick={() => handleSelect(p)}
            className="cursor-pointer border p-4 rounded"
          >
            <p>{p.name}</p>
            <p className="text-sm text-gray-500">
              {p.isKid ? "Niño" : "Adulto"}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}