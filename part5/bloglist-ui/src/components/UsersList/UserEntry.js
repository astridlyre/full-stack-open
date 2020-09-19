import React from 'react'
import { Link } from 'react-router-dom'

const BlogEntry = ({ user }) => (
  <li className='mb-8 flex'>
    <div className='flex items-center justify-between w-full'>
      <Link
        to={`/users/${user.id}`}
        className='border-l-8 border-l-accent px-2 hover:bg-dark text-dark hover:text-light'>
        <h4 className='font-semibold font-display text-2xl'>{user.username}</h4>
      </Link>
      <span className='font-semibold text-dark'>
        posts: {user.blogEntries.length}
      </span>
    </div>
  </li>
)

export default BlogEntry
