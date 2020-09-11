import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { makeVote, makeDelete } from '../reducers/anecdoteReducer'
import { makeNotification, notification } from '../reducers/notificationReducer'
import Anecdote from './Anecdote'
import Filter from './Filter'

const AnecdoteList = () => {
  const dispatch = useDispatch()

  const anecdotes = useSelector(({ filter, anecdotes }) =>
    filter.type === 'votes'
      ? [...anecdotes].sort((a, b) => b.votes - a.votes)
      : filter.type === 'text'
      ? anecdotes.filter(anecdote =>
          anecdote.content.toLowerCase().includes(filter.text.toLowerCase())
        )
      : anecdotes
  )

  const vote = anecdote => {
    dispatch(makeVote(anecdote))
    dispatch(
      makeNotification(
        notification(`You voted for "${anecdote.content}"`, 'green'),
        3
      )
    )
  }

  const del = anecdote => {
    dispatch(makeDelete(anecdote))
    dispatch(
      makeNotification(
        notification(`You deleted "${anecdote.content}"`, 'red'),
        3
      )
    )
  }

  return (
    <main>
      <Filter />
      {anecdotes.map(anecdote => (
        <Anecdote
          anecdote={anecdote}
          key={anecdote.id}
          vote={() => vote(anecdote)}
          del={() => del(anecdote)}
        />
      ))}
    </main>
  )
}

export default AnecdoteList
