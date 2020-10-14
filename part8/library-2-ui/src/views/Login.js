import React, { useState } from 'react'
import Page from '../components/Page'
import PageTitle from '../components/PageTitle'
import LabeledInput from '../components/LabeledInput'
import { useField } from '../hooks/index'
import { ReactComponent as Icon } from '../assets/img/user.svg'
import { useMutation } from '@apollo/client'
import { ADD_USER, LOGIN } from '../services'

const Login = ({ show, setPage, setCurrentUser, setNotify }) => {
  const [username, clearUsername] = useField('text')
  const [password, clearPassword] = useField('password')
  const [confirmPassword, clearConfirmPassword] = useField('password')
  const [showSignUp, setShowSignUp] = useState(false)
  const [createUser] = useMutation(ADD_USER)
  const [loginUser] = useMutation(LOGIN)

  const signup = e => {
    e.preventDefault()
    if (password.value !== confirmPassword.value) {
      setNotify('Passwords do not match!')
      return
    }
    createUser({
      variables: {
        username: username.value,
        password: password.value,
      },
    })
      .then(() => {
        setNotify(`Signup Successful! Logging you in ${username.value}`)
        login()
      })
      .catch(e => console.log(e))
  }

  const login = e => {
    e.preventDefault()
    loginUser({
      variables: {
        username: username.value,
        password: password.value,
      },
    })
      .then(res => {
        const token = res.data.login.value
        setCurrentUser(token)
        setPage('authors')
        localStorage.setItem('booktime-user-token', token)
        setNotify(`Login Successful! Hi ${username.value}`)
      })
      .catch(e => console.log(e))
    clearUsername()
    clearPassword()
    clearConfirmPassword()
  }

  if (!show) {
    return null
  }

  return (
    <Page>
      <div className='flex justify-between items-center relative w-full'>
        <PageTitle title='login' />
      </div>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-x-8 sm:w-full'>
        <form
          className='max-w-md grid grid-cols-1 gap-y-4'
          onSubmit={showSignUp ? signup : login}>
          <LabeledInput input={username} text='Username' />
          <LabeledInput input={password} text='Password' />
          {showSignUp && (
            <LabeledInput input={confirmPassword} text='Confirm Password' />
          )}
          <div className='grid grid-cols-1 md:grid-cols-2 md:gap-x-4'>
            <button
              type='submit'
              className='font-semibold text-sm bg-gray-700 py-3 rounded hover:bg-orange-600 ease-out-effect'>
              {showSignUp ? 'sign up' : 'login'}
            </button>
            <button
              type='button'
              onClick={() => setShowSignUp(!showSignUp)}
              className='mt-2 md:mt-0 font-semibold text-sm bg-gray-800 py-3 rounded hover:bg-gray-700 ease-out-effect'>
              {showSignUp ? 'cancel' : 'create account'}
            </button>
          </div>
        </form>
        <div className='hidden md:flex text-orange-500 items-center justify-center'>
          <Icon />
        </div>
      </div>
    </Page>
  )
}

export default Login
