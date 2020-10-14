import React from 'react'

const LabelInput = ({ input, text }) => (
  <label>
    <span className='mb-1 font-medium'>{text}</span>
    <input className='form-input bg-gray-300 text-gray-900 w-full' {...input} />
  </label>
)

export default LabelInput
