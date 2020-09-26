import React, { useState, useEffect } from 'react'
import Button from './Button'
import { ReactComponent as DownIcon } from '../assets/img/down.svg'
import { ReactComponent as UpIcon } from '../assets/img/up.svg'
import { useApolloClient } from '@apollo/client'

const NavBar = ({ setPage, page, currentUser, setCurrentUser }) => {
  const [showMenu, setShowMenu] = useState(true)
  const [viewport, setViewPort] = useState({ width: 0, height: 0 })
  const client = useApolloClient()
  const updateViewPort = () =>
    setViewPort({
      width: window.innerWidth,
      height: window.innerHeight,
    })

  const logout = () => {
    localStorage.removeItem('user')
    setCurrentUser(null)
    setPage('authors')
    client.resetStore()
  }

  useEffect(() => {
    updateViewPort()
    window.addEventListener('resize', updateViewPort)
    return () => window.removeEventListener('resize', updateViewPort)
  }, [])

  const btnStyle =
    'px-6 py-4 text-gray-100 rounded-none hover:bg-gray-600 text-sm font-semibold flex-grow focus:outline-none focus:bg-pink-700'

  return (
    <div className='relative z-10 bg-gray-800'>
      {showMenu && (
        <div
          className='sm:hidden fixed inset-0 z-0'
          style={{ zIndex: -1 }}
          onClick={() => setShowMenu(false)}></div>
      )}
      <button
        onClick={() => setShowMenu(!showMenu)}
        className='sm:hidden w-full bg-gray-800 text-pink-700 p-2 flex justify-center focus:outline-none focus:text-pink-600 hover:bg-pink-700 hover:text-gray-800 z-10'>
        {showMenu ? <UpIcon /> : <DownIcon />}
      </button>
      {(showMenu || viewport.width > 640) && (
        <nav className='w-full grid grid-cols-1 sm:grid-cols-4 z-10'>
          <Button
            onClick={() => setPage('authors')}
            text='Authors'
            look={
              page === 'authors'
                ? `${btnStyle} bg-pink-700`
                : `${btnStyle} bg-gray-800`
            }
          />
          <Button
            onClick={() => setPage('books')}
            text='Books'
            look={
              page === 'books'
                ? `${btnStyle} bg-pink-700`
                : `${btnStyle} bg-gray-800`
            }
          />
          {currentUser ? (
            <Button
              onClick={() => setPage('add')}
              text='Add book'
              look={
                page === 'add'
                  ? `${btnStyle} bg-pink-700`
                  : `${btnStyle} bg-gray-800`
              }
            />
          ) : (
            <div></div>
          )}
          <Button
            onClick={currentUser ? logout : () => setPage('login')}
            text={currentUser ? 'Logout' : 'Login'}
            look={
              page === 'login'
                ? `${btnStyle} bg-pink-700`
                : `${btnStyle} bg-gray-800`
            }
          />
        </nav>
      )}
    </div>
  )
}

export default NavBar
