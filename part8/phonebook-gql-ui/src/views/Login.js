import React from 'react'
import { useField } from '../hooks/index'
import LabeledInput from '../components/LabeledInput'

const Login = () => {
  const [name, clearName] = useField('text')
  const [username, clearUsername] = useField('text')
  const [password, clearPassword] = useField('password')

  return (
    <form className='login-form flex flex-col'>
      <h1>:: sign in ::</h1>
      <LabeledInput text='Name' name='name' input={name} />
      <LabeledInput text='Username' name='username' input={username} />
      <LabeledInput text='Password' name='password' input={password} />
      <div className='flex flex-col btn-container'>
        <button type='submit' className='btn btn-primary'>
          sign in
        </button>
        <button className='btn btn-gray'>create account</button>
      </div>
    </form>
  )
}

export default Login
