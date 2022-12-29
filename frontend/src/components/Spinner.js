import { Bars } from 'react-loader-spinner'
import { ThreeDots } from 'react-loader-spinner'
export function Spinner() {
  return (
    <div className='absolute top-0 left-0 z-50'>
      <div className="flex flex-col items-center justify-center w-screen h-screen bg-black/70">
        <Bars height="70" width="100" color="#ffffff" ariaLabel="bars-loading" wrapperStyle={{}} wrapperClass="" visible={true} />
        <p className='mt-3 text-sm italic tracking-wider text-white'>Patience is a virtue!</p>
        <p className='mt-1 text-white'>︶</p>
      </div>
    </div>
  )
}

export function ErrorInfo({ error }) {
  return (
    <div className="flex h-screen text-lg font-semibold text-gray-700">
      <div className='flex flex-col items-center justify-center w-screen p-5 h-3/5'>
        <div className='italic tracking-wide text-red-500 underline '>We are sorry for the inconvenience:</div>
        <div className='flex justify-center m-3 tracking-wide'>{error?.message}</div>
        <div className='text-3xl'>⛔</div>
      </div>
    </div>
  )
}

export function Dots() {
  return (
    <ThreeDots height="18" width="300" color="#ffffff" ariaLabel="three-dots-loading" wrapperStyle={{}} wrapperClass="" visible={true} />
  )
}
