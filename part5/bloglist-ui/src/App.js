/* eslint-disable indent */
import React, { useEffect } from 'react'
import Header from './components/Header'
import Login from './Login'
import BlogList from './components/BlogList/BlogList'
import { populateEntries } from './reducers/blogReducer'
import { loginCurrentUser, createLogout } from './reducers/userReducer'
import { useSelector, useDispatch } from 'react-redux'
import { makeNotification, notification } from './reducers/notificationReducer'

const App = () => {
  const dispatch = useDispatch()
  const currentUser = useSelector(state => state.currentUser)
  const entries = useSelector(state => state.entries)
  const showLiked = useSelector(state => state.showLiked)

  // initialize blog entries and set user in state
  useEffect(() => {
    try {
      dispatch(loginCurrentUser())
      dispatch(populateEntries())
    } catch (e) {
      dispatch(makeNotification(notification(`${e.message}`, 'red'), 3))
    }
  }, [dispatch])

  // filter function for either most recent or top liked
  const entriesToShow = showLiked
    ? [...entries].sort((a, b) => b.likes.length - a.likes.length)
    : [...entries].reverse()

  return (
    <main className='sm:p-8 bg-light w-full min-h-screen flex justify-center'>
      <div className='max-w-screen-sm w-full'>
        <Header />
        {!currentUser ? <Login /> : <BlogList blogEntries={entriesToShow} />}
      </div>
    </main>
  )
}

export default App
