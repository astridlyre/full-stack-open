import React from 'react'
import { ReactComponent as Icon } from '../../assets/img/logout.svg'

const LogoutButton = ({ func }) => (
  <button
    className='p-2 text-l-accent flex items-center hover hover:bg-dark hover:text-light'
    onClick={func}>
    <span className='mr-2 font-semibold text-sm'>logout</span>
    <Icon />
  </button>
)

export default LogoutButton
