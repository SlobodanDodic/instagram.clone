import { useContext } from 'react';
import { IoMdClose } from 'react-icons/io';
import AuthContext from '../context/AuthContext';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import Comments from './Comments';
import { toast } from "react-toastify";
import dayjs from "dayjs";
import { useNavigate } from 'react-router-dom';

var relativeTime = require('dayjs/plugin/relativeTime')
dayjs.extend(relativeTime)

export default function PostDetail({ post, setShowPostDetail }) {
  const { instance, loggedUser } = useContext(AuthContext);
  const queryClient = useQueryClient()
  const navigate = useNavigate();

  const postByLoggedUser = post?.authorId === loggedUser.id;
  const likeId = post?.likes?.find(({ userId }) => userId === loggedUser.id);
  const userLikedPost = post?.likes?.some(element => element.userId === loggedUser.id);

  const removePost = async () => {
    return await instance.delete(`/post/${post.id}`)
  }
  const removePostMutation = useMutation(removePost, {
    onSuccess: () => queryClient.invalidateQueries('findUserProfile')
  })

  const createLike = async () => {
    return await instance.post(`like`, { postId: post.id, userId: loggedUser.id })
  }
  const createLikeMutation = useMutation(createLike, {
    onSuccess: () => queryClient.invalidateQueries('findUserProfile')
  })

  const removeLike = async () => {
    return await instance.delete(`like/${likeId?.id}`)
  }
  const removeLikeMutation = useMutation(removeLike, {
    onSuccess: () => queryClient.invalidateQueries('findUserProfile')
  })

  const toggleLike = () => {
    if (!userLikedPost) {
      createLikeMutation.mutate();
    } else {
      removeLikeMutation.mutate()
    }
  };

  const deletePost = () => {
    removePostMutation.mutate();
    setShowPostDetail();
    toast.success('Post deleted!')
  };

  const closeModal = () => {
    setShowPostDetail();
    navigate(-1)
  }

  return (
    <div className="absolute top-0 left-0 z-50">
      <div className="fixed z-50 flex items-center justify-center w-screen h-screen px-6 py-14 bg-black/40">
        <div className="flex flex-col w-full h-full max-w-screen-lg p-3 text-sm bg-white rounded-lg">
          <IoMdClose className='absolute z-50 m-1 text-lg top-16 right-8 hover:cursor-pointer' onClick={closeModal} />
          <div className="flex flex-col items-center justify-center w-full px-2 pt-6 border-b border-gray-200 rounded-r-lg md:py-4 h-2/3 md:flex-row">
            <img src={`${process.env.REACT_APP_SERVER}/post/${post.postImage}`} alt={post?.id} className="object-contain object-center w-full h-full pb-2 rounded-lg md:w-3/4" />
            <div className="flex flex-col justify-between w-full p-2 font-semibold text-gray-600 border-gray-200 md:ml-4 md:h-full md:border-l md:w-1/4">
              <div className="flex flex-col justify-between h-full">
                {!postByLoggedUser ? (
                  <button onClick={toggleLike} className="flex justify-center text-xl text-red-500 pb-7 h-1/3 md:flex-col">{!userLikedPost ? '♡ Like me!' : "♥ Liked!"}</button>
                ) : (<button onClick={deletePost} className="flex justify-center text-lg text-red-500 drop-shadow-lg pb-7 h-1/3 md:flex-col">✗ Delete post</button>)}
                <div className="flex justify-around md:flex-col h-2/3">
                  <div className="pb-1 uppercase">⦿ {post?.author?.username}'s post</div>
                  <div className="pb-1 text-gray-500">⏱ {dayjs(post?.published).format('MMM. DD, YYYY')}</div>
                  <div className="pb-1 text-gray-500 capitalize">© {post?.caption}</div>
                  <div className="pb-1 text-gray-500">❤️ {post?.likes?.length} likes</div>
                  <div className="pb-1 text-gray-500">💬 {post?.comments?.length} comments</div>
                </div>
              </div>
            </div>
          </div>
          <div className="flex w-full max-w-screen-lg p-2 rounded-r-lg h-1/3"><Comments id={post?.id} comments={post?.comments} /></div>
        </div>
      </div>
    </div>
  )
}
