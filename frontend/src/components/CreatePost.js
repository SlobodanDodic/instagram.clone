import { useContext, useState } from 'react';
import AuthContext from '../context/AuthContext';
import ToggleContext from '../context/ToggleContext';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import media from '../assets/media.png'
import { IoMdClose } from 'react-icons/io';
import { toast } from "react-toastify";

export default function CreatePost() {
  const { instance, loggedUser } = useContext(AuthContext);
  const { postModal, setPostModal } = useContext(ToggleContext);

  const [caption, setCaption] = useState('');
  const [file, setFile] = useState();

  const data = new FormData();
  data.append('caption', caption)
  data.append('author', loggedUser?.username)
  data.append('file', file)

  const queryClient = useQueryClient()

  const newPost = async () => {
    return await instance.post(`/post/create`, data);
  }
  const newPostMutation = useMutation(newPost, { onSuccess: () => queryClient.invalidateQueries('findUserProfile') })

  const createPost = () => {
    newPostMutation.mutate();
    setCaption('');
    setFile();
    setPostModal();
    toast.success('Successfully uploaded!');
  }

  const cleanAndExit = () => { setPostModal() }

  return (
    <div className={postModal ? 'absolute z-50' : 'hidden'}>
      <div className="flex items-center justify-center w-screen h-screen p-3 bg-black/70 md:p-10">
        <div className="relative w-full max-w-screen-lg bg-white rounded-lg shadow h-3/5">

          <div className="flex items-center justify-center py-2 text-sm border-b border-gray-400 rounded-t">Create new post <IoMdClose onClick={cleanAndExit} className='absolute top-2 right-2 hover:cursor-pointer' /></div>

          <div className="flex flex-col items-center justify-center text-sm h-5/6">
            {file ?
              <>
                <img src={URL.createObjectURL(file)} alt="media" className='rounded h-2/3' />
                <input onChange={(e) => setCaption(e.target.value)} value={caption} type="text" placeholder="Enter a Caption" className='p-1 mt-2 mb-4 text-xs text-center border rounded-sm' />
                <button onClick={createPost} className="px-4 py-2 text-xs text-white bg-blue-500 rounded hover:bg-blue/90">Add new post</button>
              </>
              :
              <>
                <img src={media} alt="media" className='h-1/6' />
                <p className="py-3">Post photos and videos</p>
                <input onChange={e => setFile(e.target.files[0])} type="file" placeholder='Select from computer' accept="image/*" className="px-3 py-2 text-xs text-white bg-blue-500 rounded hover:cursor-pointer hover:bg-blue-500/90" />
              </>
            }
          </div>


        </div>
      </div>
    </div>

  )
}