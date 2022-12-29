import { createContext, useEffect, useState } from "react";
import useToggle from "../hooks/useToggle";
import { useQuery } from "@tanstack/react-query";
import axios from 'axios';

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const stored = localStorage.getItem("logged-user");
    const initialValue = JSON.parse(stored);
    return initialValue || null;
  })
  const [isLoading, setIsLoading] = useState(false)

  const [postModal, setPostModal] = useToggle(false)
  const [searchModal, setSearchModal] = useToggle(false)
  const [deleteModal, setDeleteModal] = useToggle(false)
  const [postCountToggle, setPostCountToggle] = useToggle(true);
  const [followingToggle, setFollowingToggle] = useToggle(false);
  const [followersToggle, setFollowersToggle] = useToggle(false);

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

  const getLoogedUser = async () => {
    const data = await instance.get(`/users/me/${user}`);
    return data.data;
  }

  const { data } = useQuery(['loggedUser'], () => getLoogedUser())
  const loggedUser = (data?.user);
  const token = (data?.user?.token);

  return (
    <AuthContext.Provider
      value={{
        instance, token, user, setUser, loggedUser,
        isLoading, setIsLoading,
        postCountToggle, setPostCountToggle, followingToggle, setFollowingToggle, followersToggle, setFollowersToggle,
        postModal, setPostModal, searchModal, setSearchModal, deleteModal, setDeleteModal,
      }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;