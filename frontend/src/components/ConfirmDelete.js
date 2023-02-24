import { useContext } from 'react';
import AuthContext from '../context/AuthContext';
import ToggleContext from '../context/ToggleContext';
import { IoMdClose } from 'react-icons/io';
import { Spinner } from './Spinner';
import { toast } from "react-toastify";
import { useMutation } from '@tanstack/react-query';
import deadpool from '../assets/deadpool.png'

export default function ConfirmDelete() {
  const { setUser, instance } = useContext(AuthContext);
  const { deleteModal, setDeleteModal } = useContext(ToggleContext);

  const deleteAxios = async (data) => {
    const res = await instance.delete(`auth/updateAccount`)
    return res.data
  }

  const { isLoading, mutate: confirmDelete } = useMutation(deleteAxios, {
    onError: (err) => toast.success("Error: ", err),
    onSuccess: (res) => {
      toast.success('Account was successfully deleted!', { autoClose: 5000 });
      setUser(null);
      setDeleteModal()
    }
  })

  const deleteAccount = (e) => {
    e.preventDefault();
    confirmDelete()
  }

  const cleanAndExit = () => { setDeleteModal() }

  if (isLoading) return <Spinner />;

  return (
    <div className={deleteModal ? 'absolute z-50' : 'hidden'}>
      <div className="flex items-center justify-center w-screen h-screen p-3 bg-black/70 md:p-10">
        <div className="relative w-full max-w-screen-lg bg-white rounded-lg shadow h-3/5">

          <div className="flex items-center justify-center py-2 text-sm font-medium border-b border-gray-400 rounded-t">Delete your account?<IoMdClose onClick={cleanAndExit} className='absolute top-2 right-2 hover:cursor-pointer' /></div>

          <div className="flex flex-col items-center justify-center text-sm h-5/6">
            <img src={deadpool} alt="deadpool" className='h-1/2' />
            <p className="pt-4 font-medium text-blue-500">We love you!</p>
            <p className="py-1 font-medium text-red-500">Are you sure you wanna leave us?</p>

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