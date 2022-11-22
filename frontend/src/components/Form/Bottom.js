import { Link } from 'react-router-dom'
import getGP from '../../assets/getGP.png'
import getMS from '../../assets/getMS.png'

export default function Bottom({ signUpText }) {
  return (
    <div className="flex flex-col items-center justify-center px-6 my-3 bg-white border border-gray-300 border-solid rounded shadow py-7">
      <div className="flex flex-row justify-center text-center bg-white">

        {!signUpText ?
          <>
            <p className='mr-2'>Don't have an account?</p>
            <Link to='/registration' className='font-bold text-blue-600'>Sign up</Link>
          </>
          :
          <>
            <p className='mr-2'>Have an account?</p>
            <Link to='/login' className='font-bold text-blue-600'>Log in</Link>
          </>
        }
      </div>
      <p className='flex flex-row justify-center my-4 italic font-light text-center text-gray-500'>Get the app.</p>
      <div className="flex flex-row justify-center">
        <img src={getGP} alt="getGP" style={{ width: "120px", marginRight: "10px" }} />
        <img src={getMS} alt="getMS" style={{ width: "100px" }} />
      </div>
    </div>
  )
}
