import { useContext, useState } from 'react';
import AuthContext from '../context/AuthContext';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Link } from "react-router-dom";
import avatar from '../assets/avatar.jpeg'
import dayjs from "dayjs";

var relativeTime = require('dayjs/plugin/relativeTime')
dayjs.extend(relativeTime)

export default function Comments({ id, comments }) {
  const { instance, loggedUser } = useContext(AuthContext);
  const [comment, setComment] = useState('');
  const queryClient = useQueryClient();

  const createComment = async () => {
    return await instance.post(`/post/comment`, { body: comment, post: id, commentAuthor: loggedUser.id });
  }
  const createCommentMutation = useMutation(createComment, {
    onSuccess: () => queryClient.invalidateQueries(['findUserProfile'])
  })

  const sendComment = (e) => {
    e.preventDefault();
    createCommentMutation.mutate();
    setComment('');
  }

  return (
    <div className="flex flex-col w-full sm:flex-row">
      <div className="relative flex flex-col w-full sm:pr-5 sm:w-1/3 sm:border-r">
        <button onClick={sendComment} className='mt-2 text-xs text-right text-blue-500'>POST</button>
        <textarea type="text" placeholder="Add a comment..." className='p-1 m-0 text-gray-500 transition ease-in-out border-b border-gray-300 focus:rounded focus:text-gray-500 focus:bg-gray-50 focus:outline-none' onChange={(e) => setComment(e.target.value)} />

        {comments?.length > 3 ? (
          <div className="absolute flex-col items-end hidden text-xs md:flex bottom-2 right-4 text-black/40">
            <div className='flex'>more posts down</div>
            <div className='flex'>▼</div>
          </div>
        ) : null}
      </div>

      <div className="flex flex-col w-full p-2 overflow-scroll text-gray-600 normal-case sm:w-2/3">
        {comments.sort((a, b) => a.created_at > b.created_at ? 1 : -1).map((single) => (
          <div key={single.id} className="flex mb-4 ml-1">
            <Link to={`/profile/${single?.commentAuthor?.username}`} className="flex flex-col justify-center w-16">
              <img src={single?.commentAuthor?.profileImage ? single?.commentAuthor?.profileImage : avatar} alt='profile' className='inline object-cover p-px rounded-full w-11 h-11 bg-gradient-to-b from-red-600 via-purple-600 to-pink-700' />
            </Link>
            <div className="flex flex-col justify-center w-full text-xs">
              <div className="font-semibold text-gray-700">@{single?.commentAuthor?.username}</div>
              <p className="pb-1 text-gray-800">{single?.body}</p>
              <p className="font-semibold text-gray-400">{dayjs(single?.created_at).format('MMM. DD, YYYY / HH:mm')}</p>
            </div>
          </div>
        ))}
      </div>

    </div>
  )
}
