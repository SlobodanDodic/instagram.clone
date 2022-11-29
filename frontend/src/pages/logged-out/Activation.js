import { useContext } from "react";
import AuthContext from "../../context/AuthContext";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import axios from 'axios';
import Spinner from '../../components/Spinner';

export default function Activation() {
  const { isLoading, setIsLoading } = useContext(AuthContext);
  const isActivated = true;
  const navigate = useNavigate();
  const { username } = useParams();

  const instance = axios.create({
    baseURL: "http://localhost:5000/auth/",
    withCredentials: false,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
    }
  });

  const handleSubmit = () => {
    setIsLoading(true);
    instance
      .patch("active/" + username, { isActivated })
      .then((res) => {
        console.log(res);
        toast.success('Successfully activated!');
        navigate('/login')
      })
      .catch((err) => {
        if (err) {
          toast.error('Response - ' + err)
          console.log('Response - ' + err);
        } else if (err.request) {
          toast.error('Request - ' + err.request)
          console.log('Request - ' + err.request);
        } else {
          toast.error('Error - ' + err.errorMessage)
          console.log('Error - ' + err);
        }
      })
      .finally(() => setIsLoading(false));
  };

  if (isLoading) return <Spinner />;

  return (
    <div>
      <button onClick={handleSubmit}>Your mail is now active! Please click to SIGN IN from login page...</button>
    </div>
  )
}
