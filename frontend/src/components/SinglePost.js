import { useContext } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import dayjs from "dayjs";

var relativeTime = require('dayjs/plugin/relativeTime')
dayjs.extend(relativeTime)

export default function SinglePost({ postsByUser }) {
  const { setSinglePostModal } = useContext(AuthContext);

  return (
    <div className='flex flex-col items-center justify-center'>
      {postsByUser && postsByUser?.length > 0
        ? postsByUser.sort((a, b) => a.published < b.published ? 1 : -1).map((post) => {
          return (
            <Link to={`${post.id}`} state={{ data: post }} key={post.id} className="z-0 pb-3 pl-3 pr-6 mb-5 border-t border-b border-gray-300 bg-gradient-to-r from-black rounded-xl hover:cursor-pointer">
              <div className="flex justify-between w-full p-2 text-center capitalize">
                <p className="font-semibold text-white">© {post.caption}</p>
                <p className="text-xs">⏱ {dayjs(post.published).fromNow(true)} ago</p>
              </div>
              <div className="relative">
                <img src={post.postImage} alt={post.caption} onClick={setSinglePostModal} className="object-contain object-center w-full max-w-md rounded" />
                <div className="absolute bottom-0 right-0 flex justify-around w-full p-5 text-white bg-black/50">
                  <p>❤️ {(post.likes.toFixed())}</p>
                  <p>💬 0</p>
                </div>
              </div>
            </Link>
          )
        })
        : null}

    </div>
  )
}
