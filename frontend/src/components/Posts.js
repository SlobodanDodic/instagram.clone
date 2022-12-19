import { useState } from "react";
import useToggle from "../hooks/useToggle";
import PostDetail from "./PostDetail";
import dayjs from "dayjs";

var relativeTime = require('dayjs/plugin/relativeTime')
dayjs.extend(relativeTime)

export default function Posts({ usersPosts }) {
  const [singlePost, setSinglePost] = useState(null)
  const [showPostDetail, setShowPostDetail] = useToggle(false)

  return (
    <div className='flex flex-col items-center justify-center'>
      {usersPosts && usersPosts?.length > 0
        ? usersPosts.sort((a, b) => a.published < b.published ? 1 : -1).map((post) => {
          return (
            <div key={post.id}>
              <button onClick={() => setSinglePost(post)} className="z-0 pb-3 pl-3 pr-6 mb-5 border-t border-b border-gray-300 bg-gradient-to-r from-black rounded-xl">
                <div className="flex justify-between w-full p-2 text-center capitalize">
                  <p className="font-semibold text-white">© {post.caption}</p>
                  <p className="text-xs">⏱ {dayjs(post.published).fromNow(true)} ago</p>
                </div>
                <div onClick={setShowPostDetail} className="relative hover:cursor-pointer">
                  <img src={post.postImage} alt={post.caption} className="object-contain object-center w-full max-w-md rounded" />
                  <div className="absolute bottom-0 right-0 flex justify-around w-full p-5 text-white bg-black/50">
                    <p>❤️ {post?.likes ? post?.likes?.length : 0}</p>
                    <p>💬 {post?.comments ? post?.comments?.length : 0}</p>
                  </div>
                </div>
              </button>

              {showPostDetail ? <PostDetail post={singlePost} setShowPostDetail={setShowPostDetail} /> : null}
            </div>
          )
        })
        : null}
    </div>
  )
}
