import React from 'react'
import { ReactComponent as Icon } from '../../assets/img/down.svg'

const CreateModalButton = ({ func }) => (
  <div className='w-full'>
    <button
      type='button'
      id='createmodal-open'
      className='p-2 flex justify-center font-sm font-semibold text-dark w-full bg-l-accent hover:bg-dark hover:text-light'
      onClick={func}>
      <Icon />
    </button>
  </div>
)

export default CreateModalButton
