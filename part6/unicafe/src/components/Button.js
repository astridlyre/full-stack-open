import React from 'react'

const Button = ({ text, handler }) => (
  <button onClick={handler} className={text}>
    {text[0].toUpperCase() + text.substring(1)}
  </button>
)

export default Button
