import React, { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { createNote } from '../../reducers/note'
import { notify, nobj } from '../../reducers/notification'
import TextButton from '../Buttons/TextButton'
import useField from '../../hooks/usefield'

const NoteCreateForm = ({ cancel }) => {
  const title = useField('text')
  const content = useField('text')
  const dispatch = useDispatch()
  const currentUser = useSelector(state => state.currentUser)
  const inputEl = useRef()

  useEffect(() => {
    inputEl.current.focus()
  }, [inputEl])

  const note = event => {
    event.preventDefault()
    try {
      dispatch(createNote(title.value, content.value, currentUser))
      title.clear()
      content.clear()
      cancel()
    } catch (e) {
      dispatch(notify(nobj(`Failed to create note: ${e.message}`), 3))
    }
  }

  const goback = () => {
    title.clear()
    content.clear()
    cancel()
  }

  return (
    <div className='inset-0 fixed bg-gray-900 bg-opacity-25 flex justify-center items-center'>
      <div className='inset-0 fixed z-0' onClick={cancel}></div>
      <form
        action='#'
        onSubmit={note}
        className='bg-gray-100 text-gray-800 p-8 rounded shadow flex flex-col w-full max-w-md z-10'>
        <label htmlFor='title'>Title:</label>
        <input
          id='title-input'
          ref={inputEl}
          placeholder='Note title...'
          type={title.type}
          value={title.value}
          onChange={title.onChange}
          className='mt-1 form-input placeholder-gray-400 text-gray-800'
        />
        <label htmlFor='content' className='mt-4'>
          Content:
        </label>
        <textarea
          id='content'
          className='mt-1 resize-none form-textarea placeholder-gray-400 text-gray-800'
          rows='6'
          value={content.value}
          onChange={content.onChange}
          placeholder='Your note here...'></textarea>
        <div className='grid grid-cols-2 gap-x-2 mt-8'>
          <TextButton
            text='Post'
            look='py-2 px-4 font-semibold text-sm border-0 bg-blue-800 text-gray-100 hover:bg-blue-900 rounded'
            func={null}
            type='submit'
          />
          <TextButton
            text='Cancel'
            look='py-2 px-4 font-semibold text-sm border-0 bg-gray-500 text-gray-100 hover:bg-blue-900 rounded'
            func={() => goback()}
          />
        </div>
      </form>
    </div>
  )
}

export default NoteCreateForm
