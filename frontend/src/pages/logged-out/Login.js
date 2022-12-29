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

const loginInputs = [
  {
    id: 1,
    name: "username",
    type: "text",
    placeholder: "Username",
    errorMessage: "Username should be 3-16 characters and shouldn't include any special character!",
    pattern: "^[A-Za-z0-9]{3,16}$",
    required: true,
  },
  {
    id: 2,
    name: "password",
    type: "password",
    placeholder: "Password",
    errorMessage: "Password should be 8-20 characters and include at least 1 uppercase letter, 1 number and 1 special character!",
    pattern: `^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,20}$`,
    required: true,
  },
];

const initialState = { username: '', password: '' }

export default function Login() {
  const { setUser, isLoading, setIsLoading, instance } = useContext(AuthContext);

  const [form, setForm] = useState(initialState);
  const [showPassword, setShowPassword] = useToggle(true)
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    instance
      .post("auth/signin", form)
      .then((res) => {
        setUser(form.username);
        toast.success('Successfully logged!');
        navigate('/')
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

  const onChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  if (isLoading) return <Spinner />;

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