import React from 'react'

const Button = ({ text, look = '', func = null, type = 'button', id = '' }) => (
  <button onClick={func} className={look} type={type} id={id}>
    {text}
  </button>
)

export default Button
