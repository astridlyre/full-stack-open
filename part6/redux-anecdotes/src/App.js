import React from 'react'
import AnecdoteForm from './components/AnecdoteForm'
import AnecdoteList from './components/AnecdoteList'
import Notification from './components/Notification'

const App = () => (
  <div id='container'>
    <Notification />
    <header>
      <h1>Anecdotes</h1>
      <AnecdoteForm />
    </header>
    <AnecdoteList />
  </div>
)

export default App
