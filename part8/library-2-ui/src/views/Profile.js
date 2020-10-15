import React, { useEffect, useState, useRef } from 'react'
import Page from '../components/Page'
import PageTitle from '../components/PageTitle'
import { useField } from '../hooks/index'
import { ReactComponent as Icon } from '../assets/img/profile.svg'
import { useMutation, useQuery } from '@apollo/client'
import { EDIT_USER, ME, GET_BOOKS } from '../services'
import Book from '../components/Book'
import { ReactComponent as LoaderIcon } from '../assets/img/loader.svg'

const Profile = ({ show, setNotify }) => {
  const [editing, setEditing] = useState(false)
  const [name, , setName] = useField('text')
  const [genre, , setGenre] = useField('text')
  const nameEl = useRef(null)
  const genreEl = useRef(null)
  const getMe = useQuery(ME)
  const me = getMe.data?.me || null
  const [editUser] = useMutation(EDIT_USER, {
    refetchQueries: [
      { query: ME },
      { query: GET_BOOKS, variables: { genres: me?.genre } },
    ],
  })
  const getBooks = useQuery(GET_BOOKS, { variables: { genres: me?.genre } })
  const recommendedBooks = getBooks.data?.allBooks || []

  useEffect(() => {
    if (me) {
      setName(me.name || '')
      setGenre(me.genre || '')
    }
  }, [me, setName, setGenre])

  if (!show) {
    return null
  }

  const updateProfile = e => {
    e.preventDefault()
    if (editing) {
      editUser({
        variables: {
          username: me.username,
          name: name.value,
          genre: genre.value,
        },
      })
      setNotify(`Name and Genre updated!`)
      setEditing(false)
      nameEl.current.disabled = true
      genreEl.current.disabled = true
      window.getSelection().removeAllRanges()
      return
    }
    setEditing(true)
    nameEl.current.disabled = false
    genreEl.current.disabled = false
    nameEl.current.focus()
  }

  return (
    <Page>
      <div className='flex justify-between items-center relative w-full'>
        {getMe.data && <PageTitle title={`hello ${me.username}`} />}
        <div className='mb-8 fade-slide-in-right-effect text-orange-500'>
          <Icon />
        </div>
      </div>
      <form className='grid grid-cols-1 md:grid-cols-2 md:gap-x-8 gap-y-8 w-full'>
        <h3 className='font-semibold opacity-50 w-full flex items-center md:justify-end'>
          <span>Username</span>
          <span className='md:hidden'>: {me.username}</span>
        </h3>
        <h3 className='hidden md:flex font-semibold opacity-50 w-full items-center'>
          <span>{me.username}</span>
        </h3>
        <h3 className='font-semibold w-full flex items-center md:justify-end'>
          <span>Name</span>
        </h3>
        <input
          ref={nameEl}
          {...name}
          className={`${
            editing && 'border-orange-500'
          } form-input bg-gray-300 text-gray-900`}
          disabled={true}
        />
        <h3 className='font-semibold w-full flex items-center md:justify-end'>
          <span>Favourite Genre</span>
        </h3>
        <input
          ref={genreEl}
          {...genre}
          className={`${
            editing && 'border-orange-500'
          } form-input bg-gray-300 text-gray-900`}
          disabled={true}
        />
        <div className='hidden sm:block'></div>
        <button
          type='button'
          onClick={updateProfile}
          className='p-3 font-semibold text-sm text-gray-100 bg-gray-700 hover:bg-orange-700 rounded focus:bg-orange-700 ease-out-effect'>
          {editing ? 'Save Profile' : 'Edit Profile'}
        </button>
      </form>
      <ul className='w-full mt-8'>
        <div className='flex justify-between items-center relative w-full'>
          <PageTitle title='recommended books' />
        </div>
        {getBooks.loading && (
          <div className='w-full flex justify-center items-center text-orange-500'>
            <LoaderIcon />
          </div>
        )}
        {recommendedBooks.map(b => (
          <Book key={b.id} book={b} />
        ))}
      </ul>
    </Page>
  )
}

export default Profile
