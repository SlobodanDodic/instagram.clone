import { Link } from "react-router-dom";
import avatar from '../assets/avatar.jpeg'
import dayjs from "dayjs";

var relativeTime = require('dayjs/plugin/relativeTime')
dayjs.extend(relativeTime)

export default function Comment({ single }) {

  return (
    <div className="flex mb-4 ml-1">
      <Link to={`/profile/${single?.commentAuthor?.username}`} className="flex flex-col justify-center w-16">
        <img src={single?.commentAuthor?.profileImage ? single?.commentAuthor?.profileImage : avatar} alt='profile' className='inline object-cover p-px rounded-full w-11 h-11 bg-gradient-to-b from-red-600 via-purple-600 to-pink-700' />
      </Link>
      <div className="flex flex-col justify-center w-full text-xs">
        <div className="font-semibold text-gray-700">@{single?.commentAuthor?.username}</div>
        <p className="pb-1 text-gray-800">{single?.body}</p>
        <p className="font-semibold text-gray-400">{dayjs(single?.created_at).format('MMM. DD, YYYY / HH:mm')}</p>
      </div>
    </div>
  )
}
