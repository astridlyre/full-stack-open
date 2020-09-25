import React from 'react'

const Button = ({ type = 'button', onClick = null, text, look = '' }) => (
  <button type={type} onClick={onClick} className={look}>
    {text}
  </button>
)

export default Button
