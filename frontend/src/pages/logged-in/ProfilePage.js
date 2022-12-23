import { useContext, useEffect, useState } from "react";
import AuthContext from "../../context/AuthContext";
import { useParams } from "react-router-dom";
import useToggle from "../../hooks/useToggle";
import EditProfile from "../../components/EditProfile";
import Posts from "../../components/Posts";
import ProfileStats from "../../components/ProfileStats";
import Spinner from "../../components/Spinner";
import { toast } from "react-toastify";

export default function ProfilePage() {
  const { user, postCountToggle, followingToggle, followersToggle, isLoading, setIsLoading, loggedUser, instance } = useContext(AuthContext);
  const [userProfile, setUserProfile] = useState({});
  const [showModal, setShowModal] = useToggle(false)
  const { username } = useParams();
  const usersPosts = userProfile?.posts;

  useEffect(() => {
    setIsLoading(true);
    instance
      .get(`users/profile/${username}`)
      .then((res) => { setUserProfile(res?.data) })
      .catch((err) => {
        toast.error('Response - ' + err);
        console.log('Response - ' + err);
      })
      .finally(() => { setIsLoading(false) });
    // eslint-disable-next-line
  }, [username])

  if (isLoading) return <Spinner />;

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

        <ProfileStats userProfile={userProfile} usersPosts={usersPosts} username={username} loggedUser={loggedUser} />

        <div className="pb-3 border-b border-gray-200">
          <p className='pb-3 italic font-medium text-center text-gray-700'>About me:</p>
          <p className='text-center'>{userProfile?.bio}</p>
        </div>

      </div>

      <div className="flex flex-col items-center w-full p-3 md:w-2/3">
        <h1 className="text-lg font-medium">@{userProfile?.username}'s_work:</h1>

        {postCountToggle && <div className="w-full">
          <p className="stat-text">Posts</p>
          <Posts usersPosts={usersPosts} />
        </div>}

        {followingToggle && <div className="w-full"><p className="stat-text">Following:</p></div>}

        {followersToggle && <div className="w-full"><p className="stat-text">Followers:</p></div>}

      </div>
    </div>
  )
}
