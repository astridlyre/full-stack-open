import React, { useState, useEffect } from 'react'
import Authors from './views/Authors'
import Books from './views/Books'
import NewBook from './views/NewBook'
import Login from './views/Login'
import NavBar from './components/NavBar'
import Notification from './components/Notification'
import Container from './components/Container'
import { GET_AUTHORS_AND_BOOKS } from './services/index'
import { useApolloClient, useQuery } from '@apollo/client'
import { ReactComponent as LoaderIcon } from './assets/img/loader.svg'

const App = () => {
  const [page, setPage] = useState('authors')
  const [notify, setNotify] = useState(null)
  const [timer, setTimer] = useState(null)
  const [currentUser, setCurrentUser] = useState(null)
  const result = useQuery(GET_AUTHORS_AND_BOOKS)
  const books = result.data?.allBooks || []
  const authors = result.data?.allAuthors || []
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
    if (page === 'add') setPage('authors')
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
      {result.loading ? (
        <Container>
          <div className='w-full h-64 flex justify-center items-center text-orange-500'>
            <LoaderIcon />
          </div>
        </Container>
      ) : (
        <Container>
          <Authors
            show={page === 'authors'}
            authors={authors}
            currentUser={currentUser}
            setNotify={setNotification}
          />

          <Books show={page === 'books'} books={books} />

          {currentUser && (
            <NewBook show={page === 'add'} setNotify={setNotification} />
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
