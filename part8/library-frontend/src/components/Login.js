import React, { useState } from 'react'
import { useMutation } from '@apollo/client'
import { ADD_USER, LOGIN } from '../queries'
import { useField } from '../hooks'
import LabeledInput from './LabeledInput'
import Button from './Button'
import PageWrapper from './PageWrapper'
import PageTitle from './PageTitle'

const Login = ({ show, currentUser, setCurrentUser, setPage }) => {
  const [name, clearName] = useField('text')
  const [username, clearUsername] = useField('text')
  const [password, clearPassword] = useField('password')
  const [isSignUpVisible, setIsSignUpVisible] = useState(false)
  const [createUser] = useMutation(ADD_USER)
  const [loginUser] = useMutation(LOGIN)
  // const [getMe, result] = useLazyQuery(ME)

  const login = event => {
    event.preventDefault()
    loginUser({
      variables: {
        username: username.value,
        password: password.value,
      },
    })
      .then(res => {
        const token = res.data.login.value
        setCurrentUser(token)
        // getMe({ variables: { value: res.data.login.value } })
        setPage('authors')
        localStorage.setItem('user', token)
      })
      .catch(e => console.log(e))
    clearUsername()
    clearPassword()
  }

  const signup = event => {
    event.preventDefault()
    createUser({
      variables: {
        name: name.value,
        username: username.value,
        password: password.value,
      },
    })
      .then(login)
      .catch(e => console.log(e))
    clearName()
    clearUsername()
    clearPassword()
  }

  if (!show) {
    return null
  }

  return (
    <PageWrapper>
      <div className='w-full flex flex-col items-center'>
        <PageTitle text={isSignUpVisible ? 'Sign Up' : 'Login'} />

        <form
          className='mt-4 pt-4 border-t-2 border-gray-800 w-full text-sm sm:text-base max-w-xs flex flex-col items-center'
          onSubmit={isSignUpVisible ? signup : login}>
          {isSignUpVisible && (
            <LabeledInput input={name} text='Name' name='name' />
          )}
          <LabeledInput input={username} text='Username' name='username' />
          <LabeledInput input={password} text='Password' name='password' />

          <Button
            text={isSignUpVisible ? 'Create' : 'Login'}
            look='btn-animation mt-8 px-6 py-2 bg-pink-700 text-gray-100 rounded-sm hover:bg-pink-900 text-sm font-semibold w-full'
            type='submit'
          />
          <Button
            text={isSignUpVisible ? 'Back' : 'Create Account'}
            look='btn-animation mt-2 px-6 py-2 bg-gray-300 text-gray-800 rounded-sm hover:bg-gray-400 text-sm font-semibold w-full'
            type='button'
            onClick={() => setIsSignUpVisible(!isSignUpVisible)}
          />
        </form>
      </div>
    </PageWrapper>
  )
}

export default Login
