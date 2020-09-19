import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { login, newUser } from './reducers/user'
import TextButton from './components/Buttons/TextButton'
import useField from './hooks/usefield'

const Login = () => {
  const username = useField('text')
  const password = useField('password')
  const name = useField('text')
  const [showSignUp, setShowSignUp] = useState('')
  const dispatch = useDispatch()
  const history = useHistory()

  const formHandler = event => {
    event.preventDefault()
    showSignUp
      ? dispatch(newUser(username.value, password.value, name.value))
      : dispatch(login(username.value, password.value))
    history.push('/notes')
  }

  return (
    <main className='w-full max-w-screen-md p-8 flex justify-center'>
      <form action='#' onSubmit={formHandler} className='flex flex-col'>
        <h1 className='my-8 text-3xl text-blue-800 font-semibold'>
          Hi! Please log in
        </h1>
        {showSignUp && (
          <>
            <label htmlFor='name' className='text-gray-800'>
              Name:
            </label>
            <input
              type={name.type}
              id='name-input'
              value={name.value}
              className='form-input mt-1'
              onChange={name.onChange}
            />
          </>
        )}
        <label
          htmlFor='username'
          className={showSignUp ? 'text-gray-800 mt-4' : 'text-gray-800'}>
          Username:
        </label>
        <input
          type={username.type}
          id='username-input'
          value={username.value}
          className='form-input mt-1'
          onChange={username.onChange}
        />
        <label htmlFor='password' className='text-gray-800 mt-4'>
          Password:
        </label>
        <input
          type={password.type}
          id='password-input'
          value={password.value}
          className='form-input mt-1'
          onChange={password.onChange}
        />
        <TextButton
          text={showSignUp ? 'Sign up' : 'Log in'}
          look='w-full mt-8 bg-blue-900 hover:bg-blue-800 text-gray-100 font-semibold p-2'
          type='submit'
        />
        <TextButton
          text={showSignUp ? 'Cancel' : 'Create account'}
          look='w-full mt-4 bg-gray-400 hover:bg-gray-600 text-gray-100 font-semibold p-2'
          func={() => setShowSignUp(!showSignUp)}
        />
      </form>
    </main>
  )
}

export default Login
