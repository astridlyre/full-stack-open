import React from 'react'

const Wrapper = ({ children }) => (
  <section className='flex flex-col justify-start items-center text-dark font-display sm:rounded px-2 sm:px-0'>
    {children}
  </section>
)

export default Wrapper
