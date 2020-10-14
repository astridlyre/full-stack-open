import React from 'react'
import { ReactComponent as Icon } from '../assets/img/menu.svg'

const MobileNavMenu = ({
  setPage,
  showMenu,
  setShowMenu,
  currentUser,
  logout,
}) => {
  const handleClick = page => {
    setShowMenu(false)
    setPage(page)
  }

  return (
    <>
      <button
        onClick={() => setShowMenu(!showMenu)}
        className='p-2 text-orange-500 hover:bg-gray-800 focus:bg-gray-800 rounded hover:bg-opacity-25 focus:bg-opacity-25 sm:hidden relative z-40'>
        <Icon />
      </button>
      <div
        className={`absolute inset-x-0 top-0 py-8 flex flex-col items-center z-30 fade-slide-down-effect ${
          showMenu ? '' : 'hidden'
        }`}>
        <div className='p-4 z-20'>
          <button
            className='text-3xl focus:outline-none focus:text-orange-600 text-orange-500 font-semibold underline-effect'
            onClick={() => handleClick('authors')}>
            authors
          </button>
        </div>
        <div className='p-4 z-20'>
          <button
            className='text-3xl focus:outline-none focus:text-orange-600 text-orange-500 font-semibold underline-effect'
            onClick={() => handleClick('books')}>
            books
          </button>
        </div>
        {currentUser && (
          <div className='p-4 z-20'>
            <button
              className='text-3xl focus:outline-none focus:text-orange-600 text-orange-500 font-semibold underline-effect'
              onClick={() => handleClick('add')}>
              add book
            </button>
          </div>
        )}
        <div className='p-4 z-20'>
          <button
            className='text-3xl focus:outline-none focus:text-orange-600 text-orange-500 font-semibold underline-effect'
            onClick={currentUser ? logout : () => handleClick('login')}>
            {currentUser ? 'logout' : 'login'}
          </button>
        </div>
      </div>
      <div
        onClick={() => setShowMenu(false)}
        className={`${
          !showMenu && 'hidden'
        } fixed top-0 right-0 circle-el bg-gray-800 scale-up z-20`}></div>
    </>
  )
}

export default MobileNavMenu
