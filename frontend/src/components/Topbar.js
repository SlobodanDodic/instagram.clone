import AuthContext from '../context/AuthContext';
import useToggle from '../hooks/useToggle';
import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { toast } from "react-toastify";

import { RiCompassDiscoverLine } from 'react-icons/ri';
import { IoIosLogOut } from 'react-icons/io';
import { MdEditNote, MdOutlineSettingsSuggest } from 'react-icons/md';
import { GoHome } from 'react-icons/go';

import logoText from '../assets/logoText.png';
import logo from '../assets/logo.png';
import avatar from '../assets/avatar.jpeg';

export default function Topbar() {
  const { setUser, user, setPostModal, setSearchModal, loggedUser } = useContext(AuthContext);
  const [open, setOpen] = useToggle(false);

  const iconStyle = { height: "1.45rem", width: "1.45rem", marginRight: "1rem" }
  const iconStyleDrop = { height: "1.25rem", width: "1.25rem", marginRight: "1rem" }

  const signOut = () => {
    setUser(null);
    toast.success('Successfully logged out!');
  }

  return (
    <div className='w-screen py-2 bg-white shadow'>
      <div className='h-12'>
        <div className='flex justify-between h-full max-w-screen-xl mx-auto'>

          <div className="flex flex-row items-center mx-3 hover:cursor-text">
            <img src={logo} alt="avatar-logo" className='object-cover object-center w-6 h-6 mr-2' />
            <img src={logoText} alt="Instagram" className="w-24" />
          </div>

          <div className="flex align-middle">
            <Link to='/' className='flex flex-row items-center justify-center text-sm'><GoHome style={iconStyle} /></Link>
            <Link to='/discover' className='flex flex-row items-center justify-center text-sm'><RiCompassDiscoverLine style={iconStyle} /></Link>

            <div onClick={setOpen} className="relative z-20 flex flex-row items-center justify-center pr-3 text-sm hover:cursor-pointer">
              <img src={loggedUser?.profileImage ? loggedUser?.profileImage : avatar} alt="avatar-profile" className='inline object-cover w-6 h-6 p-px rounded-full bg-gradient-to-b from-red-600 via-purple-600 to-pink-700' />
              <span className="pb-1 ml-1 text-gray-dark">⌵</span>
              <div className={open ? "absolute right-0 flex flex-col w-screen px-2 bg-white border-b border-l border-gray top-12 rounded-l-md" : 'hidden'}>
                <Link to={"/profile/" + user} state={{ data: loggedUser }} className='flex flex-row items-center justify-end py-1 my-1 rounded hover:bg-gray/10'><h1 className='inline mr-5 text-xs capitalize' >@{user}</h1><MdEditNote style={iconStyleDrop} /></Link>
                <Link to={'/account/' + user} className='flex flex-row items-center justify-end py-1 my-1 rounded hover:bg-gray/10'><h1 className='inline mr-5 text-xs' >Account</h1><MdOutlineSettingsSuggest style={iconStyleDrop} /></Link>
                <Link onClick={signOut} className='flex flex-row items-center justify-end py-1 my-1 rounded hover:bg-gray/10'><h1 className='inline mr-5 text-xs' >Log out</h1><IoIosLogOut style={iconStyleDrop} /></Link>
              </div>
            </div>

          </div>

        </div>
      </div>

      <div className='flex flex-col-reverse justify-between w-screen max-w-screen-xl p-2 mx-auto text-sm text-justify bg-white md:flex-row text-gray' >
        <div className="relative">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none"><svg className="w-5 h-5" fill="none" stroke="white" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg></div>
          <button onClick={setSearchModal} className="w-full p-2 my-3 md:m-0 md:w-48 btn-add bg-instagram">Search</button>
        </div>
        <div className="relative">
          <button onClick={setPostModal} className="w-full p-2 my-3 md:m-0 md:w-48 btn-add bg-instagram">Add new post</button>
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none"><svg className="w-6 h-6 pt-1" fill="none" stroke="white" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"></path></svg></div>
        </div>
      </div>
    </div>
  )
}