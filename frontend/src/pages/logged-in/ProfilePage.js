import { useContext, useEffect, useState } from "react";
import AuthContext from "../../context/AuthContext";
import { useParams } from "react-router-dom";
import useToggle from "../../hooks/useToggle";
import EditProfile from "../../components/EditProfile";
import Posts from "../../components/Posts";
import avatar from '../../assets/avatar.jpeg';
import ProfileStats from "../../components/ProfileStats";
import Spinner from "../../components/Spinner";
import { toast } from "react-toastify";

export default function ProfilePage() {
  const { user, postCountToggle, followingToggle, followersToggle, isLoading, setIsLoading, instance } = useContext(AuthContext);
  const [postsByUser, setPostsByUser] = useState({});
  const [showModal, setShowModal] = useToggle(false)
  const [following] = useState(false);
  const usersPosts = postsByUser?.posts;
  const { username } = useParams();

  const followClick = () => { console.log("Follow"); }

  useEffect(() => {
    instance
      .get(`users/${username}/posts`)
      .then((res) => {
        setPostsByUser(res?.data);
      })
      .catch((err) => {
        toast.error('Response - ' + err)
        console.log('Response - ' + err);
      })
      .finally(() => { setIsLoading(false) });
    // eslint-disable-next-line
  }, [username])

  if (isLoading) return <Spinner />;

  return (
    <div className="flex flex-col w-screen max-w-screen-xl p-2 mx-auto text-sm text-gray-600 md:flex-row">

      {showModal && <EditProfile setShowModal={setShowModal} postsByUser={postsByUser} />}

      <div className="relative w-full p-3 md:w-1/3">
        <p className="w-full text-lg font-medium text-center">@{postsByUser?.username}'s_profile:</p>

        {user === postsByUser?.username &&
          <button onClick={() => setShowModal(true)} className="flex flex-col items-center w-full text-xs">
            <div className="pt-1 font-medium text-orange-500">✎ Edit your profile</div>
          </button>
        }

        <div className="flex flex-row items-center justify-center pb-3">
          <div className="flex flex-col items-center py-3">
            <img className="profile" src={postsByUser?.profileImage ? postsByUser?.profileImage : avatar} alt={postsByUser?.username} />
          </div>

          <ProfileStats postsByUser={postsByUser} usersPosts={usersPosts} />
        </div>

        {user !== username && <div className="flex "><button onClick={followClick} className={following ? "btn-follow" : "btn-unfollow"}>{following ? "Unfollow" : "Follow"}</button></div>}

        <div className="py-5 border-b border-gray-200">
          <p className='pb-3 italic font-medium text-center text-gray-700'>About me:</p>
          <p className='text-center'>{postsByUser?.bio}</p>
        </div>

      </div>

      <div className="flex flex-col items-center w-full p-3 md:w-2/3">
        <h1 className="text-lg font-medium">@{postsByUser?.username}'s_work:</h1>

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
