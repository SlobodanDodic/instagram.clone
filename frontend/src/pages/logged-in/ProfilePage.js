import { useContext } from "react";
import AuthContext from "../../context/AuthContext";
import ToggleContext from "../../context/ToggleContext";
import { useQuery } from '@tanstack/react-query'
import { useParams } from "react-router-dom";
import useToggle from "../../hooks/useToggle";
import { Spinner, ErrorInfo } from "../../components/Spinner";

import EditProfile from "../../components/EditProfile";
import Posts from "../../components/Posts";
import ProfileStats from "../../components/ProfileStats";
import UserLink from "../../components/UserLink";

export default function ProfilePage() {
  const { user, instance } = useContext(AuthContext);
  const { postCountToggle, followingToggle, followersToggle } = useContext(ToggleContext);
  const [showModal, setShowModal] = useToggle(false)
  const { username } = useParams();

  const findUserProfile = async () => {
    const data = await instance.get(`/users/profile/${username}`);
    return data.data;
  }
  const { data: userProfile, isLoading, isError, error } = useQuery(['findUserProfile', username], () => findUserProfile())

  if (isLoading) return <Spinner />
  if (isError) return <ErrorInfo error={error} />

  return (
    <div className="flex flex-col w-screen max-w-screen-xl p-2 mx-auto text-sm text-gray-600 md:flex-row">
      {showModal && <EditProfile setShowModal={setShowModal} userProfile={userProfile} />}

      <div className="relative w-full p-3 md:w-1/3">
        <p className="w-full text-lg font-medium text-center">@{userProfile?.username}'s_profile:</p>

        {user === userProfile?.username &&
          <button onClick={() => setShowModal(true)} className="flex flex-col items-center w-full text-xs">
            <div className="pt-1 font-medium text-orange-500">✎ Edit your profile</div>
          </button>
        }
        <ProfileStats userProfile={userProfile} username={username} />

        <div className="pb-3 border-b border-gray-200">
          <p className='pb-3 italic font-medium text-center text-gray-700'>About me:</p>
          <p className='text-center'>{userProfile?.bio}</p>
        </div>

      </div>

      <div className="flex flex-col items-center w-full p-3 md:w-2/3">
        <h1 className="text-lg font-medium">@{userProfile?.username}'s_work:</h1>
        {followersToggle && <div className="w-full">
          <p className="stat-text">Followers:</p>
          {userProfile?.followers?.length > 0 ? (
            <div className='flex flex-wrap justify-center'>
              {userProfile?.followers.map((item, i) => (
                <UserLink followerItem={item} key={i} />

              ))}
            </div>
          ) : (
            <div className='flex flex-wrap justify-center pt-5 text-sm text-gray-700'>No followers yet...</div>
          )}
        </div>}

        {postCountToggle && <div className="w-full">
          <p className="stat-text">Posts</p>
          <Posts usersPosts={userProfile?.posts} isLoading={isLoading} />
        </div>}

        {followingToggle && <div className="w-full">
          <p className="stat-text">Following:</p>
          {userProfile?.following?.length > 0 ? (
            <div className='flex flex-wrap justify-center'>
              {userProfile?.following.map((item, i) => (
                <UserLink followingItem={item} key={i} />

              ))}
            </div>
          ) : (
            <div className='flex flex-wrap justify-center pt-5 text-sm text-gray-700'>Not followed yet...</div>
          )}
        </div>}
      </div>
    </div>
  )
}
