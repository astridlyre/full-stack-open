import React from 'react'
import NoteActions from './NoteActions'
import NoteHeader from './NoteHeader'
import { Link } from 'react-router-dom'

const Note = ({ note }) => {
  const { title, user, createdOn } = note

  return (
    <article className='my-8 border border-gray-300 rounded'>
      <NoteHeader user={user} date={createdOn} />
      <div className='px-8 flex justify-start'>
        <Link to={`/notes/${note.id}`}>
          <h2 className='hover:underline mt-2 text-blue-800 font-bold text-3xl'>
            {title}
          </h2>
        </Link>
      </div>
      <NoteActions note={note} />
    </article>
  )
}

export default Note
