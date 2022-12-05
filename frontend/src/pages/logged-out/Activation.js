import { useContext } from "react";
import AuthContext from "../../context/AuthContext";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import axios from 'axios';
import Spinner from '../../components/Spinner';
import { BsCheck2Circle } from 'react-icons/bs';

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
    <div className="flex items-center justify-center w-screen h-screen">
      <div className="flex flex-col items-center justify-center w-screen mb-24">
        <BsCheck2Circle className="text-blue-600 w-28 h-28" />
        <h1 className="my-5 text-3xl text-blue-600">Your mail is now active! </h1>
        <button className="w-auto font-bold tracking-wider bg-blue-600 btn-add" onClick={handleSubmit}>LOGIN PAGE</button>
      </div>
    </div>
  )
}
