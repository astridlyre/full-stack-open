import React, { useState } from 'react'
import Page from '../components/Page'
import PageTitle from '../components/PageTitle'
import Book from '../components/Book'
import Filter from '../components/Filter'
import { ReactComponent as Icon } from '../assets/img/book.svg'
import { useLazyQuery, useQuery } from '@apollo/client'
import { GET_BOOKS, GET_GENRES } from '../services'
import { useEffect } from 'react'
import { ReactComponent as LoaderIcon } from '../assets/img/loader.svg'

const Books = ({ show }) => {
  const [filter, setFilter] = useState(null)
  const [showingFilter, setShowingFilter] = useState(false)
  const [filteredBooks, filteredBooksResult] = useLazyQuery(GET_BOOKS)
  const genresResult = useQuery(GET_GENRES)
  const genres = genresResult.data?.allBooks || []
  const booksToShow = filteredBooksResult.data?.allBooks || []

  const genresToShow = () => {
    const genresArray = []
    genres.forEach(b => genresArray.push(...b.genres))
    return new Set(genresArray)
  }

  useEffect(() => {
    filteredBooks(
      filter
        ? {
            variables: {
              genres: filter,
            },
          }
        : null
    )
  }, [filter, filteredBooks])

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
      <div className='w-full'>
        <button
          onClick={() => setShowingFilter(!showingFilter)}
          className='font-semibold text-sm w-full p-2 bg-gray-800 bg-opacity-50 rounded hover:bg-opacity-100'>
          {showingFilter
            ? ` hide filter ${filter ? `(filtering by: ${filter})` : ''}`
            : ` show filters ${filter ? `(filtering by: ${filter})` : ''}`}
        </button>
        {showingFilter && (
          <Filter
            filter={filter}
            setFilter={setFilter}
            genres={genresToShow()}
          />
        )}
      </div>
      {filteredBooksResult.loading && (
        <div className='w-full h-64 flex justify-center items-center text-orange-500'>
          <LoaderIcon />
        </div>
      )}
      <ul className='w-full'>
        {booksToShow.map(b => (
          <Book key={b.id} book={b} />
        ))}
      </ul>
    </Page>
  )
}

export default Books
