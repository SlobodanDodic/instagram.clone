import { Bars } from 'react-loader-spinner'

export default function Spinner() {
  return (
    <div className='absolute top-0 left-0 z-50'>
      <div className="flex flex-col items-center justify-center w-screen h-screen bg-black/70">

        <Bars
          height="70"
          width="100"
          color="#ffffff"
          ariaLabel="bars-loading"
          wrapperStyle={{}}
          wrapperClass=""
          visible={true}
        />
        <p className='mt-3 text-sm italic tracking-wider text-white'>Patience is a virtue!</p>
        <p className='mt-1 text-white'>︶</p>

      </div>
    </div>
  )
}
