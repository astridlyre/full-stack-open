import React from 'react'

const Wrapper = ({ children }) => (
  <div className='w-full h-screen overflow-hidden bg-gray-900 sm:grid sm:grid-cols-5 flex flex-col-reverse justify-end sm:flex-none'>
    {children}
  </div>
)

export default Wrapper
