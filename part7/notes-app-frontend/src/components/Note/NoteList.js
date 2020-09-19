import React from 'react'
import { useSelector } from 'react-redux'
import Note from './Note'

const NoteList = () => {
  const notes = useSelector(state => state.notes)
  const filterLikes = useSelector(state => state.filterLikes)
  const filteredNotes = filterLikes
    ? [...notes].sort((a, b) => b.likes.length - a.likes.length)
    : [...notes].reverse()

  return (
    <div className='w-full'>
      {filteredNotes.map(note => (
        <Note key={note.id} note={note} />
      ))}
    </div>
  )
}

export default NoteList
