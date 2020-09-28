import React from 'react'

const PageWrapper = ({ children }) => (
  <div className='px-4 py-8 sm:px-8 md:p-16 flex flex-col sm:col-span-3 bg-gray-100 h-screen overflow-y-auto'>
    {children}
  </div>
)

export default PageWrapper
