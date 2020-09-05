import React from 'react'

const Button = ({ text, look = '', func = null, type = 'button' }) => (
  <button onClick={func} className={look} type={type}>
    {text}
  </button>
)

export default Button
