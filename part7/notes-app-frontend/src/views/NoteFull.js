import React from 'react'
import CommentForm from '../components/Comment/CommentForm'
import CommentList from '../components/Comment/CommentList'
import NoteActions from '../components/Note/NoteActions'
import NoteBody from '../components/Note/NoteBody'
import NoteHeader from '../components/Note/NoteHeader'
import Wrapper from '../components/Wrapper'

const Note = ({ note }) => {
  return (
    <Wrapper>
      {note && (
        <article className='my-8 border border-gray-300 rounded'>
          <NoteHeader user={note.user} date={note.createdOn} />
          <NoteBody title={note.title} content={note?.content} />
          <NoteActions note={note} />
          <CommentList />
          <CommentForm />
        </article>
      )}
    </Wrapper>
  )
}

export default Note
