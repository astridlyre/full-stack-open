import React, { useState } from 'react'
import { useField } from '../hooks'
import { ADD_BOOK, ALL_AUTHORS, ALL_BOOKS } from '../queries'
import { useMutation } from '@apollo/client'
import LabeledInput from './LabeledInput'
import Button from './Button'
import PageWrapper from './PageWrapper'
import PageTitle from './PageTitle'

const NewBook = ({ show }) => {
  const [title, clearTitle] = useField('text')
  const [author, clearAuthor] = useField('text')
  const [published, clearPublished] = useField('number')
  const [genre, clearGenre] = useField('text')
  const [genres, setGenres] = useState([])

  const [createBook] = useMutation(ADD_BOOK, {
    refetchQueries: [{ query: ALL_AUTHORS }, { query: ALL_BOOKS }],
  })

  if (!show) {
    return null
  }

  const submit = async event => {
    event.preventDefault()
    createBook({
      variables: {
        title: title.value,
        author: author.value,
        published: +published.value,
        genres,
      },
    }).catch(e => console.log(e))

    clearTitle()
    clearAuthor()
    clearPublished()
    clearGenre()
    setGenres([])
  }

  const addGenre = () => {
    setGenres(genres.concat(genre.value))
    clearGenre()
  }

  return (
    <PageWrapper>
      <PageTitle text='Add book' />
      <form
        onSubmit={submit}
        className='sm:grid sm:grid-cols-2 sm:gap-x-4 sm:gap-y-4 mt-8'>
        <LabeledInput text='Title' name='title' input={title} minLength='2' />
        <LabeledInput
          text='Author'
          name='author'
          input={author}
          minLength='2'
        />
        <LabeledInput text='Published' name='published' input={published} />
        <div className='flex flex-col'>
          <LabeledInput text='Genre' name='genre' input={genre} />
          <Button
            text='Add genre'
            onClick={addGenre}
            look='btn-animation mt-2 px-6 py-2 bg-gray-400 text-gray-800 rounded-sm hover:bg-gray-500 text-sm font-semibold'
          />
        </div>
        <div className='mt-4 sm:mt-0 pb-4 col-span-2'>
          <h6 className='mb-2 font-semibold text-sm md:text-lg text-gray-800'>
            Genres:{' '}
          </h6>
          {genres &&
            genres.map((genre, i) => (
              <span
                key={i}
                className={
                  i === 0
                    ? 'p-2 bg-gray-700 font-semibold text-sm text-gray-100 rounded-lg'
                    : 'ml-2 p-2 bg-gray-700 font-semibold text-sm text-gray-100 rounded-lg'
                }>
                {genre}
              </span>
            ))}
        </div>
        <Button
          type='submit'
          text='Add book'
          look='btn-animation w-full px-6 py-2 bg-pink-700 text-gray-100 rounded-sm hover:bg-pink-900 text-sm font-semibold'
        />
      </form>
    </PageWrapper>
  )
}

export default NewBook
