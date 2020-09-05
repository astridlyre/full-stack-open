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
} from './services/blogentries'

const App = () => {
  const [currentUser, setCurrentUser] = useState(null)
  const [blogEntries, setBlogEntries] = useState([])
  const [showLiked, setShowLiked] = useState(false)

  useEffect(() => {
    const user = localStorage.getItem('user')
    if (user) setCurrentUser(JSON.parse(user))
    getBlogs().then(blogs => {
      setBlogEntries(blogs)
    })
  }, [])

  const sendNewEntry = async newEntry => {
    const payload = { ...newEntry, userId: currentUser.id }
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
  }

  const sendNewLike = async entryToChange => {
    const userInfo = {
      username: entryToChange.username,
      id: entryToChange.user.id,
      name: entryToChange.user.name,
    }

    const response = await putNewLike({
      ...entryToChange,
      user: entryToChange.user.id,
    })

    setBlogEntries(
      blogEntries.map(entry =>
        entry.id !== entryToChange.id ? entry : { ...response, user: userInfo }
      )
    )
  }

  const sendDeleteEntry = async idToDelete => {
    await deleteBlogEntry(idToDelete, currentUser.id, currentUser.token)
    setBlogEntries(blogEntries.filter(entry => entry.id !== idToDelete))
  }

  const setLogin = async (username, password) => {
    const user = await getLogin(username, password)
    setCurrentUser(user)
    localStorage.setItem('user', JSON.stringify(user))
  }

  const setSignup = async (username, password, name) => {
    const newUser = {
      username: username,
      password: password,
      name: name,
    }
    await postNewUser(newUser)
    setLogin(username, password)
  }

  const logout = () => {
    localStorage.removeItem('user')
    setCurrentUser(null)
  }

  const entriesToShow = showLiked
    ? [...blogEntries].sort((a, b) => b.likes - a.likes)
    : [...blogEntries].reverse()

  return (
    <main className='sm:p-8 bg-light w-full min-h-screen flex justify-center'>
      <div className='max-w-screen-sm w-full'>
        <Header
          logout={logout}
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
