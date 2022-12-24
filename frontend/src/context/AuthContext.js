import { createContext, useEffect, useState } from "react";
import useToggle from "../hooks/useToggle";
import axios from 'axios';

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const stored = localStorage.getItem("logged-user");
    const initialValue = JSON.parse(stored);
    return initialValue || null;
  })
  const [isLoading, setIsLoading] = useState(false)
  const [loggedUser, setLoggedUser] = useState({});
  const [token, setToken] = useState('')

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

  useEffect(() => {
    if (user) {
      instance
        .get("users/me/" + user)
        .then((res) => {
          setLoggedUser(res.data?.user);
          setToken(res.data?.user?.token);
        })
        .catch((err) => {
          console.error(err);
        });
    }
    // eslint-disable-next-line
  }, [user])

  return (
    <AuthContext.Provider
      value={{
        instance,
        user, setUser,
        token, setToken,
        isLoading, setIsLoading,
        loggedUser, setLoggedUser,
        postCountToggle, setPostCountToggle, followingToggle, setFollowingToggle, followersToggle, setFollowersToggle,
        postModal, setPostModal, searchModal, setSearchModal, deleteModal, setDeleteModal,
      }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;