import React, { useEffect, useState, useRef } from 'react'
import { useField } from '../hooks/index'
import { ReactComponent as Icon } from '../assets/img/edit.svg'
import { useMutation } from '@apollo/client'
import { EDIT_AUTHOR, GET_AUTHORS_AND_BOOKS } from '../services/index'

const Author = ({ author, currentUser, setNotify }) => {
  const [birth, , setBirth] = useField('number')
  const [editing, setEditing] = useState(false)
  const [editAuthor] = useMutation(EDIT_AUTHOR, {
    onError: error => {
      setNotify(error.graphQLErrors[0].message)
    },
    refetchQueries: [{ query: GET_AUTHORS_AND_BOOKS }],
  })
  const inputEl = useRef(null)

  useEffect(() => setBirth(author.born || ''), [author, setBirth])

  const edit = () => {
    if (!editing) {
      inputEl.current.disabled = false
      inputEl.current.focus()
      setEditing(true)
      return
    }
    inputEl.current.disabled = true
    window.getSelection().removeAllRanges()
    setEditing(false)
    editAuthor({
      variables: {
        name: author.name,
        born: +birth.value,
      },
    })
      .then(res => {
        setNotify(`Changed ${author.name}'s dob to ${res.data.editAuthor.born}`)
        setBirth(res.data.editAuthor.born)
      })
      .catch(e => console.log(e))
  }

  return (
    <div className='p-4 rounded bg-gray-800 bg-opacity-25 hover:bg-opacity-50 mt-2 text-gray-200 fade-slide-in-effect flex flex-col sm:flex-row sm:items-center justify-between'>
      <div className='flex sm:items-center flex-col sm:flex-row'>
        <h3 className='text-2xl font-semibold'>{author.name}</h3>
        <div className='sm:ml-2 text-gray-500 opacity-75 z-10'>
          {currentUser && (
            <button
              onClick={edit}
              className={
                editing
                  ? 'text-orange-500 p-1'
                  : 'opacity-50 hover:opacity-100 p-1'
              }>
              <Icon />
            </button>
          )}
          <span>{author.born ? 'Born ' : 'no dob on file'}</span>
          <input
            ref={inputEl}
            {...birth}
            disabled
            className={
              editing
                ? 'bg-transparent w-16 born border border-orange-500 rounded'
                : 'bg-transparent border border-transparent rounded w-16 born'
            }
          />
          {editing && (
            <div className='inset-0 fixed z-minus' onClick={edit}></div>
          )}
        </div>
      </div>

      <div className='mt-4 sm:mt-0'>
        <span>
          {author.bookCount} {author.bookCount === 1 ? 'book' : 'books'}
        </span>
      </div>
    </div>
  )
}

export default Author
