import React from 'react'
import Page from '../components/Page'
import PageTitle from '../components/PageTitle'
import Book from '../components/Book'
import { ReactComponent as Icon } from '../assets/img/book.svg'

const Books = ({ show, books }) => {
  if (!show) {
    return null
  }

  return (
    <Page>
      <div className='flex justify-between items-center w-full'>
        <PageTitle title='books' />
        <div className='mb-8 fade-slide-in-right-effect text-orange-500'>
          <Icon />
        </div>
      </div>
      <ul className='w-full'>
        {books.map(b => (
          <Book key={b.id} book={b} />
        ))}
      </ul>
    </Page>
  )
}

export default Books
