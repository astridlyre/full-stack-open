import React from 'react'

const TextButton = ({
  text = 'Click me',
  look = '',
  func = null,
  type = 'button',
}) => {
  const styleToApply = () => {
    switch (look) {
      case 'light':
        return 'py-2 px-4 font-semibold text-sm border-0 bg-blue-800 text-gray-100 hover:bg-blue-900 rounded'
      case 'dark':
        return 'py-2 px-4 font-semibold text-sm border-0 bg-blue-800 text-gray-100 hover:bg-blue-900 rounded'
      case 'text':
        return 'py-2 px-4 font-semibold text-sm border-0 text-gray-500 hover:bg-blue-800 hover:text-gray-100 rounded'
      case 'l-text':
        return 'py-2 px-4 font-semibold text-sm border-0 text-gray-100 hover:bg-blue-800 rounded'
      default:
        return look
    }
  }

  return (
    <button onClick={func} className={styleToApply()} type={type}>
      {text}
    </button>
  )
}

export default TextButton
