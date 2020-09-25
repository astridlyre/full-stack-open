import React from 'react'

const LabeledInput = ({ input, text, name }) => (
  <label htmlFor={name} className='flex flex-col w-full'>
    <span className='font-semibold text-sm text-gray-800'>{text}</span>
    <input {...input} className='mt-1 form-input' />
  </label>
)

export default LabeledInput
