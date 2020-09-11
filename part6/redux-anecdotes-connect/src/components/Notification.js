import React from 'react'
import { useSelector } from 'react-redux'

const Notification = () => {
  const message = useSelector(({ notification: { text, look } }) => ({
    text,
    look,
  }))

  return <div className={`notification ${message.look}`}>{message.text}</div>
}

export default Notification
