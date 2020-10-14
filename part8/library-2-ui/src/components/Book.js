import React from 'react'

const Book = ({ book }) => (
  <div className='p-4 rounded bg-gray-800 bg-opacity-25 hover:bg-opacity-50 mt-2 text-gray-200 fade-slide-in-effect flex flex-col sm:grid sm:grid-cols-3 sm:gap-x-4 justify-between'>
    <div className='sm:col-span-2'>
      <h3 className='text-2xl font-semibold'>{book.title}</h3>
      <ul className='flex'>
        {book.genres.map((g, i) => (
          <li key={i} className='mr-2 text-orange-500 opacity-50 font-semibold'>
            {g}
          </li>
        ))}
      </ul>
    </div>

    <div className='flex flex-col sm:items-end mt-4 sm:mt-0 sm:text-right'>
      <h4>by {book.author.name}</h4>
      <span className='text-gray-500 opacity-75'>
        published {book.published}
      </span>
    </div>
  </div>
)

export default Book
