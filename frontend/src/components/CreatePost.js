import { useContext } from 'react';
import AuthContext from '../context/AuthContext';
import { IoMdClose } from 'react-icons/io';
import media from '../assets/media.png'

export default function CreatePost() {
  const { postModal, setPostModal } = useContext(AuthContext);

  function uploadFile() { }

  const cleanAndExit = () => { setPostModal() }

  return (
    <div className={postModal ? 'absolute z-50' : 'hidden'}>
      <div className="flex items-center justify-center w-screen h-screen p-3 bg-black/70 md:p-10">
        <div className="relative w-full max-w-screen-lg bg-white rounded-lg shadow h-3/5">

          <div className="flex items-center justify-center py-2 text-sm border-b border-gray-400 rounded-t">Create new post <IoMdClose onClick={cleanAndExit} className='absolute top-2 right-2 hover:cursor-pointer' /></div>

          <div className="flex flex-col items-center justify-center text-sm h-5/6">

            <img src={media} alt="media" className='h-1/6' />
            <p className="py-3">Post photos and videos</p>
            <input onChange={uploadFile} type="file" placeholder='Select from computer' accept="image/*" className="px-3 py-2 text-xs text-white bg-blue-500 rounded hover:cursor-pointer hover:bg-blue-500/90" />

          </div>

        </div>
      </div>
    </div>

  )
}