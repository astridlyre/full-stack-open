import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { newNum } from '../../reducers/numbers'
import CreateNumberForm from './CreateNumberForm'

const CreateNumberModal = () => {
  const [showModal, setShowModal] = useState(false)
  const dispatch = useDispatch()

  const modal = () => {
    const submit = number => {
      dispatch(newNum(number))
      setShowModal(false)
    }

    const cancel = () => setShowModal(false)

    return {
      submit,
      cancel,
    }
  }

  return (
    <div className='relative'>
      {showModal && <CreateNumberForm modal={modal()} />}
      <button
        type='button'
        className='mt-4 btn btn-default w-full'
        onClick={() => setShowModal(true)}>
        create
      </button>
    </div>
  )
}

export default CreateNumberModal
