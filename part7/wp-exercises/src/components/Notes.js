import React from 'react'

const Notes = ({ notes }) => (
  <div className='container'>
    <h1>{notes.length} Notes</h1>
    <ul>{notes && notes.map(note => <li key={note.id}>{note.content}</li>)}</ul>
  </div>
)

export default Notes
