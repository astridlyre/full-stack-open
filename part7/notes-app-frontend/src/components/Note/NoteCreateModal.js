import React, { useState } from 'react'
import { ReactComponent as EditIcon } from '../../assets/img/edit.svg'
import IconButton from '../Buttons/IconBtn'
import NoteCreateForm from './NoteCreateForm'

const NoteCreateModal = () => {
  const [showNoteCreateModal, setShowCreateModal] = useState(false)

  return (
    <div className='w-full flex items-center relative'>
      {showNoteCreateModal && (
        <NoteCreateForm cancel={() => setShowCreateModal(false)} />
      )}
      <IconButton func={() => setShowCreateModal(true)} look='light'>
        <EditIcon />
        <span className='font-semibold text-sm ml-1'>New Note</span>
      </IconButton>
    </div>
  )
}

export default NoteCreateModal
