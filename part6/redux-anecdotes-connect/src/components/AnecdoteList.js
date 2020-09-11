import React from 'react'
import { connect } from 'react-redux'
import { makeVote, makeDelete } from '../reducers/anecdoteReducer'
import { makeNotification, notification } from '../reducers/notificationReducer'
import Anecdote from './Anecdote'
import Filter from './Filter'

const AnecdoteList = props => {
  const vote = anecdote => {
    props.makeVote(anecdote)
    props.makeNotification(
      notification(`You voted for "${anecdote.content}"`, 'green'),
      5
    )
  }

  const del = anecdote => {
    props.makeDelete(anecdote)
    props.makeNotification(
      notification(`You deleted "${anecdote.content}"`, 'red'),
      5
    )
  }
  return (
    <main>
      <Filter />
      {props.anecdotes.map(anecdote => (
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

const mapStateToProps = state =>
  state.filter.type === 'votes'
    ? { anecdotes: [...state.anecdotes].sort((a, b) => b.votes - a.votes) }
    : state.filter.type === 'text'
    ? {
        anecdotes: state.anecdotes.filter(anecdote =>
          anecdote.content
            .toLowerCase()
            .includes(state.filter.text.toLowerCase())
        ),
      }
    : { anecdotes: [...state.anecdotes] }

const mapDispatchToProps = {
  makeVote,
  makeDelete,
  makeNotification,
}

export default connect(mapStateToProps, mapDispatchToProps)(AnecdoteList)
