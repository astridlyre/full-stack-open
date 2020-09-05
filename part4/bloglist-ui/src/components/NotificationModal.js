import React from 'react'

const NotificationModal = ({ look = '', text = '' }) => {
  const classes =
    look === 'green'
      ? 'absolute inset-x-0 bottom-0 -mb-4 ml-2 sm:ml-0 p-2 border-l-4 border-green-500 bg-green-500 bg-opacity-25'
      : 'absolute inset-x-0 bottom-0 -mb-4 ml-2 sm:ml-0 p-2 border-l-4 border-red-500 bg-red-500 bg-opacity-25'
  return (
    <div className={classes}>
      <span className='text-sm font-display font-semibold text-dark'>
        {text}
      </span>
    </div>
  )
}

export default NotificationModal
