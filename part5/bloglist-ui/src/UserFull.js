import React from 'react'
import Wrapper from './components/Wrapper'
import { Link } from 'react-router-dom'

const UserFull = ({ user }) => (
  <Wrapper>
    <div className='py-8 flex items-center justify-between w-full'>
      <div className='border-l-8 border-l-accent px-2 text-dark'>
        <h1 className='font-semibold font-display text-3xl'>{user.username}</h1>
      </div>
    </div>
    <div className='flex justify-between items-center w-full'>
      <h2 className='font-semibold font-display text-dark text-lg'>
        aka {user.name}
      </h2>
      <span className='text-sm font-medium text-dark'>
        Total posts: {user.blogEntries.length}
      </span>
    </div>
    <div className='mt-8 pt-4 border-t-4 border-l-accent w-full flex sm:flex-none sm:grid sm:grid-cols-2 sm:gap-x-8'>
      <div>
        <h3 className='font-semibold font-display text-dark text-lg'>
          Entries:{' '}
        </h3>
      </div>
      <ul>
        {user.blogEntries.map(entry => (
          <Link
            key={entry.id}
            to={`/blogs/${entry.id}`}
            className='block hover:text-d-accent text-dark px-2'>
            <li className='font-semibold font-display text-lg'>
              {entry.title}
            </li>
          </Link>
        ))}
      </ul>
    </div>
  </Wrapper>
)

export default UserFull
