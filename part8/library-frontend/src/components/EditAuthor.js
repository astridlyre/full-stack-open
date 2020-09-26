import React, { useEffect } from 'react'
import { SET_BIRTHYEAR, ALL_AUTHORS } from '../queries'
import { useMutation } from '@apollo/client'
import LabeledInput from './LabeledInput'
import { useField } from '../hooks'
import Button from './Button'

const EditAuthor = ({ authors }) => {
  const [name, clearName, setName] = useField('text')
  const [born, clearBorn] = useField('number')
  const [setBirthyear] = useMutation(SET_BIRTHYEAR, {
    refetchQueries: [{ query: ALL_AUTHORS }],
  })

  useEffect(() => {
    setName(authors[0]?.name || '')
  }, [setName, authors])

  const updateAuthor = event => {
    event.preventDefault()
    if (!authors.map(a => a.name).includes(name.value)) {
    }
    setBirthyear({
      variables: { name: name.value, born: +born.value },
    }).catch(e => console.log(e))
    clearName()
    clearBorn()
  }

  return (
    <form
      className='sm:grid sm:grid-cols-2 sm:gap-x-4 sm:gap-y-4 mt-8'
      onSubmit={updateAuthor}>
      <h5 className='mb-2 sm:mb-0 col-span-2 text-gray-800 font-black text-2xl'>
        Set birthyear
      </h5>

      <label htmlFor='name' className='flex flex-col w-full'>
        <span className='font-semibold text-sm text-gray-800'>Name</span>
        <select
          name='name'
          id='name'
          className='form-select mt-1'
          required
          value={name.value}
          onChange={name.onChange}>
          {authors.map(a => (
            <option key={a.id} value={a.name}>
              {a.name}
            </option>
          ))}
        </select>
      </label>
      <LabeledInput text='Born' name='born' input={born} />
      <Button
        text='Update author'
        type='submit'
        look='mt-2 sm:mt-0 px-6 py-2 bg-gray-300 text-gray-800 rounded-sm hover:bg-gray-400 text-sm font-semibold'
      />
    </form>
  )
}

export default EditAuthor
