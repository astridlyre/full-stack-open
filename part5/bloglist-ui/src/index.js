import React from 'react'
import ReactDOM from 'react-dom'
import './assets/css/App.css'
import App from './App'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import reducer from './reducers/blogReducer'

const store = createStore(reducer)

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)
