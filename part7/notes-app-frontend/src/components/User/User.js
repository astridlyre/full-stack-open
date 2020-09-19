import React from 'react'
import { Link } from 'react-router-dom'
import { ReactComponent as Icon } from '../../assets/img/notepal-triangles.svg'
import Avatar from '../User/Avatar'

const User = ({ user }) => (
  <article className='my-4 border border-gray-300 rounded'>
    <div className='p-8 flex flex-col items-start justify-start'>
      <span className='text-sm text-gray-500'>
        Member since: {user.joinedOn.split('T')[0]}
      </span>
      <div className='py-2 flex items-center'>
        <Avatar>
          <Icon className='w-8 h-8' />
        </Avatar>
        <Link to={`/users/${user.id}`}>
          <h2 className='ml-2 hover:underline mt-2 text-blue-800 font-bold text-3xl'>
            {user.name}
          </h2>
        </Link>
      </div>
      {user.comments.length ? (
        <div>
          <h3 className='mt-2 -mb-4 text-blue-800 font-semibold'>
            Most recent comment
          </h3>
          <p className='leading-relaxed'>{user.comments[0]?.content}</p>
        </div>
      ) : (
        <div>
          <h3 className='mt-2 text-blue-800 font-semibold'>No comments</h3>
        </div>
      )}
    </div>
  </article>
)

export default User
