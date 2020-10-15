import React, { useState, useEffect } from 'react'
import Authors from './views/Authors'
import Books from './views/Books'
import NewBook from './views/NewBook'
import Login from './views/Login'
import Profile from './views/Profile'
import NavBar from './components/NavBar'
import Notification from './components/Notification'
import Container from './components/Container'
import { useApolloClient, useSubscription } from '@apollo/client'
import {
  BOOK_ADDED,
  AUTHOR_ADDED,
  AUTHOR_UPDATED,
  GET_BOOKS,
  GET_AUTHORS,
  EDIT_AUTHOR,
} from './services/index'

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

  const updateCacheWith = (addedObject, { query, key, update }) => {
    const includedIn = (set, object) => set.map(p => p.id).includes(object.id)
    const dataInStore = client.readQuery({ query })
    if (!update && !includedIn(dataInStore[key], addedObject)) {
      client.writeQuery({
        query,
        data: { [key]: dataInStore[key].concat(addedObject) },
      })
    }
  }

  useSubscription(BOOK_ADDED, {
    onSubscriptionData: ({ subscriptionData }) => {
      const addedBook = subscriptionData.data.bookAdded
      setNotification(`${addedBook.title} added`)
      updateCacheWith(addedBook, {
        query: GET_BOOKS,
        key: 'allBooks',
        update: false,
      })
    },
  })
  useSubscription(AUTHOR_ADDED, {
    onSubscriptionData: ({ subscriptionData }) => {
      const addedAuthor = subscriptionData.data.authorAdded
      setNotification(`${addedAuthor.name} added`)
      updateCacheWith(addedAuthor, {
        query: GET_AUTHORS,
        key: 'allAuthors',
        update: false,
      })
    },
  })
  useSubscription(AUTHOR_UPDATED, {
    onSubscriptionData: ({ subscriptionData }) => {
      const updatedAuthor = subscriptionData.data.authorUpdated
      setNotification(`${updatedAuthor.name} updated`)
      client.writeQuery({
        query: EDIT_AUTHOR,
        data: updatedAuthor,
      })
    },
  })

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
          updateCacheWith={updateCacheWith}
        />

        <Books show={page === 'books'} />

        {currentUser && (
          <NewBook
            show={page === 'add'}
            setNotify={setNotification}
            updateCacheWith={updateCacheWith}
          />
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
    </div>
  )
}

export default App
