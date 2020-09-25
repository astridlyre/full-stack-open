import React from 'react'

const Wrapper = ({ children }) => (
  <div className='w-screen min-h-screen bg-gray-900 flex flex-col items-center'>
    {children}
  </div>
)

export default Wrapper
