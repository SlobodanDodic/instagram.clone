import { createContext, useEffect, useState } from "react";
import useToggle from "../hooks/useToggle";
import axios from 'axios';

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
  const [deleteModal, setDeleteModal] = useToggle(false)

  useEffect(() => {
    localStorage.setItem('logged-user', JSON.stringify(user));
  }, [user]);

  const instance = axios.create({
    withCredentials: true,
    baseURL: "http://localhost:5000/",
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  });

  return (
    <AuthContext.Provider
      value={{ user, setUser, postModal, setPostModal, searchModal, setSearchModal, deleteModal, setDeleteModal, isLoading, setIsLoading, instance }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;