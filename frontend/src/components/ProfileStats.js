import { useContext } from "react";
import AuthContext from "../context/AuthContext";

export default function ProfileStats({ selectedUser, postsByUser }) {
  const { setPostCountToggle, setFollowingToggle, setFollowersToggle } = useContext(AuthContext);

  return (
    <div>
      <div className="flex flex-col text-gray-700">
        <button className='text-right hover:cursor-pointer' onClick={() => { setPostCountToggle(false); setFollowingToggle(false); setFollowersToggle(true) }}>
          Followers: <strong>{selectedUser?.followers ? selectedUser?.followers.length : 0}</strong>
        </button>

        <button className='py-4 text-right hover:cursor-pointer' onClick={() => { setPostCountToggle(true); setFollowingToggle(false); setFollowersToggle(false) }}>
          Posts: <strong>{postsByUser?.length ? postsByUser?.length : 0}</strong>
        </button>

        <button className='text-right hover:cursor-pointer' onClick={() => { setPostCountToggle(false); setFollowingToggle(true); setFollowersToggle(false) }}>
          Following: <strong>{selectedUser?.following ? selectedUser?.following : 0}</strong>
        </button>
      </div>
    </div>
  )
}
