import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { populateState } from './reducers/anecdoteReducer'
import AnecdoteForm from './components/AnecdoteForm'
import AnecdoteList from './components/AnecdoteList'
import Notification from './components/Notification'

const App = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(populateState())
  }, [dispatch])

  return (
    <div id='container'>
      <Notification />
      <header>
        <h1>Anecdotes</h1>
        <AnecdoteForm />
      </header>
      <AnecdoteList />
    </div>
  )
}

export default App
