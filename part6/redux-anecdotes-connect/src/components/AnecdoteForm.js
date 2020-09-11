import React, { useState } from 'react'
import { connect } from 'react-redux'
import { makeAnecdote } from '../reducers/anecdoteReducer'
import { makeNotification, notification } from '../reducers/notificationReducer'

const AnecdoteForm = props => {
  const [formInput, setFormInput] = useState(''),
    handleFormInput = event => setFormInput(event.target.value),
    newAnecdote = event => {
      event.preventDefault()
      props.makeAnecdote(formInput)
      props.makeNotification(
        notification(`You added "${formInput}"!`, 'green'),
        5
      )

      setFormInput('')
    }

  return (
    <div id='new-anecdote-div'>
      <h2>add anecdote:</h2>
      <form onSubmit={newAnecdote}>
        <div>
          <input
            type='text'
            id='new-anecdote'
            required
            value={formInput}
            onChange={handleFormInput}
          />
        </div>
        <button>add</button>
      </form>
    </div>
  )
}

const mapDispatchToProps = {
  makeAnecdote,
  makeNotification,
}

export default connect(null, mapDispatchToProps)(AnecdoteForm)
