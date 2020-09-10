import React from 'react'
import { createStore } from 'redux'

const counterReducer = (state = 0, action) => {
  switch (action.type) {
    case 'INCREMENT':
      return state + 1
    case 'DECREMENT':
      return state - 1
    case 'ZERO':
      return 0
    default:
      return state
  }
}

const store = createStore(counterReducer)

const App = () => {
  return (
    <div id='app'>
      <h1>My counter</h1>
      <span id='counter'>{store.getState()}</span>
      <div className='btn-container'>
        <button onClick={e => store.dispatch({ type: 'INCREMENT' })}>
          plus
        </button>
        <button onClick={e => store.dispatch({ type: 'DECREMENT' })}>
          minus
        </button>
        <button onClick={e => store.dispatch({ type: 'ZERO' })}>zero</button>
      </div>
    </div>
  )
}

export default App
