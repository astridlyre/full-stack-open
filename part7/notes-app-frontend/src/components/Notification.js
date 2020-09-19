import React from 'react'
import { useSelector } from 'react-redux'
import { ReactComponent as CheckIcon } from '../assets/img/check-circle.svg'
import { ReactComponent as AlertIcon } from '../assets/img/alert-circle.svg'

const Notification = () => {
  const notification = useSelector(state => state.notification)

  const classes =
    notification.look === 'green'
      ? 'my-1 ease flex items-center text-green-600 p-2 w-full max-w-screen-md bg-green-500 bg-opacity-25 rounded'
      : 'my-1 ease flex items-center text-red-700 p-2 w-full max-w-screen-md bg-red-500 bg-opacity-25 rounded'

  return (
    <div
      className={
        notification.text ? `${classes} opacity-100` : `${classes} opacity-0`
      }>
      {notification.look === 'green' ? <CheckIcon /> : <AlertIcon />}
      <span className='ml-2 text-sm font-display font-semibold text-dark'>
        {notification.text}
      </span>
    </div>
  )
}

export default Notification
