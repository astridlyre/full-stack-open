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
      <Login
        show={page === 'login'}
        setPage={setPage}
        currentUser={currentUser}
        setCurrentUser={setCurrentUser}
      />

      <Authors show={page === 'authors'} currentUser={currentUser} />

      <Books show={page === 'books'} />

      {currentUser && <NewBook show={page === 'add'} />}

      <div className='sm:col-span-2 p-0 sm:p-0 sm:h-screen flex flex-col w-full bg-gray-800'>
        <div className='p-4 flex justify-center flex-grow'>
          <Logo className='lg:w-64 sm:w-48 w-32 text-pink-700' />
        </div>
        <NavBar
          page={page}
          setPage={setPage}
          currentUser={currentUser}
          setCurrentUser={setCurrentUser}
        />
      </div>
    </Wrapper>
  )
}

export default App
