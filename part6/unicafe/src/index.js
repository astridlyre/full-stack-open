import React from 'react'
import ReactDOM from 'react-dom'
import { createStore } from 'redux'
import './index.css'
import Header from './components/Header'
import Button from './components/Button'
import Statistics from './components/Statistics'
import counterReducer from './reducer'

const store = createStore(counterReducer)

const App = ({ store }) => {
  const handleClick = type => () => {
    store.dispatch({ type: type })
  }

  return (
    <main>
      <Header
        title={store.getState().title}
        feedbackValues={store.getState().feedback}
      />
      <section className='grid-3-col pt-4'>
        <Button text='good' handler={handleClick('GOOD')} />
        <Button text='neutral' handler={handleClick('NEUTRAL')} />
        <Button text='bad' handler={handleClick('BAD')} />
      </section>
      <Statistics
        subheading={store.getState().subheading}
        feedbackTypes={store.getState().feedbackTypes}
        feedbackValues={store.getState().feedback}
      />
      <footer>Copyright My Awesome Feedback Page</footer>
    </main>
  )
}

const renderApp = () => {
  ReactDOM.render(<App store={store} />, document.getElementById('root'))
}

renderApp()
store.subscribe(renderApp)
