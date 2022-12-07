import { useContext } from 'react';
import AuthContext from '../context/AuthContext';
import { IoMdClose } from 'react-icons/io';
import Spinner from './Spinner';
import { toast } from "react-toastify";
import deadpool from '../assets/deadpool.png'

export default function ConfirmDelete() {
  const { user, setUser, instance, deleteModal, setDeleteModal, isLoading, setIsLoading } = useContext(AuthContext);

  const deleteAccount = (e) => {
    e.preventDefault();
    setIsLoading(true);
    instance
      .delete("auth/updateAccount/" + user)
      .then((res) => {
        toast.success('Account was successfully deleted!', { autoClose: 5000 });
        setUser('');
        setDeleteModal()
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

  const cleanAndExit = () => { setDeleteModal() }

  if (isLoading) return <Spinner />;

  return (
    <div className={deleteModal ? 'absolute z-50' : 'hidden'}>
      <div className="flex items-center justify-center w-screen h-screen p-3 bg-black/70 md:p-10">
        <div className="relative w-full max-w-screen-lg bg-white rounded-lg shadow h-3/5">

          <div className="flex items-center justify-center py-2 text-sm font-bold border-b border-gray-400 rounded-t">Delete your account?<IoMdClose onClick={cleanAndExit} className='absolute top-2 right-2 hover:cursor-pointer' /></div>

          <div className="flex flex-col items-center justify-center text-sm h-5/6">
            <img src={deadpool} alt="deadpool" className='h-1/2' />
            <p className="pt-4 font-bold text-blue-500">We love you!</p>
            <p className="py-1 font-bold text-red-500">Are you sure you wanna leave us?</p>

            <div className='flex mx-auto mt-4'>
              <button className='flex my-4 mr-3 bg-blue-500 btn-add' onClick={cleanAndExit}>Nope!</button>
              <button className='flex my-4 bg-red-500 btn-add' onClick={deleteAccount}>Yeah!</button>
            </div>
          </div>

        </div>
      </div>
    </div>

  )
}