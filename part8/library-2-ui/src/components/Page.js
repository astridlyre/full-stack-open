import React from 'react'

const Page = ({ children }) => (
  <main className='bg-gray-800 bg-opacity-25 p-4 sm:p-16 rounded-lg w-full text-gray-300 fade-slide-down-effect flex flex-col items-center'>
    {children}
  </main>
)

export default Page
