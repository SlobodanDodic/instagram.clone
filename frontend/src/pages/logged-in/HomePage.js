import { useContext, useEffect, useState } from "react";
import AuthContext from "../../context/AuthContext";
import { useNavigate, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import useToggle from "../../hooks/useToggle";
import { Spinner, ErrorInfo } from "../../components/Spinner";
import PostDetail from "../../components/PostDetail";
import dayjs from "dayjs";
import PostDisplay from "../../components/PostDisplay";

var relativeTime = require('dayjs/plugin/relativeTime')
dayjs.extend(relativeTime)

export default function HomePage() {
  const { instance, loggedUser } = useContext(AuthContext);
  const [showPostDetail, setShowPostDetail] = useToggle(false)
  const [singlePost, setSinglePost] = useState(null)

  const getPostsOfFollowing = async () => {
    const data = await instance.get(`/post/getPostsOfFollowing/${loggedUser?.id}`);
    return data.data;
  }
  const { data: postsOfFollowing, isLoading, isError, error } = useQuery(['getPostsOfFollowing'], () => getPostsOfFollowing())

  const { postId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const id = postsOfFollowing?.find((el) => el.id === postId);
    if (id) {
      setSinglePost(id);
    }
  }, [postId, postsOfFollowing])

  if (isLoading) return <Spinner />
  if (isError) return <ErrorInfo error={error} />

  return (
    <div className='flex flex-col items-center justify-center px-1 py-5'>
      {postsOfFollowing && postsOfFollowing?.length > 0 ? postsOfFollowing?.map((post) => (
        <div key={post.id}>
          <button onClick={() => navigate(`/${post?.id}`)} className="z-0 pb-3 pl-3 pr-6 mb-5 border-t border-b border-gray-300 bg-gradient-to-r from-black rounded-xl">
            <div className="flex justify-between w-full p-2 text-center capitalize">
              <p className="font-semibold text-white">© {post.caption}</p>
              <p className="text-xs">⏱ {dayjs(post.published).fromNow(true)} ago</p>
            </div>
            <PostDisplay setShowPostDetail={setShowPostDetail} post={post} />
          </button>

          {singlePost && showPostDetail ? <PostDetail post={singlePost} setShowPostDetail={setShowPostDetail} /> : null}
        </div>
      )
      )
        : <div className="px-4 mt-4 text-center text-gray-500">Either you don't follow anyone or those people don't have posts.</div>}
    </div>
  )

}
