import { useContext } from "react";
import AuthContext from "../context/AuthContext";
import { useMutation, useQueryClient } from '@tanstack/react-query';
import avatar from '../assets/avatar.jpeg';
import { Dots } from "./Spinner";

export default function ProfileStats({ userProfile, username }) {
  const { user, loggedUser, setPostCountToggle, setFollowingToggle, setFollowersToggle, instance } = useContext(AuthContext);
  const isFollowing = loggedUser?.following?.some(element => element.followingId === userProfile?.id);
  const queryClient = useQueryClient()

  const follow = async () => {
    return await instance.post(`users/follow/${username}`, { followerId: userProfile.id, followingId: loggedUser.id })
  }
  const followMutation = useMutation(follow, { onSuccess: () => queryClient.invalidateQueries('findUserProfile') })

  const unFollow = async () => {
    return await instance.delete(`users/follow/${username}`, { data: { followerId: userProfile.id, followingId: loggedUser.id } })
  }
  const unFollowMutation = useMutation(unFollow, { onSuccess: () => queryClient.invalidateQueries('findUserProfile') })

  const toggleFollow = () => {
    if (!isFollowing) {
      followMutation.mutate();
    } else {
      unFollowMutation.mutate()
    }
  };

  return (
    <div className="flex flex-col">
      <div className="flex flex-row items-center justify-center">
        <div className="flex flex-col items-center py-3">
          <img className="profile"
            src={userProfile?.profileImage ? userProfile?.profileImage : avatar}
            alt={userProfile?.username}
          />
        </div>

        <div className="flex flex-col text-gray-700">
          <button className='text-right hover:cursor-pointer'
            onClick={() => { setPostCountToggle(false); setFollowingToggle(false); setFollowersToggle(true) }}
          >
            Followers: <strong>{userProfile?.followers?.length}</strong>
          </button>
          <button className='py-4 text-right hover:cursor-pointer'
            onClick={() => { setPostCountToggle(true); setFollowingToggle(false); setFollowersToggle(false) }}
          >
            Posts: <strong>{userProfile?.posts?.length ? userProfile?.posts?.length : 0}</strong>
          </button>
          <button className='text-right hover:cursor-pointer'
            onClick={() => { setPostCountToggle(false); setFollowingToggle(true); setFollowersToggle(false) }}
          >
            Following: <strong>{userProfile?.following?.length}</strong>
          </button>
        </div>
      </div>

      {user !== username && <div className="flex flex-row mb-4">
        <button onClick={toggleFollow} className={isFollowing ? "btn-follow" : "btn-unfollow"}>
          {isFollowing ?
            (followMutation.isLoading ? <Dots /> : "Unfollow")
            :
            (unFollowMutation.isLoading ? <Dots /> : "Follow")}
        </button>
      </div>}
    </div>
  )
}
