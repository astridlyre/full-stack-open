import React from 'react'
import { ReactComponent as Logo } from '../assets/img/logo.svg'
import { ReactComponent as LogoutIcon } from '../assets/img/logout.svg'
import NotificationModal from './NotificationModal'

const Header = ({ logout, username, notification }) => {
  return (
    <header className='sm:px-0 px-4 py-8 mb-8 mt-8 sm:mt-0 flex flex-col sm:flex-row justify-between items-center w-full relative'>
      <Logo className='text-dark w-32 sm:mb-0 mb-2' />
      {username && (
        <div className='flex items-center'>
          <span className='mr-2 font-semibold text-sm text-dark'>
            hi {username}
          </span>
          <button
            className='p-2 text-l-accent flex items-center hover hover:bg-dark hover:text-light'
            onClick={logout}>
            <span className='mr-2 font-semibold text-sm'>logout</span>
            <LogoutIcon />
          </button>
        </div>
      )}
      {notification && (
        <NotificationModal text={notification.text} look={notification.look} />
      )}
    </header>
  )
}

export default Header
