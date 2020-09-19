import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { createComment } from '../../reducers/comment'
import IconButton from '../Buttons/IconBtn'
import { ReactComponent as Icon } from '../../assets/img/send.svg'

const CommentForm = () => {
  const [commentInput, setCommentInput] = useState('')
  const dispatch = useDispatch()
  const currentUser = useSelector(state => state.currentUser)
  const comment = event => {
    event.preventDefault()
    dispatch(createComment(commentInput, currentUser))
    setCommentInput('')
  }
  return (
    <div className='w-full'>
      <form
        action='#'
        onSubmit={comment}
        className='px-8 pb-8 flex items-center pt-8 mt-4 border-t border-gray-300'>
        <input
          type='text'
          name='comment'
          className='form-input placeholder-gray-400 rounded w-full'
          placeholder='Write a comment...'
          value={commentInput}
          onChange={e => setCommentInput(e.target.value)}
        />
        <IconButton func={null} look='light'>
          <Icon />
        </IconButton>
      </form>
    </div>
  )
}

export default CommentForm
