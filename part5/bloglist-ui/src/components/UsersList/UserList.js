import React from 'react'
import UserEntry from './UserEntry'
import Wrapper from '../Wrapper'

const UserList = ({ users }) => (
  <Wrapper>
    <h1 className='w-full text-3xl font-semibold text-dark border-b-4 border-l-accent'>
      Users
    </h1>
    <ul className='py-8 flex flex-col w-full'>
      {users.map(user => (
        <UserEntry key={user.id} user={user} />
      ))}
    </ul>
  </Wrapper>
)

export default UserList
