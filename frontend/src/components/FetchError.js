import React from 'react'

export default function FetchError({ fetchError }) {
  return (
    <div className="flex h-screen text-lg font-semibold text-gray-500">
      <div className='flex flex-col items-center justify-center w-screen h-3/5'>
        <div className='italic underline'>We are sorry for the inconvenience of:</div>
        <div className='my-3'>⋯⋯⋯⋯ {fetchError} ⋯⋯⋯⋯</div>
        <div className='text-3xl'>⛔</div>
      </div>
    </div>
  )
}
