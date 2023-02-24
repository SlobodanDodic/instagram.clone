import axios from "axios";

// export const instance = axios.create({
//   withCredentials: true,
//   baseURL: process.env.REACT_APP_SERVER,
//   headers: {
//     'Authorization': `Bearer ${user ? token : ''}`,
//     'Access-Control-Allow-Origin': '*',
//     'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
//     'Content-Type': 'application/x-www-form-urlencoded'
//   }
// });

export const getLoogedUser = async (token) => {
  const instance = axios.create({
    withCredentials: true,
    baseURL: `${process.env.REACT_APP_SERVER}/`,
    headers: {
      'Authorization': `Bearer ${token}`,
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  });

  const response = await instance.get(`/users/me`);

  if (!response.ok) {
    throw new Error("Something went wrong.");
  }

  return response.data;
};

// 
