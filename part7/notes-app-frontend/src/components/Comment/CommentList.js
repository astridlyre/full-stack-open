import React from 'react'
import Comment from './Comment'

const CommentList = ({ comments }) => (
  <section>
    {comments
      ? comments.map(comment => <Comment comment={comment} key={comment.id} />)
      : ''}
  </section>
)

export default CommentList
