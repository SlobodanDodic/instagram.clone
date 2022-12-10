import { useContext, useState } from "react";
import AuthContext from "../../context/AuthContext";
import { useParams, useLocation } from "react-router-dom";
import useToggle from "../../hooks/useToggle";
import EditProfile from "../../components/EditProfile";
import avatar from '../../assets/avatar.jpeg';

export default function ProfilePage() {
  const { user } = useContext(AuthContext);
  const [posts] = useState({});
  const [following] = useState(false);
  // const [posts, setPosts] = useState({});
  // const [following, setFollowing] = useState(false);
  const { username } = useParams();
  const location = useLocation();
  const selectedUser = location.state?.data;

  const [showModal, setShowModal] = useToggle(false)
  const [postCountToggle, setPostCountToggle] = useToggle(true);
  const [followingToggle, setFollowingToggle] = useToggle(false);
  const [followersToggle, setFollowersToggle] = useToggle(false);

  const followClick = () => { console.log("Follow"); }

  return (
    <div className="flex flex-col w-screen max-w-screen-xl p-2 mx-auto text-sm text-gray-600 md:flex-row">

      {showModal && <EditProfile setShowModal={setShowModal} selectedUser={selectedUser} />}

      <div className="relative w-full p-3 md:w-1/3">
        <p className="w-full text-lg font-medium text-center">@{selectedUser?.username}'s_profile:</p>

        {user === selectedUser?.username &&
          <button onClick={() => setShowModal(true)} className="flex flex-col items-center w-full text-xs">
            <div className="pt-1 font-medium text-orange-500">✎ Edit your profile</div>
          </button>
        }

        <div className="flex flex-row items-center justify-center pb-3">
          <div className="flex flex-col items-center py-3">
            <img className="profile" src={selectedUser?.profileImage ? selectedUser?.profileImage : avatar} alt={selectedUser?.username} />
          </div>

          <div className="flex flex-col text-gray-700">
            <button className='text-right hover:cursor-pointer' onClick={() => { setPostCountToggle(false); setFollowingToggle(false); setFollowersToggle(true) }}>
              ㋡ Followers: <strong>{selectedUser?.followers ? selectedUser?.followers.length : 0}</strong>
            </button>

            <button className='py-4 text-right hover:cursor-pointer' onClick={() => { setPostCountToggle(true); setFollowingToggle(false); setFollowersToggle(false) }}>
              🔍 Posts: <strong>{posts?.length ? posts?.length : 0}</strong>
            </button>

            <button className='text-right hover:cursor-pointer' onClick={() => { setPostCountToggle(false); setFollowingToggle(true); setFollowersToggle(false) }}>
              ㋡ Following: <strong>{selectedUser?.following ? selectedUser?.following : 0}</strong>
            </button>
          </div>
        </div>

        {user !== username && <div className="flex "><button onClick={followClick} className={following ? "btn-follow" : "btn-unfollow"}>{following ? "Unfollow" : "Follow"}</button></div>}

        <div className="py-5 border-b border-gray-200">
          <p className='pb-3 italic font-medium text-center text-gray-700'>About me:</p>
          <p className='text-center'>{selectedUser?.bio}</p>
        </div>

      </div>

      <div className="flex flex-col items-center w-full p-3 md:w-2/3">
        <h1 className="text-lg font-medium">@{selectedUser?.username}'s_stat:</h1>
        {postCountToggle && <div className="w-full"><p className="w-full p-3 text-sm text-center">Posts:</p></div>}

        {followingToggle && <div className="w-full"><p className="w-full p-3 text-sm text-center">Following:</p></div>}

        {followersToggle && <div className="w-full"><p className="w-full p-3 text-sm text-center">Followers:</p></div>}

      </div>
    </div>
  )
}
