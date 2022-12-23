import { useContext, useEffect, useState } from "react";
import AuthContext from "../../context/AuthContext";
import useToggle from "../../hooks/useToggle";
import Spinner from "../../components/Spinner";
import PostDetail from "../../components/PostDetail";
import dayjs from "dayjs";

var relativeTime = require('dayjs/plugin/relativeTime')
dayjs.extend(relativeTime)

export default function HomePage() {
  const { isLoading, setIsLoading, loggedUser, instance } = useContext(AuthContext);
  const [showPostDetail, setShowPostDetail] = useToggle(false)
  const [postsOfFollowing, setPostsOfFollowing] = useState({});
  const [singlePost, setSinglePost] = useState(null)

  useEffect(() => {
    setIsLoading(true);
    instance
      .get(`post/getPostsOfFollowing/${loggedUser.id}`)
      .then((res) => { setPostsOfFollowing(res.data) })
      .catch((err) => { console.log('Response - ' + err) })
      .finally(() => { setIsLoading(false) });
    // eslint-disable-next-line
  }, [loggedUser])

  if (isLoading) return <Spinner />;

  return (
    <div className='flex flex-col items-center justify-center px-1 py-5'>
      {postsOfFollowing && postsOfFollowing?.length > 0 ? postsOfFollowing.map((post) => {
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
