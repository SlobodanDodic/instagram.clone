import { useContext, useState } from "react";
import AuthContext from "../../context/AuthContext";
import useToggle from "../../hooks/useToggle";
import { useNavigate } from "react-router-dom";
import FormInput from "../../components/Form/FormInput";
import logScreen from '../../assets/logScreen.png'
import logoText from '../../assets/logoText.png'
import Bottom from "../../components/Form/Bottom";
import { toast } from "react-toastify";
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { Spinner } from "../../components/Spinner";
import { useMutation } from "@tanstack/react-query";
import { regInputs } from "../../components/Form/Inputs";

const initialState = { username: '', email: '', password: '', confirmPassword: '' }

export default function Registration() {
  const { instance } = useContext(AuthContext);
  const [form, setForm] = useState(initialState);
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useToggle(true)

  const signUpText = 'Sign up to see photos and videos from your friends.'

  const onChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const registerAxios = async (data) => {
    const res = await instance.post('auth/signup', data)
    return res.data
  }

  const { isLoading, mutate: register } = useMutation(registerAxios, {
    onError: (err) => toast.success("Error: ", err),
    onSuccess: (res) => {
      setForm(res);
      toast.success('Successfully registered! Please check for conformation email and then log in... 👀', { autoClose: 5000 });
      navigate('/')
    }
  })

  const handleSubmit = (e) => {
    e.preventDefault();
    register(form)
  }

  if (isLoading) return <Spinner />;

  return (
    <div className="flex flex-col items-center justify-center w-screen md:h-screen md:flex-row">
      <div className="flex flex-col items-center justify-center md:mr-3">
        <img src={logScreen} alt="logoScreen" />
      </div>

      <div className="flex flex-col">
        <div className="flex flex-col px-12 py-10 bg-white border border-gray-300 border-solid rounded shadow">

          <img src={logoText} alt="logoText" className='w-32 pb-5 mx-auto' />
          <p className='my-5 text-xs font-bold text-center text-gray-700'>{signUpText}</p>

          <div className="relative flex flex-col items-center justify-center">
            <form onSubmit={handleSubmit} className="w-full">
              {regInputs(form).map((input) => (
                <FormInput key={input.id} {...input} onChange={onChange} show={showPassword} />
              ))}
              <button className="bg-blue-500 btn-add">Register</button>
            </form>

            <button onClick={setShowPassword} className='absolute text-xs font-bold right-5 bottom-20'>{showPassword ? <FaEye className="eyeStyle" /> : <FaEyeSlash className="eyeStyle" />}</button>
          </div>

        </div>
        <Bottom signUpText={signUpText} />
      </div>
    </div>
  );
}