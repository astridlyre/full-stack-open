import React from 'react'

const Anecdote = ({ anecdote, vote, del }) => (
  <div key={anecdote.id} className='anecdote'>
    <div className='anecdote-content'>"{anecdote.content}"</div>
    <div className='anecdote-votes'>
      has {anecdote.votes} votes
      <button onClick={vote}>vote</button>
      <button onClick={del}>del</button>
    </div>
  </div>
)

export default Anecdote
