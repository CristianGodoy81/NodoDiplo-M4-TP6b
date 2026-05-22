import React from "react";
import ReactDOM from "react-dom/client";
import AppRouter from "./routes/AppRouter";
import "./index.css";
import { AuthProvider } from "./context/AuthContext";
import { ProfileProvider } from "./context/ProfileContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <AuthProvider>
    <ProfileProvider>
      <AppRouter />
    </ProfileProvider>
  </AuthProvider>
);