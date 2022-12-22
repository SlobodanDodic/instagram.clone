import AuthContext from '../context/AuthContext';
import { useContext, useState } from 'react';
import { IoMdClose } from 'react-icons/io';
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import avatar from '../assets/avatar.jpeg';
import Spinner from './Spinner';

export default function Search() {
  const { instance, searchModal, setSearchModal, isLoading, setIsLoading } = useContext(AuthContext);

  const [searchText, setSearchText] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const search = (e) => {
    e.preventDefault();
    setIsLoading(true);
    instance
      .get("users/" + searchText)
      .then((res) => { setSearchResults(res.data) })
      .catch((err) => { console.log('Response - ' + err); })
      .finally(() => setIsLoading(false));
  };

  const cleanAndExit = () => {
    setSearchModal()
    setSearchText('')
    setSearchResults([])
  }

  if (isLoading) return <Spinner />;

  return (
    <div className={searchModal ? 'absolute z-50' : 'hidden'}>
      <div className="flex items-center justify-center w-screen h-screen p-3 bg-black/70 md:p-10">
        <div className="relative w-full max-w-screen-lg bg-white rounded-lg shadow h-3/5">

          <div className="flex items-center justify-center py-2 text-sm text-gray-700 border-b border-gray-300 rounded-t">Search for other users<IoMdClose onClick={cleanAndExit} className='absolute top-2 right-2 hover:cursor-pointer' /></div>

          <div className="flex flex-col justify-center mx-auto my-2 md:flex-row">
            <input onChange={(e) => setSearchText(e.target.value)} type="search" id="search" className="flex w-5/6 h-8 p-2 mx-auto my-1 text-sm text-gray-700 border border-gray-300 rounded md:mx-2 md:w-60 focus:ring-gray-400 focus:border-gray-400 focus:outline-none" placeholder="Search" required />
            <button onClick={search} className="flex items-center w-5/6 h-8 px-2 mx-auto my-1 text-sm text-white bg-blue-500 border rounded md:mx-2 md:w-44 hover:bg-blue-600/90">Search by username</button>
          </div>

          {searchResults.length > 0 ? (
            <div className='flex flex-wrap justify-center'>
              {searchResults.sort((a, b) => a.username > b.username ? 1 : -1).map((item, i) => (
                <Link key={i} to={`/profile/${item?.username}`} state={{ data: item }}
                  onClick={() => { cleanAndExit(); toast.success(`Welcome to @${item?.username}'s profile`) }}
                  className="flex px-3 py-1 m-3 rounded shadow">
                  <img src={item?.profileImage ? item?.profileImage : avatar} alt='profile' className='inline object-cover w-16 h-16 mr-1 rounded-full' />
                  <div className="text-xs text-gray-700">@{item?.username}</div>
                </Link>
              ))}
            </div>
          ) : (
            <div className='flex flex-wrap justify-center pt-5 text-sm text-gray-700'>No Search Results</div>
          )}

        </div>
      </div>
    </div>

  )
}