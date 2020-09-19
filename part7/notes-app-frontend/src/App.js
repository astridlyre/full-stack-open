import React, { useEffect } from 'react'
import { Switch, Route, useRouteMatch } from 'react-router-dom'
import { populate } from './reducers/note'
import { notify, nobj } from './reducers/notification'
import { loginCurrentUser } from './reducers/user'
import { useDispatch, useSelector } from 'react-redux'
import Header from './components/Header'
import Login from './Login'
import Footer from './components/Footer'
import './assets/css/app.css'
import Notification from './components/Notification'
import Dashboard from './views/Dashboard'
import UserList from './views/UserList'
import Home from './views/Home'
import NoteFull from './views/NoteFull'
import UserProfile from './views/UserProfile'
import { populateUsers } from './reducers/users'

function App() {
  const dispatch = useDispatch()
  const currentUser = useSelector(state => state.currentUser)
  const notes = useSelector(state => state.notes)
  const users = useSelector(state => state.users)
  const noteMatch = useRouteMatch('/notes/:id')
  const userMatch = useRouteMatch('/users/:id')

  const note = noteMatch
    ? notes.find(note => note.id === noteMatch.params.id)
    : null
  const user = userMatch
    ? users.find(user => user.id === userMatch.params.id)
    : null

  useEffect(() => {
    try {
      dispatch(loginCurrentUser())
      dispatch(populate())
      dispatch(populateUsers())
    } catch (e) {
      dispatch(notify(nobj(`${e.message}`, 'red'), 3))
    }
  }, [dispatch])

  return (
    <div className='text-blue-800 bg-gray-100 max-w-full min-h-screen flex flex-col items-center'>
      <Header />
      <div className='max-w-screen-md px-8 w-full'>
        <Notification />
      </div>

      <Switch>
        <Route path='/login'>
          <Login />
        </Route>
        <Route
          path='/notes/:id'
          render={() => (currentUser ? <NoteFull note={note} /> : <Login />)}
        />
        <Route
          path='/notes'
          render={() => (currentUser ? <Dashboard /> : <Login />)}
        />
        <Route
          path='/users/:id'
          render={() => (currentUser ? <UserProfile user={user} /> : <Login />)}
        />
        <Route
          path='/users'
          render={() => (currentUser ? <UserList /> : <Login />)}
        />
        <Route path='/'>
          <Home />
        </Route>
      </Switch>
      <div className='flex flex-grow'></div>
      <Footer />
    </div>
  )
}

export default App
