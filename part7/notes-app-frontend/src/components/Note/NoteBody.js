import React from 'react'

const NoteBody = ({ title, content }) => (
  <div className='px-8 py-4 w-full'>
    <h2 className='mt-2 text-blue-800 font-bold text-3xl'>{title}</h2>
    <section className='my-4 w-full leading-relaxed text-gray-800 font-medium'>
      {content}
    </section>
  </div>
)

export default NoteBody
