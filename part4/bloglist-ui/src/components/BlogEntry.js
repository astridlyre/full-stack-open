import React, { useState } from 'react'
import { ReactComponent as LikeIcon } from '../assets/img/like.svg'
import { ReactComponent as MoreIcon } from '../assets/img/more.svg'
import { ReactComponent as DeleteIcon } from '../assets/img/delete.svg'

const BlogEntry = ({
  title,
  author,
  url,
  likes,
  user,
  currentUser,
  createdOn,
  sendDeleteEntry,
  sendNewLike,
}) => {
  const [showDelete, setShowDelete] = useState(false)

  return (
    <li className='blogentry mb-8 flex flex-col items-start'>
      <div className='flex items-center justify-between w-full'>
        <a
          href={url}
          className='border-l-8 border-l-accent px-2 hover:bg-dark text-dark hover:text-light'>
          <h4 className='font-semibold font-display text-3xl'>{title}</h4>
        </a>
        {user.id === currentUser.id && (
          <div
            className={
              showDelete ? 'relative bg-l-accent rounded-b' : 'relative'
            }>
            {showDelete && (
              <div
                className='fixed bg-transparent inset-0 z-0'
                onClick={() => setShowDelete(false)}></div>
            )}
            <button
              type='button'
              onClick={() => setShowDelete(!showDelete)}
              className='p-2 showdelete-btn text-dark rounded hover:bg-dark hover:text-light focus:outline-none'>
              <MoreIcon />
            </button>
            {showDelete && (
              <div className='absolute -mt-10 left-0 top-0 bg-l-accent rounded-t'>
                <button
                  type='button'
                  onClick={sendDeleteEntry}
                  className='delete-btn relative p-2 text-dark rounded bg-l-accent hover:bg-dark hover:text-light focus:outline-none'>
                  <DeleteIcon />
                </button>
              </div>
            )}
          </div>
        )}
      </div>
      <div className='flex justify-between items-center w-full'>
        <h5 className='font-semibold font-display text-dark text-lg'>
          by {author}
        </h5>
        <div className='flex items-center'>
          <span className='font-semibold text-dark'>
            {likes} {likes > 1 ? 'likes' : 'like'}
          </span>
          <button
            type='button'
            onClick={sendNewLike}
            className='ml-2 p-2 text-dark rounded hover:bg-dark hover:text-light focus:outline-none'>
            <LikeIcon />
          </button>
        </div>
      </div>
      <div className='w-full flex justify-between'>
        <span className='text-xs text-dark'>
          Posted by {user.name} on {createdOn.split('T')[0]}
        </span>
      </div>
    </li>
  )
}

export default BlogEntry
