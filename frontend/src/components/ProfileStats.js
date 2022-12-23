import { useContext, useEffect, useState } from "react";
import AuthContext from "../context/AuthContext";
import avatar from '../assets/avatar.jpeg';
import Spinner from "./Spinner";
import { toast } from "react-toastify";

export default function ProfileStats({ userProfile, loggedUser, usersPosts, username }) {
  const { user, setPostCountToggle, setFollowingToggle, setFollowersToggle, isLoading, setIsLoading, instance } = useContext(AuthContext);
  const [followDbArray, setFollingDbArray] = useState([])
  const isArray = followDbArray?.followers ?? [];
  const isFollowing = isArray.some(element => element.followingId === userProfile.id)

  useEffect(() => {
    instance
      .get(`users/${username}/follows`)
      .then((res) => { setFollingDbArray(res.data) })
      .catch((err) => { console.log('Error - ' + err) })
  }, [instance, username]);

  const toggleFollow = () => {
    setIsLoading(true);
    if (!isFollowing) {
      instance
        .post(`users/follow/${username}`, { followerId: userProfile.id, followingId: loggedUser.id })
        .then((res) => { toast.success('Follow!') })
        .catch((err) => { console.log('Error - ' + err) })
        .finally(() => { setIsLoading(false) });
    } else {
      instance
        .delete(`users/follow/${username}`, { data: { followerId: userProfile.id, followingId: loggedUser.id } })
        .then((res) => { toast.success('Unfollow!') })
        .catch((err) => { console.log('Error - ' + err) })
        .finally(() => { setIsLoading(false) });
    }
  };

  if (isLoading) return <Spinner />;

  return (
    <div className="flex flex-col">
      <div className="flex flex-row items-center justify-center">
        <div className="flex flex-col items-center py-3">
          <img className="profile" src={userProfile?.profileImage ? userProfile?.profileImage : avatar} alt={userProfile?.username} />
        </div>

        <div className="flex flex-col text-gray-700">
          <button className='text-right hover:cursor-pointer' onClick={() => { setPostCountToggle(false); setFollowingToggle(false); setFollowersToggle(true) }}>
            Followers: <strong>{followDbArray?.followers ? followDbArray?.followers.length : 0}</strong>
          </button>
          <button className='py-4 text-right hover:cursor-pointer' onClick={() => { setPostCountToggle(true); setFollowingToggle(false); setFollowersToggle(false) }}>
            Posts: <strong>{usersPosts?.length ? usersPosts?.length : 0}</strong>
          </button>
          <button className='text-right hover:cursor-pointer' onClick={() => { setPostCountToggle(false); setFollowingToggle(true); setFollowersToggle(false) }}>
            Following: <strong>{followDbArray?.following ? followDbArray?.following?.length : 0}</strong>
          </button>
        </div>
      </div>

      {user !== username && <div className="flex flex-row mb-4"><button onClick={toggleFollow} className={isFollowing ? "btn-follow" : "btn-unfollow"}>{isFollowing ? "Unfollow" : "Follow"}</button></div>}
    </div>
  )
}
