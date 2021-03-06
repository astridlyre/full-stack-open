import React from 'react'
import { useQuery } from '@apollo/client'
import { ALL_AUTHORS } from '../queries'
import EditAuthor from './EditAuthor'
import PageWrapper from './PageWrapper'
import PageTitle from './PageTitle'

const Authors = ({ show, currentUser }) => {
  const authorsResult = useQuery(ALL_AUTHORS)
  const authors = authorsResult.data?.allAuthors || []

  if (!show) {
    return null
  }

  if (authorsResult.loading) {
    return (
      <PageWrapper>
        <PageTitle text='Loading...' />
      </PageWrapper>
    )
  }

  return (
    <PageWrapper>
      <PageTitle text='Authors' />
      <table className='mt-4 pt-4 border-t-2 border-gray-800 w-full text-sm sm:text-base flex-grow border-separate table-auto'>
        <tbody>
          <tr className='text-gray-800'>
            <th> </th>
            <th>born</th>
            <th>books</th>
          </tr>
          {authors.map(a => (
            <tr key={a.name}>
              <td className='text-gray-800 font-semibold'>{a.name}</td>
              <td className='text-center text-gray-800'>{a.born}</td>
              <td className='text-center text-gray-800'>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {currentUser && <EditAuthor authors={authors} />}
    </PageWrapper>
  )
}

export default Authors
