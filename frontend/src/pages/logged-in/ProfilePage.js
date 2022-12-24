import { useContext, useEffect, useState } from "react";
import AuthContext from "../../context/AuthContext";
import { useParams } from "react-router-dom";
import useToggle from "../../hooks/useToggle";
import EditProfile from "../../components/EditProfile";
import Posts from "../../components/Posts";
import ProfileStats from "../../components/ProfileStats";
import Spinner from "../../components/Spinner";
import useAxios from "../../hooks/useAxios";
import FetchError from "../../components/FetchError";
import Following from "../../components/Following";
import Followers from "../../components/Followers";

export default function ProfilePage() {
  const { user, postCountToggle, followingToggle, followersToggle, setPostCountToggle, setFollowingToggle, setFollowersToggle } = useContext(AuthContext);
  const [userProfile, setUserProfile] = useState({});
  const [showModal, setShowModal] = useToggle(false)
  const { username } = useParams();
  const usersPosts = userProfile?.posts;
  const { data, loading, fetchError } = useAxios(`users/profile/${username}`);

  useEffect(() => {
    setUserProfile(data)
    setPostCountToggle(true)
    setFollowingToggle(false)
    setFollowersToggle(false)
  }, [data, userProfile])

  if (loading) return <Spinner />
  if (fetchError) return <FetchError fetchError={fetchError} />

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
        <ProfileStats userProfile={userProfile} usersPosts={usersPosts} username={username} />

        <div className="pb-3 border-b border-gray-200">
          <p className='pb-3 italic font-medium text-center text-gray-700'>About me:</p>
          <p className='text-center'>{userProfile?.bio}</p>
        </div>

      </div>

      <div className="flex flex-col items-center w-full p-3 md:w-2/3">
        <h1 className="text-lg font-medium">@{userProfile?.username}'s_work:</h1>
        {followersToggle && <div className="w-full">
          <p className="stat-text">Followers:</p>
          <Followers results={userProfile?.followers} text={'No followers yet...'} />
        </div>}

        {postCountToggle && <div className="w-full">
          <p className="stat-text">Posts</p>
          <Posts usersPosts={usersPosts} />
        </div>}

        {followingToggle && <div className="w-full">
          <p className="stat-text">Following:</p>
          <Following results={userProfile?.following} text={'Not followed yet...'} />
        </div>}
      </div>
    </div>
  )
}
