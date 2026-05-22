import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../api/api";
import { AuthContext } from "../context/AuthContext";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await api.post("/auth/login", {
        email,
        password
      });

      login(res.data);

      navigate("/profiles");
    } catch (error) {
      console.log(error.response?.data || error.message);
      alert("Error en login");
    }
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <form onSubmit={handleSubmit} className="p-6 border rounded w-80">
        <h1 className="text-xl mb-4">Login</h1>

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

        <button className="bg-blue-500 text-white w-full p-2">
          Login
        </button>
      </form>
    </div>
  );
}