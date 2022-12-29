import { useContext } from "react";
import AuthContext from "../../context/AuthContext";
import { useQuery } from "@tanstack/react-query";
import { Spinner, ErrorInfo } from "../../components/Spinner";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import avatar from '../../assets/avatar.jpeg';

export default function DiscoverPage() {
  const { instance, loggedUser } = useContext(AuthContext);

  const discover = async () => {
    const data = await instance.get(`/users/discover/${loggedUser.id}`);
    return data.data;
  }
  const { data, isLoading, isError, error } = useQuery(['discover'], () => discover())
  const discoverUsers = data?.[0]?.following;

  if (isLoading) return <Spinner />
  if (isError) return <ErrorInfo error={error} />

  return (
    <div className='flex flex-col items-center justify-center px-1 py-5'>
      <div className="my-4 text-gray-500">Discover some new friends: </div>
      {discoverUsers?.length > 0 ? (
        <div className='flex flex-wrap justify-center'>
          {discoverUsers?.sort((a, b) => a.username > b.username ? 1 : -1).map((item, i) => (
            <Link key={i} to={`/profile/${item?.following?.username}`} state={{ data: item.following }}
              onClick={() => { toast.success(`Welcome to @${item?.following?.username}'s profile`) }}
              className="flex px-3 py-1 m-3 rounded shadow">
              <img src={item?.following?.profileImage ? item?.following?.profileImage : avatar} alt='profile' className='inline object-cover w-16 h-16 mr-1 rounded-full' />
              <div className="text-xs text-gray-700">@{item?.following?.username}</div>
            </Link>
          ))}
        </div>
      ) : (
        <div className='flex flex-wrap justify-center pt-5 text-sm text-gray-700'>No Results</div>
      )}
    </div>
  )
}
