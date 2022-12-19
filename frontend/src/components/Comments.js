import { useContext, useEffect, useState } from 'react';
import AuthContext from '../context/AuthContext';
import Spinner from './Spinner';
import { toast } from "react-toastify";
import Comment from './Comment';

export default function Comments({ id }) {
  const { isLoading, setIsLoading, instance, loggedUser } = useContext(AuthContext);
  const [comment, setComment] = useState('')
  const [allComments, setallComments] = useState([])
  const user = loggedUser.id

  const sendComment = () => {
    setIsLoading(true);
    instance
      .post(`post/createComment`, { body: comment, post: id, commentAuthor: user })
      .then((res) => {
        toast.success('Done!');
        setComment('');
      })
      .catch((err) => { console.log('Error - ' + err) })
      .finally(() => setIsLoading(false));
  };

  useEffect(() => {
    instance
      .get(`post/getComments/${id}`)
      .then((res) => { setallComments(res.data) })
      .catch((err) => { console.error(err) })
  }, [id, instance])

  if (isLoading) return <Spinner />;

  return (
    <div className="flex flex-col w-full sm:flex-row">
      <div className="relative flex flex-col w-full sm:pr-5 sm:w-1/3 sm:border-r">
        <button onClick={sendComment} className='mt-2 text-xs text-right text-blue-500'>POST</button>
        <textarea type="text" placeholder="Add a comment..." className='p-1 m-0 text-gray-500 transition ease-in-out border-b border-gray-300 focus:rounded focus:text-gray-500 focus:bg-gray-50 focus:outline-none' onChange={(e) => setComment(e.target.value)} />

        {allComments?.length > 3 ? (
          <div className="absolute flex-col items-end hidden text-xs md:flex bottom-2 right-4 text-black/40">
            <div className='flex'>more posts down</div>
            <div className='flex'>▼</div>
          </div>
        ) : null}
      </div>

      <div className="flex flex-col w-full p-2 overflow-scroll text-gray-600 normal-case sm:w-2/3">
        {allComments.map((single) => (
          <Comment key={single?.id} single={single} />
        ))}
      </div>

    </div>
  )
}
