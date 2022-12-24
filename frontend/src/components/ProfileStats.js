import { useContext } from "react";
import AuthContext from "../context/AuthContext";
import { toast } from "react-toastify";
import avatar from '../assets/avatar.jpeg';

export default function ProfileStats({ userProfile, usersPosts, username }) {
  const { user, loggedUser, setPostCountToggle, setFollowingToggle, setFollowersToggle, instance } = useContext(AuthContext);
  const isFollowing = loggedUser?.following?.some(element => element.followingId === userProfile?.id);

  const toggleFollow = () => {
    if (!isFollowing) {
      instance
        .post(`users/follow/${username}`, { followerId: userProfile.id, followingId: loggedUser.id })
        .then((res) => { toast.success('Follow!') })
        .catch((err) => { console.log('Error - ' + err) })
    } else {
      instance
        .delete(`users/follow/${username}`, { data: { followerId: userProfile.id, followingId: loggedUser.id } })
        .then((res) => { toast.success('Unfollow!') })
        .catch((err) => { console.log('Error - ' + err) })
    }
  };

  return (
    <div className="flex flex-col">
      <div className="flex flex-row items-center justify-center">
        <div className="flex flex-col items-center py-3">
          <img className="profile" src={userProfile?.profileImage ? userProfile?.profileImage : avatar} alt={userProfile?.username} />
        </div>

        <div className="flex flex-col text-gray-700">
          <button className='text-right hover:cursor-pointer' onClick={() => { setPostCountToggle(false); setFollowingToggle(false); setFollowersToggle(true) }}>
            Followers: <strong>{userProfile?.followers?.length}</strong>
          </button>
          <button className='py-4 text-right hover:cursor-pointer' onClick={() => { setPostCountToggle(true); setFollowingToggle(false); setFollowersToggle(false) }}>
            Posts: <strong>{usersPosts?.length ? usersPosts?.length : 0}</strong>
          </button>
          <button className='text-right hover:cursor-pointer' onClick={() => { setPostCountToggle(false); setFollowingToggle(true); setFollowersToggle(false) }}>
            Following: <strong>{userProfile?.following?.length}</strong>
          </button>
        </div>
      </div>

      {user !== username && <div className="flex flex-row mb-4"><button onClick={toggleFollow} className={isFollowing ? "btn-follow" : "btn-unfollow"}>{isFollowing ? "Unfollow" : "Follow"}</button></div>}
    </div>
  )
}
