import { useContext, useState } from 'react';
import AuthContext from '../../context/AuthContext';
import useToggle from '../../hooks/useToggle';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import AccountInput from '../../components/Form/AccountInput';
import Spinner from '../../components/Spinner';
import { toast } from "react-toastify";

const initialState = { username: '', email: '', password: '', confirmPassword: '' }

export default function AccountPage() {
  const { setUser, instance, isLoading, setIsLoading, setDeleteModal, loggedUser, token } = useContext(AuthContext);
  const [form, setForm] = useState(initialState);
  const [showPassword, setShowPassword] = useToggle(true)

  const regInputs = [
    {
      id: 1,
      name: "username",
      type: "text",
      placeholder: loggedUser?.username,
      errorMessage: "Username should be 3-16 characters and shouldn't include any special character!",
      pattern: "^[A-Za-z0-9]{3,16}$",
      required: true,
    },
    {
      id: 2,
      name: "email",
      type: "email",
      placeholder: loggedUser?.email,
      errorMessage: "It should be a valid email address!",
      required: true,
    },
    {
      id: 3,
      name: "password",
      type: "password",
      placeholder: "New Password",
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
      .patch("auth/updateAccount/" + token, form)
      .then((res) => {
        setForm(res);
        toast.success('Account was successfully updated and confirmation email was sent! 📧', { autoClose: 5000 });
        setForm(initialState);
        setUser(null);
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
    <div className="flex flex-col items-center pb-3 m-3 text-xs">

      <div className="relative flex flex-col items-center justify-center w-full p-4 shadow-md md:w-96">
        <div className="flex items-center justify-center w-full py-3 text-sm text-white bg-blue-500 rounded-t">Edit your account</div>

        <div className="flex flex-col items-center justify-center w-full pt-5 text-xs text-center text-red-500 shadow-inner">
          <h1 className='font-bold'>Warning!</h1>
          <h1 className='px-4 pt-2 italic'>After the submit click, you will be logged out and the email will have to be confirmed again.</h1>
        </div>

        <form onSubmit={handleSubmit} className="w-screen md:w-full">
          {regInputs.map((input) => (
            <AccountInput key={input.id} {...input} onChange={onChange} show={showPassword} />
          ))}
          <div className='flex mx-auto w-28'><button className='my-4 bg-blue-500 btn-add'> Submit </button></div>
        </form>

        <button onClick={setShowPassword} className='absolute text-xs font-bold right-11 bottom-24'>{showPassword ? <FaEye className="eyeStyleAccount" /> : <FaEyeSlash className="eyeStyleAccount" />}</button>
      </div>

      <div className="relative flex flex-col items-center justify-center w-full p-4 shadow-md md:w-96">
        {/* <div className="flex items-center justify-center w-full py-3 text-sm text-blue-500 rounded-t">Delete your account?</div> */}
        <h2 className="flex items-center justify-center w-full py-3 text-sm text-blue-500 rounded-t">Delete your account?</h2>
        <div className='flex mx-auto mt-4 w-44'>
          <button className='my-4 bg-red-500 btn-add' onClick={setDeleteModal}>Delete</button>
        </div>
      </div>


    </div>

  )
}