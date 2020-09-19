import React from 'react'
import TextButton from '../Buttons/TextButton'
import { Link } from 'react-router-dom'

const NoteHeader = ({ date, user }) => (
  <div className='text-gray-500 text-sm mt-8 px-8 flex justify-between items-center'>
    <span>
      Posted by:{' '}
      <Link to={`/users/${user?.id}`}>
        <TextButton text={user?.name} func={null} look='text' />
      </Link>
    </span>
    <span className=''>{date?.split('T')[0]}</span>
  </div>
)

export default NoteHeader
