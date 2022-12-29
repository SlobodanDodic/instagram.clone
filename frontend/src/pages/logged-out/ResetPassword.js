import { useContext, useState } from "react";
import AuthContext from "../../context/AuthContext";
import FormInput from "../../components/Form/FormInput";
import logScreen from '../../assets/logScreen.png'
import logoText from '../../assets/logoText.png'
import Bottom from "../../components/Form/Bottom";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import { Spinner } from "../../components/Spinner";

export default function ResetPassword() {
  const { isLoading, setIsLoading, instance } = useContext(AuthContext);
  const [form, setForm] = useState({ password: '', confirmPassword: '' });
  const signUpText = 'Login with new passport.'
  const navigate = useNavigate();
  const { token } = useParams();

  const loginInputs = [
    {
      id: 1,
      name: "password",
      type: "password",
      placeholder: "New Password",
      errorMessage: "Password should be 8-20 characters and include at least 1 letter, 1 number and 1 special character!",
      pattern: `^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,20}$`,
      required: true,
    },
    {
      id: 2,
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

  const handleSubmit = () => {
    setIsLoading(true);
    instance
      .patch("auth/resetPassword/" + token, { password: form.password })
      .then((res) => {
        toast.success('Password successfully changed. Please login!');
        navigate('/login')
      })
      .catch((err) => {
        if (err) {
          toast.error('Response - ' + err)
          console.log('Response - ' + err);
          console.log(err.response.data.message);
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
      <div className="flex flex-col items-center justify-center w-96 md:mr-3">
        <img src={logScreen} alt="logoScreen" />
      </div>

      <div className="flex flex-col">
        <div className="flex flex-col p-4 bg-white border border-gray-300 border-solid shadow">
          <img src={logoText} alt="logoText" className='w-32 pt-5 mx-auto' />
          <div className="flex flex-col items-center justify-center p-5">

            <form onSubmit={handleSubmit}>
              {loginInputs.map((input) => (
                <FormInput key={input.id} {...input} onChange={onChange} />
              ))}
              <button className="bg-blue-500 btn-add">Submit</button>
            </form>

          </div>
        </div>

        <Bottom signUpText={signUpText} />
      </div>
    </div>
  )
}