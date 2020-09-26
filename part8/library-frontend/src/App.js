import React, { useState, useEffect } from 'react'
import Login from './components/Login'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import Wrapper from './components/Wrapper'
import NavBar from './components/NavBar'
import { ReactComponent as Logo } from './assets/img/logo.svg'

const App = () => {
  const [page, setPage] = useState('authors')
  const [currentUser, setCurrentUser] = useState(null)

  useEffect(() => {
    const user = localStorage.getItem('user')
    if (user) setCurrentUser(user)
  }, [])

  return (
    <Wrapper>
      <div className='p-4 sm:p-8 flex justify-center w-full bg-gray-800 max-w-screen-md sm:rounded-t-sm md:mt-8'>
        <Logo className='sm:w-48 w-32 text-pink-700' />
      </div>
      <div className='max-w-screen-md w-full bg-gray-100 rounded-sm'>
        <NavBar
          page={page}
          setPage={setPage}
          currentUser={currentUser}
          setCurrentUser={setCurrentUser}
        />
        <div className='sm:p-16 p-4'>
          <Login
            show={page === 'login'}
            setPage={setPage}
            currentUser={currentUser}
            setCurrentUser={setCurrentUser}
          />

          <Authors show={page === 'authors'} />

          <Books show={page === 'books'} />

          {currentUser && <NewBook show={page === 'add'} />}
        </div>
      </div>
    </Wrapper>
  )
}

export default App
