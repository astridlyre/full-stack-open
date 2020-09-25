import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { populateNums } from './reducers/numbers'
import Header from './components/Header'
import Dashboard from './views/Dashboard'
import Wrapper from './components/Wrapper'

function App() {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(populateNums())
  }, [dispatch])

  return (
    <div className='container'>
      <Wrapper>
        <Header />
        <Dashboard />
      </Wrapper>
    </div>
  )
}

export default App
