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
import {
  createEntry,
  createLogin,
  populateEntries,
  userInfoExtractor,
  createNewLike,
  createLogout,
  deleteHelper,
  createNewUser,
} from './reducers/blogReducer'
import { useSelector, useDispatch } from 'react-redux'

const App = () => {
  const [showLiked, setShowLiked] = useState(false)
  const [notification, setNotification] = useState(null)
  const dispatch = useDispatch()
  const currentUser = useSelector(state => state.currentUser)
  const entries = useSelector(state => state.entries)

  // initialize blog entries and set user in state
  useEffect(() => {
    const user = localStorage.getItem('user')
    if (!user) return
    dispatch(createLogin(JSON.parse(user)))
    getBlogs()
      .then(blogs => {
        dispatch(populateEntries(blogs))
      })
      .catch(e => showNotification(`${e.message}`, 'red'))
  }, [dispatch])

  // function to create a new entry
  const sendNewEntry = async newEntry => {
    try {
      const response = await postNewBlog(newEntry, currentUser.token)
      dispatch(createEntry(response, currentUser))
      showNotification(`submitted new entry: ${newEntry.title}`)
    } catch (e) {
      showNotification(`failed to submit: ${e.message}!`, 'red')
    }
  }

  // function to like or unlike a post
  const sendNewLike = async entryToChange => {
    try {
      const response = await putNewLike(entryToChange, currentUser.token)
      dispatch(createNewLike(response, userInfoExtractor(entryToChange)))
    } catch (e) {
      showNotification(`action failed: ${e.message}!`, 'red')
    }
  }

  // function to delete entry
  const sendDeleteEntry = async idToDelete => {
    try {
      await deleteBlogEntry(idToDelete, currentUser.id, currentUser.token)
      dispatch(deleteHelper(idToDelete))
      showNotification('deleted entry', 'red')
    } catch (e) {
      showNotification(`action failed: ${e.message}!`, 'red')
    }
  }

  // function to login user
  const setLogin = async (username, password) => {
    try {
      const user = await getLogin(username, password)
      dispatch(createLogin(user))
      localStorage.setItem('user', JSON.stringify(user))
      showNotification(`login successful - hi, ${user.name}!`)
    } catch (e) {
      e.message.includes('401')
        ? showNotification(
            'login failed: username or password incorrect!',
            'red'
          )
        : showNotification(`login failed: ${e.message}`, 'red')
    }
  }

  // function to perform new user sign up
  const setSignup = async (username, password, name) => {
    try {
      await postNewUser(createNewUser(username, password, name))
      setLogin(username, password)
    } catch (e) {
      e.message.includes('400')
        ? showNotification('signup failed: username already taken!', 'red')
        : showNotification(`signup failed: ${e.message}!`, 'red')
    }
  }

  // function to logout user
  const logout = () => {
    localStorage.removeItem('user')
    dispatch(createLogout())
    showNotification('logged out')
  }

  // notification function
  const showNotification = (text, look = 'green') => {
    setNotification({ text, look })
    setTimeout(() => setNotification(null), 1500)
  }

  // filter function for either most recent or top liked
  const entriesToShow = showLiked
    ? [...entries].sort((a, b) => b.likes.length - a.likes.length)
    : [...entries].reverse()

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
