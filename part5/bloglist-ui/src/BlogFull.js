import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {
  deleteEntry,
  createNewLike,
  createNewComment,
} from './reducers/blogReducer'
import { makeNotification, notification } from './reducers/notificationReducer'
import DeleteButton from './components/Buttons/DeleteButton'
import MoreButton from './components/Buttons/MoreButton'
import LikeButton from './components/Buttons/LikeButton'
import Wrapper from './components/Wrapper'
import { useField } from './hooks/index'
import { ReactComponent as Arrow } from './assets/img/ar.svg'
import { ReactComponent as Send } from './assets/img/send.svg'

const BlogFull = ({ entry }) => {
  const dispatch = useDispatch()
  const {
    title,
    author,
    url,
    likes,
    blurb,
    user,
    createdOn,
    id,
    comments,
  } = entry
  const currentUser = useSelector(state => state.currentUser)
  const [showDelete, setShowDelete] = useState(false)
  const [comment, clearComment] = useField('text')

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
      dispatch(createNewLike(entryToChange, currentUser))
    } catch (e) {
      dispatch(
        makeNotification(notification(`action failed: ${e.message}!`, 'red'), 3)
      )
    }
  }

  const addComment = (event, entryToChange) => {
    event.preventDefault()
    try {
      dispatch(
        createNewComment(entryToChange, comment.value, currentUser.token)
      )
      clearComment()
    } catch (e) {
      dispatch(
        makeNotification(notification(`action failed: ${e.message}!`, 'red'), 3)
      )
    }
  }

  return (
    <Wrapper>
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
      <div className='mt-8 mb-4 w-full flex justify-between'>
        <p className='leading-relaxed text-dark'>
          {blurb}{' '}
          <a
            target='_blank'
            rel='noopener noreferrer'
            href={url}
            className='ml-2 pl-1 text-sm font-semibold hover:bg-dark hover:text-light text-dark inline-flex items-center'>
            Read more
            <Arrow className='inline' />
          </a>
        </p>
      </div>
      <div className='w-full flex justify-between'>
        <span className='text-xs text-dark'>
          Posted by {user.name} on {createdOn.split('T')[0]}
        </span>
      </div>
      <div className='mt-8 pt-4 border-t-1 border-l-accent w-full flex flex-col'>
        {comments.map((comment, i) => (
          <span
            key={i}
            className='my-4 border-l-8 pl-2 font-medium border-l-accent text-sm text-dark'>
            {comment}
          </span>
        ))}
      </div>
      <form
        action='#'
        className='mt-4 w-full flex'
        onSubmit={event => addComment(event, entry)}>
        <input
          {...comment}
          className='form-input flex-grow'
          placeholder='Write a comment...'
        />
        <button className='border-none hover:bg-dark hover:text-light text-dark p-2'>
          <Send />
        </button>
      </form>
    </Wrapper>
  )
}

export default BlogFull
