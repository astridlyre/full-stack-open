import React from 'react'
import { Link } from 'react-router-dom'
import { ReactComponent as Logo } from '../assets/img/logo.svg'
import { useSelector, useDispatch } from 'react-redux'
import NotificationModal from './NotificationModal'
import LogoutButton from './Buttons/LogoutButton'
import { createLogout } from '../reducers/userReducer'

const Header = () => {
  const dispatch = useDispatch()
  const notification = useSelector(state => state.notification)
  const currentUser = useSelector(state => state.currentUser)

  return (
    <header className='sm:px-0 px-4 py-8 mb-8 mt-8 sm:mt-0 flex flex-col sm:flex-row justify-between items-center w-full relative'>
      <Logo className='text-dark w-32 sm:mb-0 mb-2' />

      {currentUser && (
        <div className='flex items-center'>
          <Link
            to='/'
            className='mr-4 p-2 text-dark font-semibold text-sm flex items-center hover hover:bg-dark hover:text-light rounded-sm'>
            blogs
          </Link>
          <Link
            to='/users'
            className='mr-4 p-2 text-dark font-semibold text-sm flex items-center hover hover:bg-dark hover:text-light rounded-sm'>
            users
          </Link>
          <span className='mr-2 font-semibold text-sm text-dark'>
            hi {currentUser.name}
          </span>
          <LogoutButton func={() => dispatch(createLogout())} />
        </div>
      )}

      {notification.text && (
        <NotificationModal text={notification.text} look={notification.look} />
      )}
    </header>
  )
}

export default Header
