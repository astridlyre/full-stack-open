import React from 'react'
import ReactDOM from 'react-dom'
import './assets/css/index.css'
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

const actionCreator = type => ({ type: type })

const store = createStore(counterReducer)

const App = () => {
  return (
    <div id='app'>
      <h1>My counter</h1>
      <span id='counter'>{store.getState()}</span>
      <div className='btn-container'>
        <button onClick={e => store.dispatch(actionCreator('INCREMENT'))}>
          plus
        </button>
        <button onClick={e => store.dispatch(actionCreator('DECREMENT'))}>
          minus
        </button>
        <button onClick={e => store.dispatch(actionCreator('ZERO'))}>
          zero
        </button>
      </div>
    </div>
  )
}

const renderApp = () => {
  ReactDOM.render(<App />, document.getElementById('root'))
}

renderApp()
store.subscribe(renderApp)
