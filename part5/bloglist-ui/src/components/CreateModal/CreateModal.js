import React, { useState } from 'react'
import Button from '../Buttons/Button'
import { ReactComponent as UpIcon } from '../../assets/img/up.svg'
import { useDispatch, useSelector } from 'react-redux'
import { createEntry } from '../../reducers/blogReducer'
import {
  makeNotification,
  notification,
} from '../../reducers/notificationReducer'

const CreateModal = ({ setShowCreateModal }) => {
  const dispatch = useDispatch()
  const currentUser = useSelector(state => state.currentUser)
  const [titleInput, setTitleInput] = useState('')
  const [authorInput, setAuthorInput] = useState('')
  const [urlInput, setUrlInput] = useState('')

  const createBlogEntry = event => {
    event.preventDefault()
    try {
      dispatch(createEntry(titleInput, authorInput, urlInput, currentUser))
    } catch (e) {
      dispatch(makeNotification(notification(`${e.message}`, 'red'), 3))
    }
    setTitleInput('')
    setAuthorInput('')
    setUrlInput('')
    setShowCreateModal(false)
  }

  return (
    <form
      onSubmit={createBlogEntry}
      className='flex flex-col items-center justify-start w-full bg-l-accent text-dark createmodal'>
      <div className='sm:p-16 p-4 w-full'>
        <h3 className='mb-8 text-2xl font-semibold'>submit a new entry</h3>
        <label htmlFor='createmodal-title' className='flex flex-col w-full'>
          <span className='text-sm font-semibold'>title</span>
          <input
            type='text'
            id='createmodal-title'
            className='form-input titleinput'
            value={titleInput}
            onChange={({ target }) => setTitleInput(target.value)}
            required
          />
        </label>
        <label
          htmlFor='createmodal-author'
          className='mt-4 flex flex-col w-full'>
          <span className='text-sm font-semibold'>author</span>
          <input
            type='text'
            id='createmodal-author'
            className='form-input'
            value={authorInput}
            onChange={({ target }) => setAuthorInput(target.value)}
            required
          />
        </label>
        <label htmlFor='createmodal-url' className='mt-4 flex flex-col w-full'>
          <span className='text-sm font-semibold'>url</span>
          <input
            type='text'
            id='createmodal-url'
            className='form-input'
            value={urlInput}
            onChange={({ target }) => setUrlInput(target.value)}
            required
          />
        </label>
        <div className='flex justify-end w-full'>
          <Button
            text='submit'
            id='createmodal-submit'
            look='mt-12 px-6 py-2 font-sm font-semibold text-light w-1/2 bg-dark rounded hover:bg-d-accent'
            type='submit'
          />
        </div>
      </div>
      <button
        type='button'
        id='createmodal-close'
        className='flex items-center justify-center p-2 font-sm font-semibold text-dark w-full hover:bg-dark hover:text-light'
        onClick={() => setShowCreateModal(false)}>
        <UpIcon />
      </button>
    </form>
  )
}

export default CreateModal
