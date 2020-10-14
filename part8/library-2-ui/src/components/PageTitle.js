import React from 'react'

const PageTitle = ({ title }) => (
  <h2 className='text-4xl font-bold text-orange-500 pb-8 fade-slide-in-effect'>
    <span className='opacity-50'>#</span>
    {title}
  </h2>
)

export default PageTitle
