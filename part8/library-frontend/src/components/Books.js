import React from 'react'
import { useQuery } from '@apollo/client'
import { ALL_BOOKS } from '../queries'
import PageWrapper from './PageWrapper'
import PageTitle from './PageTitle'

const Books = ({ show }) => {
  const booksResult = useQuery(ALL_BOOKS)
  const books = booksResult.data?.allBooks || []

  if (!show) {
    return null
  }

  return (
    <PageWrapper>
      <PageTitle text='Books' />
      <table className='mt-4 pt-4 border-t-2 border-gray-800 w-full text-sm sm:text-base flex-grow border-separate table-auto'>
        <tbody>
          <tr className='text-gray-800'>
            <th></th>
            <th className='text-left'>Author</th>
            <th className='text-left'>Published</th>
          </tr>
          {books.map(a => (
            <tr key={a.title}>
              <td className=' font-semibold'>{a.title}</td>
              <td className=''>{a.author.name}</td>
              <td className=''>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </PageWrapper>
  )
}

export default Books
