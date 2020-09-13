import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { createLogin, createNewUser } from './reducers/userReducer'
import { makeNotification, notification } from './reducers/notificationReducer'
import Button from './components/Buttons/Button'

const Login = () => {
  const [usernameInput, setUsernameInput] = useState('')
  const [passwordInput, setPasswordInput] = useState('')
  const [nameInput, setNameInput] = useState('')
  const [showSignUp, setShowSignUp] = useState(false)
  const dispatch = useDispatch()

  const handleUsernameInput = event => setUsernameInput(event.target.value)
  const handlePasswordInput = event => setPasswordInput(event.target.value)
  const handleNameInput = event => setNameInput(event.target.value)

  const login = event => {
    event.preventDefault()
    // function to login user
    try {
      dispatch(createLogin(usernameInput, passwordInput))
    } catch (e) {
      e.message.includes('401')
        ? dispatch(
            makeNotification(
              notification(
                'login failed: username or password incorrect!',
                'red'
              ),
              3
            )
          )
        : dispatch(
            makeNotification(
              notification(`login failed: ${e.message}`, 'red'),
              3
            )
          )
    }
  }

  const signup = event => {
    event.preventDefault()
    try {
      dispatch(createNewUser(usernameInput, passwordInput, nameInput))
    } catch (e) {
      e.message.includes('400')
        ? dispatch(
            makeNotification(
              notification('signup failed: username already taken!', 'red'),
              3
            )
          )
        : dispatch(
            makeNotification(
              notification(`signup failed: ${e.message}!`, 'red'),
              3
            )
          )
    }
  }

  return (
    <section className='bg-l-accent sm:p-32 p-4 flex justify-center items-center text-dark font-display sm:rounded w-full'>
      <form onSubmit={showSignUp ? signup : login} className='w-full'>
        <h3 className='mb-8 text-2xl font-semibold w-full'>Get started</h3>
        {showSignUp && (
          <label htmlFor='name' className='mb-4 flex flex-col w-full'>
            <span className='text-sm font-semibold'>name</span>
            <input
              type='text'
              name='name'
              id='name'
              className='form-input'
              value={nameInput}
              onChange={handleNameInput}
              required
            />
          </label>
        )}
        <label htmlFor='username' className='flex flex-col w-full'>
          <span className='text-sm font-semibold'>username</span>
          <input
            type='text'
            name='username'
            id='username'
            className='form-input'
            value={usernameInput}
            onChange={handleUsernameInput}
            required
          />
        </label>
        <label htmlFor='password' className='mt-4 flex flex-col w-full'>
          <span className='text-sm font-semibold'>password</span>
          <input
            type='password'
            name='password'
            id='password'
            className='form-input'
            value={passwordInput}
            onChange={handlePasswordInput}
            required
          />
        </label>
        <Button
          text={showSignUp ? 'sign up' : 'login'}
          id={showSignUp ? 'signup' : 'login'}
          look='mt-12 px-6 py-2 font-sm font-semibold text-light w-full bg-dark rounded hover:bg-d-accent'
          type='submit'
        />
        <Button
          text={showSignUp ? 'go back' : 'create an account'}
          look='mt-12 px-6 py-2 font-sm font-semibold text-light w-full rounded hover:bg-light hover:text-dark focus:outline-none'
          id={showSignUp ? 'goback' : 'createaccount'}
          func={() => setShowSignUp(!showSignUp)}
        />
      </form>
    </section>
  )
}

export default Login
