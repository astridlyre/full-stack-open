import React from 'react'
import { Link } from 'react-router-dom'
import IconButton from './Buttons/IconBtn'
import TextButton from './Buttons/TextButton'
import { ReactComponent as Icon } from '../assets/img/logout.svg'
import { ReactComponent as InIcon } from '../assets/img/login.svg'
import { useDispatch, useSelector } from 'react-redux'
import { logout } from '../reducers/user'

const NavBar = ({ children }) => {
  const dispatch = useDispatch()
  const currentUser = useSelector(state => state.currentUser)

  return (
    <nav className='flex items-center'>
      <Link to='/'>
        <TextButton text='Home' look='l-text' />
      </Link>
      <Link to='/notes'>
        <TextButton text='Notes' look='l-text' />
      </Link>
      <Link to='/users'>
        <TextButton text='Users' look='l-text' />
      </Link>
      {!currentUser ? (
        <Link to={'/login'}>
          <IconButton func={null} look='menu'>
            <span className='text-sm font-semibold mr-2'>Log in</span>
            <InIcon />
          </IconButton>
        </Link>
      ) : (
        <IconButton func={() => dispatch(logout())} look='menu'>
          <span className='text-sm font-semibold mr-2'>
            {currentUser?.name}
          </span>
          <Icon />
        </IconButton>
      )}
    </nav>
  )
}

export default NavBar
