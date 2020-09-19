import React from 'react'
import { useCounter, useNotes } from './Hooks'
import Wrapper from './components/Wrapper'
import Counter from './components/Counter'
import Notes from './components/Notes'

const App = () => {
  const counter = useCounter(0)
  const notes = useNotes(BACKEND_URL)

  return (
    <Wrapper>
      <Counter counter={counter} />
      <Notes notes={notes} />
    </Wrapper>
  )
}

export default App
