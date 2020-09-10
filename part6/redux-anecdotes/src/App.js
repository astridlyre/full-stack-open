import React from 'react'
import AnecdoteForm from './components/AnecdoteForm'
import AnecdoteList from './components/AnecdoteList'

const App = () => (
  <div id='container'>
    <header>
      <h1>Anecdotes</h1>
      <AnecdoteForm />
    </header>
    <AnecdoteList />
  </div>
)

export default App
