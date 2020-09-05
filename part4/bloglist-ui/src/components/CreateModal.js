import React from 'react'
import Button from './Button'
import { ReactComponent as UpIcon } from '../assets/img/up.svg'

const CreateModal = ({
  createBlogEntry,
  titleInput,
  authorInput,
  urlInput,
  cancelCreateEntry,
  setTitleInput,
  setAuthorInput,
  setUrlInput,
}) => {
  return (
    <form
      onSubmit={createBlogEntry}
      className='flex flex-col items-center justify-start w-full bg-l-accent text-dark createmodal'>
      <div className='sm:p-16 p-4 w-full'>
        <h3 className='mb-8 text-2xl font-semibold'>submit a new entry</h3>
        <label htmlFor='title' className='flex flex-col w-full'>
          <span className='text-sm font-semibold'>title</span>
          <input
            type='text'
            name='title'
            className='form-input titleinput'
            value={titleInput}
            onChange={({ target }) => setTitleInput(target.value)}
            required
          />
        </label>
        <label htmlFor='author' className='mt-4 flex flex-col w-full'>
          <span className='text-sm font-semibold'>author</span>
          <input
            type='text'
            name='author'
            className='form-input'
            value={authorInput}
            onChange={({ target }) => setAuthorInput(target.value)}
            required
          />
        </label>
        <label htmlFor='url' className='mt-4 flex flex-col w-full'>
          <span className='text-sm font-semibold'>url</span>
          <input
            type='text'
            name='url'
            className='form-input'
            value={urlInput}
            onChange={({ target }) => setUrlInput(target.value)}
            required
          />
        </label>
        <div className='flex justify-end w-full'>
          <Button
            text='submit'
            look='mt-12 px-6 py-2 font-sm font-semibold text-light w-1/2 bg-dark rounded hover:bg-d-accent'
            type='submit'
          />
        </div>
      </div>
      <button
        type='button'
        className='flex items-center justify-center p-2 font-sm font-semibold text-dark w-full hover:bg-dark hover:text-light'
        onClick={cancelCreateEntry}>
        <UpIcon />
      </button>
    </form>
  )
}

export default CreateModal
