import React from 'react'
import ReactDOM from 'react-dom'
import './assets/css/index.css'
import App from './App'
import store from './store/index'
import { Provider } from 'react-redux'
import { ApolloProvider } from '@apollo/client'
import { client } from './services/'

ReactDOM.render(
  <ApolloProvider client={client}>
    <Provider store={store}>
      <App />
    </Provider>
  </ApolloProvider>,
  document.getElementById('root')
)
