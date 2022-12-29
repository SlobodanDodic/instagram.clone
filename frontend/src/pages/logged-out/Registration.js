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

const initialState = { username: '', email: '', password: '', confirmPassword: '' }

export default function Registration() {
  const { isLoading, setIsLoading, instance } = useContext(AuthContext);
  const [form, setForm] = useState(initialState);
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useToggle(true)

  const signUpText = 'Sign up to see photos and videos from your friends.'
  const regInputs = [
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
      name: "email",
      type: "email",
      placeholder: "Email",
      errorMessage: "It should be a valid email address!",
      required: true,
    },
    {
      id: 3,
      name: "password",
      type: "password",
      placeholder: "Password",
      errorMessage: "Password should be 8-20 characters and include at least 1 letter, 1 number and 1 special character!",
      pattern: `^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,20}$`,
      required: true,
    },
    {
      id: 4,
      name: "confirmPassword",
      type: "password",
      placeholder: "Confirm Password",
      errorMessage: "Passwords don't match!",
      pattern: form.password,
      required: true,
    },
  ];

  const onChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    instance
      .post("auth/signup", form)
      .then((res) => {
        setForm(res);
        console.log(res.data);
        toast.success('Successfully registered! Please check for conformation email and then log in... 👀', { autoClose: 5000 });
        navigate('/')
      })
      .catch((err) => {
        if (err) {
          toast.error('Email or Username already exists!')
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
              {regInputs.map((input) => (
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