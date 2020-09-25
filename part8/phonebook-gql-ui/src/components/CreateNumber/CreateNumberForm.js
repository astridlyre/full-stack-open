import React from 'react'
import LabeledInput from '../LabeledInput'
import { useField } from '../../hooks/index'

const CreateNumberForm = ({ modal }) => {
  const [name, clearName] = useField('text')
  const [phone, clearPhone] = useField('text')
  const [street, clearStreet] = useField('text')
  const [city, clearCity] = useField('text')

  const onSubmit = event => {
    event.preventDefault()
    modal.submit({
      name: name.value,
      phone: phone.value,
      street: street.value,
      city: city.value,
    })
    clearName()
    clearPhone()
    clearStreet()
    clearCity()
  }

  return (
    <div className='modal absolute inset-0'>
      <div className='modal-bg fixed inset-0' onClick={modal.cancel}></div>
      <form className='flex flex-col create-form mt-8' onSubmit={onSubmit}>
        <div className='w-full flex justify-center'>
          <h4>add contact</h4>
        </div>
        <LabeledInput text='Name' name='name' input={name} />
        <LabeledInput text='Number' name='number' input={phone} />
        <LabeledInput text='Street' name='street' input={street} />
        <LabeledInput text='City' name='city' input={city} />
        <div className='btn-container'>
          <button type='submit' className='btn btn-default'>
            add
          </button>
          <button type='button' className='btn btn-gray' onClick={modal.cancel}>
            cancel
          </button>
        </div>
      </form>
    </div>
  )
}

export default CreateNumberForm
