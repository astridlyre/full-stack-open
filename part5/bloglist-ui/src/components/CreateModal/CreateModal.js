import React from 'react'
import Button from '../Buttons/Button'
import { ReactComponent as UpIcon } from '../../assets/img/up.svg'
import { useDispatch, useSelector } from 'react-redux'
import { useField } from '../../hooks/index'
import { createEntry } from '../../reducers/blogReducer'
import {
  makeNotification,
  notification,
} from '../../reducers/notificationReducer'

const CreateModal = ({ setShowCreateModal }) => {
  const dispatch = useDispatch()
  const currentUser = useSelector(state => state.currentUser)
  const [title, clearTitle] = useField('text')
  const [author, clearAuthor] = useField('text')
  const [url, clearUrl] = useField('text')
  const [blurb, clearBlurb] = useField('text')

  const createBlogEntry = event => {
    event.preventDefault()
    try {
      dispatch(
        createEntry(
          title.value,
          author.value,
          url.value,
          blurb.value,
          currentUser
        )
      )
    } catch (e) {
      dispatch(makeNotification(notification(`${e.message}`, 'red'), 3))
    }
    clearTitle()
    clearAuthor()
    clearUrl()
    clearBlurb()
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
            type={title.type}
            id='createmodal-title'
            className='form-input titleinput'
            value={title.value}
            onChange={title.onChange}
            required
          />
        </label>
        <label
          htmlFor='createmodal-author'
          className='mt-4 flex flex-col w-full'>
          <span className='text-sm font-semibold'>author</span>
          <input
            type={author.type}
            id='createmodal-author'
            className='form-input'
            value={author.value}
            onChange={author.onChange}
            required
          />
        </label>
        <label htmlFor='createmodal-url' className='mt-4 flex flex-col w-full'>
          <span className='text-sm font-semibold'>url</span>
          <input
            type={url.type}
            id='createmodal-url'
            className='form-input'
            value={url.value}
            onChange={url.onChange}
            required
          />
        </label>
        <label
          htmlFor='createmodal-blurb'
          className='mt-4 flex flex-col w-full'>
          <span className='text-sm font-semibold'>blurb</span>
          <textarea
            type={blurb.type}
            id='createmodal-blurb'
            className='form-textarea resize-none'
            rows='4'
            maxLength='140'
            value={blurb.value}
            onChange={blurb.onChange}
            required></textarea>
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
