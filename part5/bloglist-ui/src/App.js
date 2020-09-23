/* eslint-disable indent */
import React, { useEffect } from 'react'
import { Switch, Route, useRouteMatch, Redirect } from 'react-router-dom'
import Header from './components/Header'
import Login from './Login'
import BlogList from './components/BlogList/BlogList'
import UserList from './components/UsersList/UserList'
import UserFull from './UserFull'
import BlogFull from './BlogFull'
import { populateEntries } from './reducers/blogReducer'
import { loginCurrentUser } from './reducers/userReducer'
import { useSelector, useDispatch } from 'react-redux'
import { makeNotification, notification } from './reducers/notificationReducer'
import { populateUsers } from './reducers/usersReducer'

const App = () => {
  const dispatch = useDispatch()
  const currentUser = useSelector(state => state.currentUser)
  const entries = useSelector(state => state.entries)
  const users = useSelector(state => state.users)
  const showLiked = useSelector(state => state.showLiked)

  const blogMatch = useRouteMatch('/blogs/:id')
  const userMatch = useRouteMatch('/users/:id')

  const blog = blogMatch
    ? entries.find(blog => blog.id === blogMatch.params.id)
    : null

  const user = userMatch
    ? users.find(user => user.id === userMatch.params.id)
    : null

  // initialize blog entries and set user in state
  useEffect(() => {
    try {
      dispatch(loginCurrentUser())
      dispatch(populateEntries())
      dispatch(populateUsers())
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

        <Switch>
          <Route path='/login'>
            <Login />
          </Route>
          <Route
            path='/users/:id'
            render={() =>
              currentUser && user ? <UserFull user={user} /> : <Login />
            }
          />
          <Route
            path='/users'
            render={() =>
              currentUser ? <UserList users={users} /> : <Login />
            }
          />
          <Route
            path='/blogs/:id'
            render={() =>
              currentUser && blog ? <BlogFull entry={blog} /> : <Login />
            }
          />
          <Route
            path='/blogs'
            render={() =>
              currentUser ? <BlogList blogEntries={entriesToShow} /> : <Login />
            }
          />
          <Route
            path='/'
            render={() =>
              currentUser ? (
                <Redirect to={{ pathname: '/blogs', state: { from: '/' } }} />
              ) : (
                <Login />
              )
            }
          />
        </Switch>
      </div>
    </main>
  )
}

export default App
