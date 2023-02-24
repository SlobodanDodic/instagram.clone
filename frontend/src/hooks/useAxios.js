import axios from "axios";

const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIzZTgwMTE2MC0wMjdlLTRkNDUtODY0MS0xOGVmNTEwODRkNjYiLCJlbWFpbCI6InNsb2JvZGFuZG9kaWNAeWFob28uY29tIiwiaWF0IjoxNjc1OTQ0ODA2LCJleHAiOjE2NzY1NDk2MDZ9.zlLGrvi_-7gQRJSRdp_gj30XkWHZDFzFg4tNntRXs8E'

export default axios.create({
  withCredentials: true,
  baseURL: `${process.env.REACT_APP_SERVER}/`,
  headers: {
    'Authorization': `Bearer ${token}`,
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
    'Content-Type': 'application/x-www-form-urlencoded'
  }
});
