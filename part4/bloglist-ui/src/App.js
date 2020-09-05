/* eslint-disable indent */
import React, { useState, useEffect } from 'react'
import Header from './components/Header'
import Login from './Login'
import BlogList from './components/BlogList'
import {
  getBlogs,
  getLogin,
  postNewBlog,
  deleteBlogEntry,
  postNewUser,
  putNewLike,
} from './services/services'

const App = () => {
  const [currentUser, setCurrentUser] = useState(null)
  const [blogEntries, setBlogEntries] = useState([])
  const [showLiked, setShowLiked] = useState(false)
  const [notification, setNotification] = useState(null)

  useEffect(() => {
    const user = localStorage.getItem('user')
    if (user) setCurrentUser(JSON.parse(user))
    getBlogs().then(blogs => {
      setBlogEntries(blogs)
    })
  }, [])

  const sendNewEntry = async newEntry => {
    const payload = { ...newEntry, userId: currentUser.id }
    try {
      const response = await postNewBlog(payload, currentUser.token)
      setBlogEntries(
        blogEntries.concat({
          ...response,
          user: {
            name: currentUser.name,
            id: currentUser.id,
            username: currentUser.username,
          },
        })
      )
      showNotification({
        text: `submitted new entry: ${newEntry.title}`,
        look: 'green',
      })
    } catch (e) {
      showNotification({
        text: `failed to submit: ${e.message}!`,
        look: 'red',
      })
    }
  }

  const sendNewLike = async entryToChange => {
    const userInfo = {
      username: entryToChange.username,
      id: entryToChange.user.id,
      name: entryToChange.user.name,
    }
    try {
      const response = await putNewLike({
        ...entryToChange,
        user: entryToChange.user.id,
      })

      setBlogEntries(
        blogEntries.map(entry =>
          entry.id !== entryToChange.id
            ? entry
            : { ...response, user: userInfo }
        )
      )
    } catch (e) {
      showNotification({
        text: `action failed: ${e.message}!`,
        look: 'red',
      })
    }
  }

  const sendDeleteEntry = async idToDelete => {
    try {
      await deleteBlogEntry(idToDelete, currentUser.id, currentUser.token)
      setBlogEntries(blogEntries.filter(entry => entry.id !== idToDelete))
      showNotification({
        text: 'deleted entry',
        look: 'red',
      })
    } catch (e) {
      showNotification({
        text: `action failed: ${e.message}!`,
        look: 'red',
      })
    }
  }

  const setLogin = async (username, password) => {
    try {
      const user = await getLogin(username, password)
      setCurrentUser(user)
      localStorage.setItem('user', JSON.stringify(user))
      showNotification({
        text: `login successful - hi, ${user.name}!`,
        look: 'green',
      })
    } catch (e) {
      e.message.includes('401')
        ? showNotification({
            text: 'login failed: username or password incorrect!',
            look: 'red',
          })
        : showNotification({
            text: `login failed: ${e.message}`,
            look: 'red',
          })
    }
  }

  const setSignup = async (username, password, name) => {
    const newUser = {
      username: username,
      password: password,
      name: name,
    }
    try {
      await postNewUser(newUser)
      setLogin(username, password)
    } catch (e) {
      showNotification({
        text: `signup failed: ${e.message}!`,
        look: 'red',
      })
    }
  }

  const logout = () => {
    localStorage.removeItem('user')
    setCurrentUser(null)
    showNotification({
      text: 'logged out',
      look: 'green',
    })
  }

  const showNotification = toShow => {
    setNotification(toShow)
    setTimeout(() => {
      setNotification(null)
    }, 1500)
  }

  const entriesToShow = showLiked
    ? [...blogEntries].sort((a, b) => b.likes - a.likes)
    : [...blogEntries].reverse()

  return (
    <main className='sm:p-8 bg-light w-full min-h-screen flex justify-center'>
      <div className='max-w-screen-sm w-full'>
        <Header
          logout={logout}
          notification={notification}
          username={currentUser ? currentUser.name : ''}
        />
        {!currentUser ? (
          <Login setLogin={setLogin} setSignup={setSignup} />
        ) : (
          <BlogList
            sendNewEntry={sendNewEntry}
            blogEntries={entriesToShow}
            showLiked={showLiked}
            setShowLiked={setShowLiked}
            currentUser={currentUser}
            sendDeleteEntry={sendDeleteEntry}
            sendNewLike={sendNewLike}
          />
        )}
      </div>
    </main>
  )
}

export default App
