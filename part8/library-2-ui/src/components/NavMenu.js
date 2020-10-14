import React from 'react'

const NavMenu = ({ setPage, currentUser, logout }) => (
  <div className='ml-auto hidden sm:block'>
    <button
      className='focus:outline-none focus:text-orange-700 text-orange-500 font-semibold sm:py-2 underline-effect ease-out-effect'
      onClick={() => setPage('authors')}>
      authors
    </button>
    <button
      className='focus:outline-none focus:text-orange-700 text-orange-500 font-semibold sm:ml-8 sm:py-2 underline-effect ease-out-effect'
      onClick={() => setPage('books')}>
      books
    </button>
    {currentUser && (
      <button
        className='focus:outline-none focus:text-orange-700 text-orange-500 font-semibold sm:ml-8 sm:py-2 underline-effect ease-out-effect'
        onClick={() => setPage('add')}>
        add book
      </button>
    )}
    {currentUser && (
      <button
        className='focus:outline-none focus:text-orange-700 text-orange-500 font-semibold sm:ml-8 sm:py-2 underline-effect ease-out-effect'
        onClick={() => setPage('profile')}>
        profile
      </button>
    )}
    <button
      className='focus:outline-none focus:text-orange-700 text-orange-500 font-semibold sm:ml-8 sm:py-2 underline-effect ease-out-effect'
      onClick={currentUser ? logout : () => setPage('login')}>
      {currentUser ? 'logout' : 'login'}
    </button>
  </div>
)

export default NavMenu
