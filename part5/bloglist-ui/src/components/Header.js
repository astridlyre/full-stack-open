import React from 'react'
import { ReactComponent as Logo } from '../assets/img/logo.svg'
import { useSelector } from 'react-redux'
import NotificationModal from './NotificationModal'
import LogoutButton from './Buttons/LogoutButton'

const Header = ({ logout, username }) => {
  const notification = useSelector(state => state.notification)

  return (
    <header className='sm:px-0 px-4 py-8 mb-8 mt-8 sm:mt-0 flex flex-col sm:flex-row justify-between items-center w-full relative'>
      <Logo className='text-dark w-32 sm:mb-0 mb-2' />

      {username && (
        <div className='flex items-center'>
          <span className='mr-2 font-semibold text-sm text-dark'>
            hi {username}
          </span>
          <LogoutButton func={logout} />
        </div>
      )}

      {notification.text && (
        <NotificationModal text={notification.text} look={notification.look} />
      )}
    </header>
  )
}

export default Header
