import React, { useState, useEffect } from 'react'
import Authors from './views/Authors'
import Books from './views/Books'
import NewBook from './views/NewBook'
import Login from './views/Login'
import Profile from './views/Profile'
import NavBar from './components/NavBar'
import Notification from './components/Notification'
import Container from './components/Container'
import { useApolloClient } from '@apollo/client'

const App = () => {
  const [page, setPage] = useState('books')
  const [notify, setNotify] = useState(null)
  const [timer, setTimer] = useState(null)
  const [currentUser, setCurrentUser] = useState(null)
  const client = useApolloClient()

  useEffect(() => {
    const user = localStorage.getItem('booktime-user-token')
    if (user) setCurrentUser(user)
  }, [])

  const setNotification = notification => {
    setNotify(notification)
    if (timer) {
      clearTimeout(timer)
      setTimer(null)
    }
    const newTimer = setTimeout(() => {
      setNotify(null)
      setTimer(null)
    }, 3000)
    setTimer(newTimer)
  }

  const logout = () => {
    setNotification('Logged out')
    if (page === 'add' || page === 'profile') setPage('authors')
    setCurrentUser(null)
    localStorage.removeItem('booktime-user-token')
    client.resetStore()
  }

  return (
    <div className='bg-gray-900 min-h-screen'>
      <Container>
        <NavBar
          setPage={setPage}
          currentUser={currentUser}
          setCurrentUser={setCurrentUser}
          logout={logout}
        />
      </Container>
      {notify && <Notification text={notify} />}
      <Container>
        <Authors
          show={page === 'authors'}
          currentUser={currentUser}
          setNotify={setNotification}
        />

        <Books show={page === 'books'} />

        {currentUser && (
          <NewBook show={page === 'add'} setNotify={setNotification} />
        )}

        {currentUser && (
          <Profile show={page === 'profile'} setNotify={setNotification} />
        )}

        <Login
          show={page === 'login'}
          setPage={setPage}
          setCurrentUser={setCurrentUser}
          setNotify={setNotification}
        />
      </Container>
      )}
    </div>
  )
}

export default App
