import { useContext, useState } from 'react';
import { useParams } from "react-router-dom";
import { useMutation, useQueryClient } from '@tanstack/react-query';
import AuthContext from '../context/AuthContext';
import { IoMdClose } from 'react-icons/io';
import avatar from '../assets/avatar.jpeg';

export default function EditProfile({ setShowModal, userProfile }) {
  const { instance } = useContext(AuthContext);
  const { username } = useParams();
  const [bio, setBio] = useState('');
  const [profileImage, setProfileImage] = useState({ myFile: "" });
  const queryClient = useQueryClient()

  const updateUsersProfile = async () => {
    return await instance.patch(`/users/${username}`, { bio: bio, profileImage: profileImage?.myFile });
  }

  const updateUsersProfileMutation = useMutation(updateUsersProfile, {
    onSuccess: () => queryClient.invalidateQueries('findUserProfile')
  })

  const updateProfile = () => {
    updateUsersProfileMutation.mutate();
    setShowModal();
  }

  const convertToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onload = () => { resolve(fileReader.result) };
      fileReader.onerror = (error) => { reject(error) };
    });
  };
  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    const base64 = await convertToBase64(file);
    setProfileImage({ ...profileImage, myFile: base64 });
  };

  return (
    <div className='absolute top-0 left-0 z-50'>
      <div className="flex items-center justify-center w-screen h-screen bg-black/70 md:p-10">

        <div className="relative flex flex-col w-full max-w-screen-lg bg-white rounded-lg shadow h-4/5">
          <div className="flex items-center justify-center py-4 text-sm border-b border-gray-300 rounded-t">Edit your profile<IoMdClose onClick={setShowModal} className='absolute top-4 right-2 hover:cursor-pointer' /></div>

          <div className="flex flex-col items-center justify-center pb-3 text-xs">
            <div className="flex flex-col items-center my-4">
              {userProfile?.profileImage ? (
                <img src={userProfile?.profileImage} alt={userProfile?.username} className="profile" />
              ) : (
                <img src={profileImage === '' ? userProfile?.profileImage : avatar} alt={userProfile?.username} className="profile" />
              )}
            </div>
            <div className='px-2 py-1 mx-auto text-xs text-gray-400 rounded-lg shadow-inner bg-gray-50/50'>
              <input type="file" accept="image/*" label="Image" name="myFile" onChange={(e) => handleFileUpload(e)} />
            </div>
            <div className="w-full px-3 my-5">
              <label className='block mb-3 font-medium text-center text-gray-600' htmlFor="bio">About me:</label>
              <textarea rows="3" type="text" placeholder={userProfile?.bio} defaultValue={bio} onChange={(e) => setBio(e.target.value)} className='block w-full px-2 py-1 mx-auto text-xs rounded-lg shadow-inner bg-gray-50/50 md:w-1/2' />
            </div>

            <div> <button className='mt-4 btn-add bg-blue' onClick={updateProfile}> Submit </button>  </div>
          </div>

        </div>
      </div>
    </div>

  )
}