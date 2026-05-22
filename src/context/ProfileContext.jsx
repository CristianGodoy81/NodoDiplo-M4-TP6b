import { createContext, useState } from "react";

export const ProfileContext = createContext();

export const ProfileProvider = ({ children }) => {
  const [profile, setProfile] = useState(
    JSON.parse(localStorage.getItem("profile"))
  );

  const selectProfile = (p) => {
    setProfile(p);
    localStorage.setItem("profile", JSON.stringify(p));
  };

  const clearProfile = () => {
    setProfile(null);
    localStorage.removeItem("profile");
  };

  return (
    <ProfileContext.Provider value={{ profile, selectProfile, clearProfile }}>
      {children}
    </ProfileContext.Provider>
  );
};