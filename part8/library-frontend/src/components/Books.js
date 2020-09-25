import React from 'react'
import { useQuery } from '@apollo/client'
import { ALL_BOOKS } from '../queries'

const Books = ({ show }) => {
  const booksResult = useQuery(ALL_BOOKS)
  const books = booksResult.data?.allBooks || []

  if (!show) {
    return null
  }

  return (
    <div>
      <h2 className='font-black text-4xl text-pink-700'>Books</h2>
      <table className='mt-4 pt-4 border-t-2 border-gray-800 w-full text-sm sm:text-base'>
        <tbody>
          <tr className='text-gray-800'>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {books.map(a => (
            <tr key={a.title}>
              <td className=' font-semibold'>{a.title}</td>
              <td className=''>{a.author}</td>
              <td className=''>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Books
