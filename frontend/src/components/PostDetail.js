import { useContext, useEffect, useState } from 'react';
import { IoMdClose } from 'react-icons/io';
import AuthContext from '../context/AuthContext';
import Comments from './Comments';
import { toast } from "react-toastify";
import dayjs from "dayjs";
var relativeTime = require('dayjs/plugin/relativeTime')
dayjs.extend(relativeTime)

export default function PostDetail({ post, setShowPostDetail }) {
  const { instance, loggedUser } = useContext(AuthContext);
  const [singlePost, setSinglePost] = useState([])
  const postId = post.id;
  const postByLoggedUser = post.authorId === loggedUser.id;
  const likeId = singlePost?.likes?.find(({ userId }) => userId === loggedUser.id);
  const userLikedPost = singlePost?.likes?.some(element => element.userId === loggedUser.id);

  const toggleLike = () => {
    if (!userLikedPost) {
      instance
        .post(`post/like`, { postId: postId, userId: loggedUser.id })
        .then((res) => { toast.success('Liked!') })
        .catch((err) => { console.log('Error - ' + err) })
    } else {
      instance
        .delete(`post/like/${likeId?.id}`)
        .then((res) => { toast.success('Unliked!') })
        .catch((err) => { console.log('Error - ' + err) })
    }
  };

  const removePost = () => {
    console.log(postId);
    instance
      .delete(`post/${postId}`)
      .then((res) => { toast.success('Post deleted!') })
      .catch((err) => { console.log('Error - ' + err) })
  };

  useEffect(() => {
    instance
      .get(`post/${postId}`)
      .then((res) => { setSinglePost(res.data) })
      .catch((err) => { console.log('Error - ' + err) })
  }, [instance, postId])

  return (
    <div className="absolute top-0 left-0 z-50">
      <div className="fixed z-50 flex items-center justify-center w-screen h-screen px-6 py-14 bg-black/40">
        <div className="flex flex-col w-full h-full max-w-screen-lg p-3 text-sm bg-white rounded-lg">
          <IoMdClose className='absolute z-50 m-1 text-lg top-16 right-8 hover:cursor-pointer' onClick={setShowPostDetail} />
          <div className="flex flex-col items-center justify-center w-full px-2 pt-6 border-b border-gray-200 rounded-r-lg md:py-4 h-2/3 md:flex-row">
            <img src={post.postImage} alt={post.authorId} className="object-contain object-center w-full h-full pb-2 rounded-lg md:w-3/4" />
            <div className="flex flex-col justify-between w-full p-2 font-semibold text-gray-600 border-gray-200 md:ml-4 md:h-full md:border-l md:w-1/4">
              <div className="flex flex-col justify-between h-full">
                {!postByLoggedUser ? (
                  <button onClick={toggleLike} className="flex justify-center text-xl text-red-500 pb-7 h-1/3 md:flex-col">{!userLikedPost ? '♡ Like me!' : "♥ Liked!"}</button>
                ) : (<button onClick={removePost} className="flex justify-center text-lg text-red-500 drop-shadow-lg pb-7 h-1/3 md:flex-col">✗ Delete post</button>)}
                <div className="flex justify-around md:flex-col h-1/3">
                  <div className="pb-1">⏱ {dayjs(post.published).format('MMM. DD, YYYY')}</div>
                  <div className="pb-1 capitalize">© {post.caption}</div>
                </div>
                <div className="flex justify-around md:flex-col h-1/3">
                  <div className="pb-1">❤️ {singlePost?.likes ? singlePost?.likes?.length : 0} likes</div>
                  <div className="pb-1">💬 {singlePost?.comments ? singlePost?.comments?.length : 0} comments</div>
                </div>
              </div>
            </div>
          </div>
          <div className="flex w-full max-w-screen-lg p-2 rounded-r-lg h-1/3"><Comments id={postId} /></div>
        </div>
      </div>
    </div>
  )
}
