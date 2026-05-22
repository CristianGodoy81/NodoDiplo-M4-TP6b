import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Profiles from "../pages/Profiles";
import Home from "../pages/Home";
import MovieDetail from "../pages/MovieDetail";
import Watchlist from "../pages/Watchlist";

export default function AppRouter() {
  const isAuth = !!localStorage.getItem("token");
  
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/profiles" element={isAuth ? <Profiles /> : <Navigate to="/login" />} />
        <Route path="/home" element={isAuth ? <Home /> : <Navigate to="/login" />} />
        <Route path="/movie/:id" element={isAuth ? <MovieDetail /> : <Navigate to="/login" />} />
        <Route path="/watchlist" element={isAuth ? <Watchlist /> : <Navigate to="/login" />} />
      </Routes>
    </BrowserRouter>
  );
}