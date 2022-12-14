import { useContext, useState } from 'react';
import AuthContext from '../context/AuthContext';
import Spinner from './Spinner';
import media from '../assets/media.png'
import { IoMdClose } from 'react-icons/io';
import { toast } from "react-toastify";

export default function CreatePost() {
  const { postModal, setPostModal, isLoading, setIsLoading, instance, loggedUser } = useContext(AuthContext);
  const [caption, setCaption] = useState('');
  const [photo, setPhoto] = useState({ myFile: "" });

  const convertToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onload = () => {
        resolve(fileReader.result);
      };
      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  };
  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    const base64 = await convertToBase64(file);
    setPhoto({ ...photo, myFile: base64 });
  };

  const updateProfile = () => {
    setIsLoading(true);
    instance
      .post(`post/create`, { caption: caption, postImage: photo?.myFile, author: loggedUser?.username })
      .then((res) => {
        toast.success('Successfully edited!');
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
      .finally(() => {
        setIsLoading(false);
        setCaption('');
        setPhoto({ myFile: "" });
        setPostModal();
      });
  };

  const cleanAndExit = () => { setPostModal() }

  if (isLoading) return <Spinner />;

  return (
    <div className={postModal ? 'absolute z-50' : 'hidden'}>
      <div className="flex items-center justify-center w-screen h-screen p-3 bg-black/70 md:p-10">
        <div className="relative w-full max-w-screen-lg bg-white rounded-lg shadow h-3/5">

          <div className="flex items-center justify-center py-2 text-sm border-b border-gray-400 rounded-t">Create new post <IoMdClose onClick={cleanAndExit} className='absolute top-2 right-2 hover:cursor-pointer' /></div>

          <div className="flex flex-col items-center justify-center text-sm h-5/6">
            {photo?.myFile ?
              <>
                <img src={photo?.myFile ? photo?.myFile : null} alt="media" className='rounded h-2/3' />
                <input onChange={(e) => setCaption(e.target.value)} value={caption} type="text" placeholder="Enter a Caption" className='p-1 mt-2 mb-4 text-xs text-center border rounded-sm' />
                <button onClick={updateProfile} className="px-4 py-2 text-xs text-white bg-blue-500 rounded hover:bg-blue/90">Add new post</button>
              </>
              :
              <>
                <img src={media} alt="media" className='h-1/6' />
                <p className="py-3">Post photos and videos</p>
                <input onChange={handleFileUpload} type="file" placeholder='Select from computer' accept="image/*" className="px-3 py-2 text-xs text-white bg-blue-500 rounded hover:cursor-pointer hover:bg-blue-500/90" />
              </>
            }
          </div>


        </div>
      </div>
    </div>

  )
}