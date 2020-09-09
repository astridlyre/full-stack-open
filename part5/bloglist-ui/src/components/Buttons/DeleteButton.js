import React from 'react'
import { ReactComponent as Icon } from '../../assets/img/delete.svg'

const DeleteButton = ({ func }) => (
  <button
    type='button'
    onClick={func}
    className='delete-btn relative p-2 text-dark rounded bg-l-accent hover:bg-dark hover:text-light focus:outline-none'>
    <Icon />
  </button>
)

export default DeleteButton
