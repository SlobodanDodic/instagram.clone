import { useContext } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import avatar from '../assets/avatar.jpeg';
import AuthContext from "../context/AuthContext";

export default function UserLink({ followerItem, followingItem, searchItem, commentsItem, cleanAndExit }) {
  const { instance } = useContext(AuthContext);
  const result = followerItem ? followerItem?.follower : followingItem ? followingItem?.following : commentsItem ? commentsItem?.commentAuthor : searchItem;

  // eslint-disable-next-line
  const getAvatar = async () => {
    return await instance.get(`/users/${result?.profileImage}`);
  }

  return (
    <Link to={`/profile/${result?.username}`} state={{ data: result }}
      onClick={() => { cleanAndExit(); toast.success(`Welcome to @${result?.username}'s profile`) }}
      className={commentsItem ? 'flex flex-col justify-center w-16' : "flex px-3 py-1 m-3 rounded shadow"}>
      <img src={result?.profileImage ? `${process.env.REACT_APP_SERVER}/users/${result?.profileImage}` : avatar} alt='profile' className={commentsItem ? 'inline object-cover p-px rounded-full w-11 h-11 bg-gradient-to-b from-red-600 via-purple-600 to-pink-700' : 'inline object-cover w-16 h-16 mr-1 rounded-full'} />
      {commentsItem ? null : <div className="text-xs text-gray-700">@{result?.username}</div>}
    </Link>

  )
}
