import React, { useState } from 'react'
import { useField } from '../hooks/index'
import Page from '../components/Page'
import PageTitle from '../components/PageTitle'
import LabeledInput from '../components/LabeledInput'
import LabelInput from '../components/LabeledInput'
import { useMutation } from '@apollo/client'
import { ADD_BOOK, GET_AUTHORS_AND_BOOKS } from '../services/index'
import { ReactComponent as Icon } from '../assets/img/pencil.svg'

const NewBook = ({ show, setNotify }) => {
  const [title, clearTitle] = useField('text')
  const [author, clearAuthor] = useField('text')
  const [published, clearPublished] = useField('number')
  const [genre, clearGenre] = useField('text')
  const [genres, setGenres] = useState([])

  const [addBook] = useMutation(ADD_BOOK, {
    refetchQueries: [{ query: GET_AUTHORS_AND_BOOKS }],
  })

  if (!show) {
    return null
  }

  const submit = event => {
    event.preventDefault()

    addBook({
      variables: {
        title: title.value,
        published: +published.value,
        author: author.value,
        genres,
      },
    }).catch(e => console.log(e))

    setNotify(`Created Book: ${title.value}`)

    clearTitle()
    clearAuthor()
    clearPublished()
    clearPublished()
    clearGenre()
    setGenres([])
  }

  const addGenre = () => {
    setNotify(`Added genre: ${genre.value}`)
    setGenres(genres.concat(genre.value))
    clearGenre()
  }

  return (
    <Page>
      <div className='flex justify-between items-center relative w-full'>
        <PageTitle title='add book' />
        <div className='mb-8 fade-slide-in-right-effect text-orange-500'>
          <Icon />
        </div>
      </div>
      <form
        className='grid grid-cols-1 md:grid-cols-2 md:gap-x-8 gap-y-4'
        onSubmit={submit}>
        <LabelInput input={title} text='Title' />
        <LabeledInput input={author} text='Author' />
        <LabeledInput input={published} text='Published' />
        <div className='md:flex md:items-end'>
          <LabeledInput input={genre} text='Add Genres' />
          <button
            onClick={addGenre}
            type='button'
            className='md:ml-2 md:mt-0 mt-4 w-full lg:w-1/2 px-8 py-2 border-2 border-gray-700 hover:border-orange-700 hover:text-orange-500 rounded font-semibold text-sm focus:border-orange-700 ease-out-effect'>
            Add Genre
          </button>
        </div>

        <div className='py-2'>
          <span className='font-semibold'>Genres:</span>{' '}
          {genres.map((g, i) => (
            <span key={i} className='inline-block ml-2 font-semibold'>
              {g}
            </span>
          ))}
        </div>
        <button
          type='submit'
          className='p-3 font-semibold text-sm text-gray-100 bg-gray-700 hover:bg-orange-700 rounded focus:bg-orange-700 ease-out-effect'>
          Add Book
        </button>
      </form>
    </Page>
  )
}

export default NewBook
