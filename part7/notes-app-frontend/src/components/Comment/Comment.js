import React from 'react'
import UserPopup from '../User/UserPopup'

const Comment = ({ content, createdOn, user }) => (
  <div>
    <p>{content}</p>
    <div>
      <span>{createdOn}</span>
      <UserPopup user={user} />
    </div>
  </div>
)

export default Comment
