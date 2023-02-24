import { useContext } from "react";
import AuthContext from "../../context/AuthContext";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { Spinner } from '../../components/Spinner';
import { BsCheck2Circle } from 'react-icons/bs';
import { useMutation } from "@tanstack/react-query";

export default function Activation() {
  const { instance } = useContext(AuthContext);
  const navigate = useNavigate();
  const { token } = useParams();

  const activationAxios = async (data) => {
    const res = await instance.patch(`auth/activate/${token}`, data)
    return res.data
  }

  const { isLoading, mutate: activation } = useMutation(activationAxios, {
    onError: (err) => toast.success("Error: ", err),
    onSuccess: (res) => {
      toast.success('Successfully activated!');
      navigate('/login')
    }
  })

  const handleSubmit = (e) => {
    e.preventDefault();
    activation({ isActivated: true })
  }

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
