import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import avatar from '../assets/avatar.jpeg';

export default function Following({ results, text }) {
  return (
    <div>
      {results?.length > 0 ? (
        <div className='flex flex-wrap justify-center'>
          {results.map((item, i) => (
            <Link key={i} to={`/profile/${item?.following?.username}`} state={{ data: item.following }}
              onClick={() => { toast.success(`Welcome to @${item?.following?.username}'s profile`) }}
              className="flex px-3 py-1 m-3 rounded shadow">
              <img src={item?.following?.profileImage ? item?.following?.profileImage : avatar} alt='profile' className='inline object-cover w-16 h-16 mr-1 rounded-full' />
              <div className="text-xs text-gray-700">@{item?.following?.username}</div>
            </Link>
          ))}
        </div>
      ) : (
        <div className='flex flex-wrap justify-center pt-5 text-sm text-gray-700'>{text}</div>
      )}
    </div>
  )
}
