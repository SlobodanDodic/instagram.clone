import { createContext } from "react";
import useLocalStorage from "../hooks/useLocalStorage";
import { useQuery } from "@tanstack/react-query";
import { ErrorInfo, Spinner } from "../components/Spinner";
import axios from "axios";

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useLocalStorage('user', null)
  const [token, setToken] = useLocalStorage('token', null)

  const instance = axios.create({
    withCredentials: true,
    baseURL: `${process.env.REACT_APP_SERVER}/`,
    headers: {
      'Authorization': `Bearer ${user ? token : ''}`,
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  });

  const getLoogedUser = async () => {
    if (!!user) {
      const data = await instance.get(`/users/me`);
      return data.data;
    } else {
      return null
    }
  }

  const { data: loggedUser, isLoading, isError, error } = useQuery(['getLoogedUser'], () => getLoogedUser())

  if (isLoading) return <Spinner />
  if (isError) return <ErrorInfo error={error} />

  return (
    <AuthContext.Provider
      value={{ user, setUser, token, setToken, instance, loggedUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;