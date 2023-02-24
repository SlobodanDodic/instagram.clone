import { useContext } from "react";
import AuthContext from "../context/AuthContext";

export default function PostDisplay({ post, setShowPostDetail }) {
  const { instance } = useContext(AuthContext);

  // eslint-disable-next-line
  const getImages = async () => {
    return await instance.get(`/post/${post?.postImage}`);
  }

  return (
    <div onClick={setShowPostDetail} className="relative hover:cursor-pointer">
      <img src={`${process.env.REACT_APP_SERVER}/post/${post.postImage}`} alt={post.caption} className="object-contain object-center w-full max-w-md rounded" />
      <div className="absolute bottom-0 right-0 flex justify-around w-full p-5 text-white bg-black/50">
        <p>❤️ {post?.likes ? post?.likes?.length : 0}</p>
        <p>💬 {post?.comments ? post?.comments?.length : 0}</p>
      </div>
    </div>
  )
}
