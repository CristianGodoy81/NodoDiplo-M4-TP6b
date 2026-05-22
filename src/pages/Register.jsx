import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../api/api";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await api.post("/auth/register", {
        email,
        password
      });

      navigate("/login");
    } catch (error) {
      alert("Error en registro");
    }
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <form onSubmit={handleSubmit} className="p-6 border rounded w-80">
        <h1 className="text-xl mb-4">Register</h1>

        <input
          className="border p-2 w-full mb-2"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          className="border p-2 w-full mb-4"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button className="bg-green-500 text-white w-full p-2">
          Register
        </button>
      </form>
    </div>
  );
}