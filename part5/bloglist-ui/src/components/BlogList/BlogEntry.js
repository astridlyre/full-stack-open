import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { deleteEntry, createNewLike } from '../../reducers/blogReducer'
import {
  makeNotification,
  notification,
} from '../../reducers/notificationReducer'
import DeleteButton from '../Buttons/DeleteButton'
import MoreButton from '../Buttons/MoreButton'
import LikeButton from '../Buttons/LikeButton'

const BlogEntry = ({ entry }) => {
  const dispatch = useDispatch()
  const { title, author, url, likes, user, createdOn, id } = entry
  const currentUser = useSelector(state => state.currentUser)
  const [showDelete, setShowDelete] = useState(false)

  // function to delete entry
  const sendDeleteEntry = idToDelete => {
    try {
      dispatch(deleteEntry(idToDelete, currentUser.token))
      dispatch(makeNotification(notification('deleted entry', 'red'), 3))
    } catch (e) {
      dispatch(
        makeNotification(notification(`action failed: ${e.message}!`, 'red'), 3)
      )
    }
  }

  // function to like or unlike a post
  const sendNewLike = entryToChange => {
    try {
      dispatch(createNewLike(entryToChange, currentUser.token))
    } catch (e) {
      dispatch(
        makeNotification(notification(`action failed: ${e.message}!`, 'red'), 3)
      )
    }
  }

  return (
    <li className='blogentry mb-8 flex flex-col items-start'>
      <div className='flex items-center justify-between w-full'>
        <a
          href={url}
          target='_blank'
          rel='noopener noreferrer'
          className='border-l-8 border-l-accent px-2 hover:bg-dark text-dark hover:text-light'>
          <h4 className='font-semibold font-display text-3xl'>{title}</h4>
        </a>

        {currentUser && user.id === currentUser.id && (
          <div
            className={
              showDelete ? 'relative bg-l-accent rounded-b' : 'relative'
            }>
            {showDelete && (
              <div
                className='fixed bg-transparent inset-0 z-0'
                onClick={() => setShowDelete(false)}></div>
            )}

            <MoreButton func={() => setShowDelete(!showDelete)} />

            {showDelete && (
              <div className='absolute -mt-10 left-0 top-0 bg-l-accent rounded-t'>
                <DeleteButton func={() => sendDeleteEntry(id)} />
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
            {likes.length || '0'}{' '}
            {likes.length > 1 || !likes.length ? 'likes' : 'like'}
          </span>
          <LikeButton
            func={() => sendNewLike(entry)}
            likes={likes}
            id={currentUser.id}
          />
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
