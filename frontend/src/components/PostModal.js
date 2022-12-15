import { useContext } from 'react';
import { IoMdClose } from 'react-icons/io';
import { useLocation, useNavigate } from 'react-router-dom';
import AuthContext from '../context/AuthContext';
import dayjs from "dayjs";

var relativeTime = require('dayjs/plugin/relativeTime')
dayjs.extend(relativeTime)

export default function PostModal() {
  const { singlePostModal, setSinglePostModal } = useContext(AuthContext);
  const location = useLocation();
  const post = location?.state?.data;
  const navigate = useNavigate();

  const exitModal = () => {
    setSinglePostModal();
    navigate(-1)
  }

  return (
    <div className={singlePostModal ? 'absolute top-0 left-0 z-50' : 'hidden'}>
      <div className="fixed z-50 flex items-center justify-center w-screen h-screen px-6 py-14 bg-black/70">
        <div className="flex flex-col w-full h-full max-w-screen-lg p-3 text-sm bg-white rounded-lg ">
          <IoMdClose onClick={exitModal} className='absolute z-50 m-1 text-lg top-16 right-8 hover:cursor-pointer' />

          <div className="flex flex-col items-center justify-center w-full px-2 py-6 border-b border-gray-200 rounded-r-lg md:py-3 h-2/3 md:flex-row">
            <img src={post.postImage} alt={post.authorId} className="object-contain object-center w-full h-full pb-2 rounded-lg md:w-3/4" />

            <div className="flex flex-col justify-between w-full py-2 font-semibold text-gray-600 border-gray-200 md:px-2 md:ml-4 md:h-full md:border-l md:w-1/4">
              <button className="flex justify-center text-2xl text-red-500 md:pb-2 h-1/3 md:flex-col">
                <div className='pr-2'>❤️</div>
                <div>Like me!</div>
              </button>
              <div className="flex flex-col justify-between h-1/2">
                <div className="flex">⏱ {dayjs(post.published).format('MMMM DD, YYYY')}</div>
                <div className="flex capitalize">© {post.caption}</div>
                <div className="flex">❤️ {(post.likes.toFixed())} likes</div>
                <div className="flex">💬 0 comments</div>
              </div>
            </div>

          </div>
          <div className="flex w-full h-full max-w-screen-lg p-2 rounded-r-lg">Comments</div>


        </div>
      </div>
    </div>
  )
}
