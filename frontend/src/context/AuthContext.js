import { createContext, useEffect, useState } from "react";

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const stored = localStorage.getItem("logged-user");
    const initialValue = JSON.parse(stored);
    return initialValue || "";
  })

  useEffect(() => {
    localStorage.setItem('logged-user', JSON.stringify(user));
  }, [user]);

  return (
    <AuthContext.Provider
      value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;