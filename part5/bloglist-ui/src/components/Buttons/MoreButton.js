import React from 'react'
import { ReactComponent as Icon } from '../../assets/img/more.svg'

const MoreButton = ({ func }) => (
  <button
    type='button'
    onClick={func}
    className='p-2 showdelete-btn text-dark rounded hover:bg-dark hover:text-light focus:outline-none'>
    <Icon />
  </button>
)

export default MoreButton
