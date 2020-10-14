import React from 'react'

const Notification = ({ text }) => (
  <div className='absolute inset-x-0 -mt-4 sm:mt-0 flex justify-center'>
    <div className='sm:px-16 px-4 w-full max-w-screen-lg'>
      <div className='px-3 py-2 font-semibold text-orange-500 bg-gray-800 fade-slide-up-effect rounded'>
        {text}
      </div>
    </div>
  </div>
)

export default Notification
