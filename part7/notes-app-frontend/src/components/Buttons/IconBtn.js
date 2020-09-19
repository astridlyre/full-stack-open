import React from 'react'

const IconButton = ({ func = null, children, look = '', type = 'button' }) => {
  const styleToApply = () => {
    switch (look) {
      case 'light':
        return 'flex items-center hover:bg-blue-800 border-0 bg-transparent text-blue-800 hover:text-gray-100 p-2 rounded'
      case 'gray':
        return 'flex items-center hover:bg-blue-800 border-0 bg-transparent text-gray-500 hover:text-gray-100 p-2 rounded'
      case 'menu':
        return 'flex items-center hover:bg-blue-800 bg-transparent border-0 text-gray-100 p-2 rounded'
      default:
        return 'flex items-center hover:bg-blue-900 bg-blue-800 border-0 text-gray-100 p-2 rounded'
    }
  }

  return (
    <button className={styleToApply()} onClick={func} type={type}>
      {children}
    </button>
  )
}

export default IconButton
