import AuthContext from '../context/AuthContext';
import ToggleContext from '../context/ToggleContext';
import { useContext, useState } from 'react';
import { IoMdClose } from 'react-icons/io';
import { useQuery } from '@tanstack/react-query';
import UserLink from './UserLink';

export default function Search() {
  const { instance } = useContext(AuthContext);
  const { searchModal, setSearchModal } = useContext(ToggleContext);

  const [searchText, setSearchText] = useState("");

  const getSearchedUsers = async () => {
    const data = await instance.get(`users/${searchText}`)
    return data.data;
  }
  const { data: searchResults, refetch } = useQuery(['getSearchedUsers', searchText], () => getSearchedUsers(), {
    enabled: false,
  })

  const cleanAndExit = () => {
    setSearchText('')
    setSearchModal()
  }

  return (
    <div className={searchModal ? 'absolute z-50' : 'hidden'}>
      <div className="flex items-center justify-center w-screen h-screen p-3 bg-black/70 md:p-10">
        <div className="relative w-full max-w-screen-lg bg-white rounded-lg shadow h-3/5">

          <div className="flex items-center justify-center py-2 text-sm text-gray-700 border-b border-gray-300 rounded-t">Search for other users<IoMdClose onClick={cleanAndExit} className='absolute top-2 right-2 hover:cursor-pointer' /></div>

          <div className="flex flex-col justify-center mx-auto my-2 md:flex-row">
            <input onChange={(e) => setSearchText(e.target.value)} type="search" id="search" className="flex w-5/6 h-8 p-2 mx-auto my-1 text-sm text-gray-700 border border-gray-300 rounded md:mx-2 md:w-60 focus:ring-gray-400 focus:border-gray-400 focus:outline-none" placeholder="Search" required />
            <button onClick={() => refetch()} className="flex items-center w-5/6 h-8 px-2 mx-auto my-1 text-sm text-white bg-blue-500 border rounded md:mx-2 md:w-44 hover:bg-blue-600/90">Search by username</button>
          </div>

          {searchResults?.length > 0 ? (
            <div className='flex flex-wrap justify-center'>
              {searchResults.sort((a, b) => a.username > b.username ? 1 : -1).map((item, i) => (
                <UserLink searchItem={item} key={i} cleanAndExit={cleanAndExit} />
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