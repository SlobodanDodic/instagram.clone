import { useContext, useState } from "react";
import AuthContext from "../../context/AuthContext";
import useToggle from "../../hooks/useToggle";
import { Link, useNavigate } from "react-router-dom";
import FormInput from "../../components/Form/FormInput";
import logScreen from '../../assets/logScreen.png'
import logoText from '../../assets/logoText.png'
import Bottom from "../../components/Form/Bottom";
import { toast } from "react-toastify";
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { Spinner } from "../../components/Spinner";
import { useMutation } from "@tanstack/react-query";
import { loginInputs } from "../../components/Form/Inputs";

const initialState = { username: '', password: '' }

export default function Login() {
  const { instance, setToken, setUser } = useContext(AuthContext);
  const [form, setForm] = useState(initialState);
  const [showPassword, setShowPassword] = useToggle(true)
  const navigate = useNavigate();

  const loginAxios = async (data) => {
    const res = await instance.post('auth/signin', data)
    return res.data
  }

  const { isLoading, mutate: login } = useMutation(loginAxios, {
    onError: (err) => toast.success("Error: ", err),
    onSuccess: (res) => {
      setUser(res?.loggedUser);
      setToken(res?.refreshToken);
      toast.success('Successfully logged!');
      navigate('/')
    }
  })

  const handleSubmit = (e) => {
    e.preventDefault();
    login(form)
  }

  const onChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  if (isLoading) return <Spinner />

  return (
    <div className="flex flex-col items-center justify-center w-screen md:h-screen md:flex-row">
      <div className="flex flex-col items-center justify-center md:mr-3">
        <img src={logScreen} alt="logoScreen" />
      </div>

      <div className="flex flex-col">
        <div className="flex flex-col px-12 py-10 bg-white border border-gray-300 border-solid rounded shadow">

          <img src={logoText} alt="logoText" className='w-32 pb-5 mx-auto' />

          <div className="relative flex flex-col items-center justify-center">
            <form onSubmit={handleSubmit} className="w-full">
              {loginInputs.map((input) => (
                <FormInput key={input.id} {...input} onChange={onChange} show={showPassword} />
              ))}
              <button className="bg-blue-500 btn-add">Log In</button>
            </form>

            <button onClick={setShowPassword} className='absolute text-xs font-bold right-5 bottom-32'>{showPassword ? <FaEye className="eyeStyle" /> : <FaEyeSlash className="eyeStyle" />}</button>

            <Link to='/forgot-password' className='text-center text-blue-900 mt-7'>Forgot password?</Link>
          </div>

        </div>

        <Bottom />
      </div>
    </div>
  );
}