import React from 'react'

const LabeledInput = ({ text, name, input, required = true }) => (
  <div className='labeled-input flex flex-col'>
    <label htmlFor={name}>{text}</label>
    <input id={name} className='form-input' {...input} required={required} />
  </div>
)

export default LabeledInput
