import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { makeVote, makeDelete } from '../reducers/anecdoteReducer'
import Anecdote from './Anecdote'

const AnecdoteList = () => {
  const dispatch = useDispatch(),
    anecdotes = useSelector(state =>
      [...state].sort((a, b) => b.votes - a.votes)
    )

  return (
    <main>
      {anecdotes.map(anecdote => (
        <Anecdote
          anecdote={anecdote}
          key={anecdote.id}
          vote={() => dispatch(makeVote(anecdote))}
          del={() => dispatch(makeDelete(anecdote))}
        />
      ))}
    </main>
  )
}

export default AnecdoteList
