import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { populateUsers } from '../reducers/users'
import User from '../components/User/User'
import Wrapper from '../components/Wrapper'

const UserList = () => {
  const dispatch = useDispatch()
  const users = useSelector(state => state.users)

  useEffect(() => {
    dispatch(populateUsers())
  }, [dispatch])

  return (
    <Wrapper>
      <div className='sm:grid sm:grid-cols-2 sm:gap-x-4'>
        {users.map(user => (
          <User key={user.id} user={user} />
        ))}
      </div>
    </Wrapper>
  )
}

export default UserList
