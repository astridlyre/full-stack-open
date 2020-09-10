import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { makeAnecdote } from '../reducers/anecdoteReducer'

const AnecdoteForm = () => {
  const [formInput, setFormInput] = useState(''),
    dispatch = useDispatch(),
    handleFormInput = event => setFormInput(event.target.value),
    newAnecdote = event => {
      event.preventDefault()
      dispatch(makeAnecdote(formInput))
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

export default AnecdoteForm
