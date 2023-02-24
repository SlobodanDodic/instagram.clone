import { useContext, useState } from 'react';
import AuthContext from '../../context/AuthContext';
import useToggle from '../../hooks/useToggle';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import AccountInput from '../../components/Form/AccountInput';
import { Spinner } from '../../components/Spinner';
import { toast } from "react-toastify";
import { accountInputs } from '../../components/Form/Inputs';
import { useMutation } from '@tanstack/react-query';
import ToggleContext from '../../context/ToggleContext';

const initialState = { username: '', email: '', password: '', confirmPassword: '' }

export default function AccountPage() {
  const { setUser, instance, loggedUser, token } = useContext(AuthContext);
  const { setDeleteModal } = useContext(ToggleContext);
  const [form, setForm] = useState(initialState);
  const [showPassword, setShowPassword] = useToggle(true)

  const updateAxios = async (data) => {
    const res = await instance.patch(`auth/updateAccount/${token}`, form)
    return res.data
  }

  const { isLoading, mutate: update } = useMutation(updateAxios, {
    onError: (err) => toast.success("Error: ", err),
    onSuccess: (res) => {
      setForm(res);
      toast.success('Account was successfully updated and confirmation email was sent! 📧', { autoClose: 5000 });
      setUser(null);
    }
  })

  const handleSubmit = (e) => {
    e.preventDefault();
    update(form)
  }

  const onChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
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
          {accountInputs(loggedUser, form).map((input) => (
            <AccountInput key={input.id} {...input} onChange={onChange} show={showPassword} />
          ))}
          <div className='flex mx-auto w-28'><button className='my-4 bg-blue-500 btn-add'> Submit </button></div>
        </form>

        <button onClick={setShowPassword} className='absolute text-xs font-bold right-11 bottom-24'>{showPassword ? <FaEye className="eyeStyleAccount" /> : <FaEyeSlash className="eyeStyleAccount" />}</button>
      </div>

      <div className="relative flex flex-col items-center justify-center w-full p-4 shadow-md md:w-96">
        <h2 className="flex items-center justify-center w-full py-3 text-sm text-blue-500 rounded-t">Delete your account?</h2>
        <div className='flex mx-auto mt-4 w-44'>
          <button className='my-4 bg-red-500 btn-add' onClick={setDeleteModal}>Delete</button>
        </div>
      </div>


    </div>

  )
}