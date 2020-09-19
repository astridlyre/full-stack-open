import React from 'react'
import IconButton from '../Buttons/IconBtn'
import { useSelector, useDispatch } from 'react-redux'
import { delNote, createLike } from '../../reducers/note'
import { notify, nobj } from '../../reducers/notification'
import { ReactComponent as DelIcon } from '../../assets/img/trash.svg'
import { ReactComponent as HeartIcon } from '../../assets/img/heart.svg'

const NoteActions = ({ note }) => {
  const dispatch = useDispatch()
  const currentUser = useSelector(state => state.currentUser)

  const del = id => {
    try {
      dispatch(delNote(id, currentUser.token))
    } catch (e) {
      dispatch(notify(nobj(`Action failed: ${e.message}`, 'red'), 3))
    }
  }

  const like = note => {
    try {
      dispatch(createLike(note, currentUser.token))
    } catch (e) {
      dispatch(notify(nobj(`Action failed: ${e.message}`, 'red'), 3))
    }
  }

  return (
    <div className='px-8 pb-8 w-full flex items-center justify-end'>
      <span className='text-gray-500 text-sm mr-4'>
        {note.likes.length} {note.likes.length === 1 ? 'like' : 'likes'}
      </span>

      <IconButton
        func={() => like(note)}
        look={note.likes.includes(currentUser.id) ? 'dark' : 'gray'}>
        <HeartIcon />
      </IconButton>

      {currentUser && note.user.id === currentUser.id && (
        <IconButton func={() => del(note.id)} look='gray'>
          <DelIcon />
        </IconButton>
      )}
    </div>
  )
}

export default NoteActions
