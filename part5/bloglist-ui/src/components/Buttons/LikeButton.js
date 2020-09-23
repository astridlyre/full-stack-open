import React from 'react'
import { ReactComponent as Icon } from '../../assets/img/like.svg'

const LikeButton = ({ func, likes, id }) => {
  const likeBtnStyles =
    'like-btn ml-2 p-2 text-dark rounded hover:bg-dark hover:text-light focus:outline-none'
  const likeBtn = likes.includes(id)
    ? `${likeBtnStyles} text-d-accent`
    : likeBtnStyles

  return (
    <button type='button' onClick={func} className={likeBtn}>
      <Icon />
    </button>
  )
}

export default LikeButton
