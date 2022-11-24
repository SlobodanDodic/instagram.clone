import { createContext, useEffect, useState } from "react";
import useToggle from "../hooks/useToggle";

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const stored = localStorage.getItem("logged-user");
    const initialValue = JSON.parse(stored);
    return initialValue || "";
  })
  const [isLoading, setIsLoading] = useState(false)

  const [postModal, setPostModal] = useToggle(false)
  const [searchModal, setSearchModal] = useToggle(false)

  useEffect(() => {
    localStorage.setItem('logged-user', JSON.stringify(user));
  }, [user]);

  return (
    <AuthContext.Provider
      value={{ user, setUser, postModal, setPostModal, searchModal, setSearchModal, isLoading, setIsLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;