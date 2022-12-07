import { useContext, useState } from "react";
import AuthContext from "../../context/AuthContext";
import FormInput from "../../components/Form/FormInput";
import logScreen from '../../assets/logScreen.png'
import logoText from '../../assets/logoText.png'
import Bottom from "../../components/Form/Bottom";
import Spinner from "../../components/Spinner";
import { toast } from "react-toastify";

const loginInputs = [
  {
    id: 1,
    name: "email",
    type: "email",
    placeholder: "Email",
    errorMessage: "It should be a valid email address!",
    required: true,
  },
];

export default function ForgotPassword() {
  const [form, setForm] = useState({ email: '' });
  const { isLoading, setIsLoading, instance } = useContext(AuthContext);

  const onChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    instance
      .post("auth/forgotPassword", form)
      .then((res) => {
        setForm(res);
        toast.success('Please check for email and then follow the link... 👀', { autoClose: 5000 });
        setForm({ email: '' })
      })
      .catch((err) => {
        if (err) {
          toast.error('Email already exists!')
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

        <Bottom />
      </div>
    </div>
  )
}