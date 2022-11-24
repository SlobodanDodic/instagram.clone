import AuthContext from '../context/AuthContext';
import { useContext, useState } from 'react';
import { IoMdClose } from 'react-icons/io';
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import avatar from '../assets/avatar.jpeg';

export default function Search() {
  const { searchModal, setSearchModal } = useContext(AuthContext);

  const [searchText, updateSearchText] = useState("");
  const [searchResults, updateSearchResults] = useState([]);

  function search() { console.log(searchText); }

  const cleanAndExit = () => {
    setSearchModal()
    updateSearchText('')
    updateSearchResults([])
  }

  return (
    <div className={searchModal ? 'absolute z-50' : 'hidden'}>
      <div className="flex items-center justify-center w-screen h-screen p-3 bg-black/70 md:p-10">
        <div className="relative w-full max-w-screen-lg bg-white rounded-lg shadow h-3/5">

          <div className="flex items-center justify-center py-2 text-sm text-gray-700 border-b border-gray-300 rounded-t">Search for other users<IoMdClose onClick={cleanAndExit} className='absolute top-2 right-2 hover:cursor-pointer' /></div>

          <div className="flex flex-col justify-center mx-auto my-2 md:flex-row">
            <input onChange={(e) => updateSearchText(e.target.value)} type="search" id="search" className="flex w-5/6 h-8 p-2 mx-auto my-1 text-sm text-gray-700 border border-gray-300 rounded md:mx-2 md:w-60 focus:ring-gray-400 focus:border-gray-400 focus:outline-none" placeholder="Search" required />
            <button onClick={search} className="flex items-center w-5/6 h-8 px-2 mx-auto my-1 text-sm text-white bg-blue-500 border rounded md:mx-2 md:w-44 hover:bg-blue-600/90">Search by username</button>
          </div>

          {searchResults.length > 0 ? (
            <div className='flex flex-wrap justify-center'>
              <Link to={"/profile/"}
                onClick={() => { cleanAndExit(); toast.success(`Welcome to @username's profile`) }}
                className="flex px-3 py-1 m-3 rounded shadow">
                <img src={avatar} alt='profile' className='inline object-cover w-12 h-12 mr-1 rounded-full' />
                <div className="text-xs text-gray-700">@username</div>
              </Link>
            </div>
          ) : (
            <div className='flex flex-wrap justify-center pt-5 text-sm text-gray-700'>No Search Results</div>
          )}

        </div>
      </div>
    </div>

  )
}