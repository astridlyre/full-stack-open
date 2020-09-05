import React, { useState } from 'react'
import CreateModal from './CreateModal'
import BlogEntry from './BlogEntry'
import { ReactComponent as DownIcon } from '../assets/img/down.svg'

const BlogList = ({
  sendNewEntry,
  blogEntries,
  setShowLiked,
  showLiked,
  currentUser,
  sendDeleteEntry,
  sendNewLike,
}) => {
  const [titleInput, setTitleInput] = useState('')
  const [authorInput, setAuthorInput] = useState('')
  const [urlInput, setUrlInput] = useState('')
  const [showCreateModal, setShowCreateModal] = useState(false)

  const createBlogEntry = event => {
    event.preventDefault()
    const newEntry = {
      title: titleInput,
      author: authorInput,
      url: urlInput,
    }
    sendNewEntry(newEntry)
    setTitleInput('')
    setAuthorInput('')
    setUrlInput('')
    setShowCreateModal(false)
  }

  const filterStyles =
    'font-sm font-semibold text-dark hover:bg-dark hover:text-light px-2 focus:outline-none border-b-4 border-light'

  return (
    <section className='flex flex-col justify-start items-center text-dark font-display sm:rounded px-2 sm:px-0'>
      {showCreateModal ? (
        <CreateModal
          createBlogEntry={createBlogEntry}
          titleInput={titleInput}
          authorInput={authorInput}
          urlInput={urlInput}
          cancelCreateEntry={() => setShowCreateModal(false)}
          setTitleInput={setTitleInput}
          setAuthorInput={setAuthorInput}
          setUrlInput={setUrlInput}
        />
      ) : (
        <div className='w-full'>
          <button
            type='button'
            className='p-2 flex justify-center font-sm font-semibold text-dark w-full bg-l-accent hover:bg-dark hover:text-light'
            onClick={() => setShowCreateModal(true)}>
            <DownIcon />
          </button>
        </div>
      )}
      <div className='mt-8 flex items-center justify-evenly w-full p-2'>
        <button
          className={
            showLiked ? `${filterStyles}` : `${filterStyles} border-dark`
          }
          type='button'
          onClick={() => setShowLiked(false)}>
          most recent
        </button>
        <button
          className={
            !showLiked ? `${filterStyles}` : `${filterStyles} border-dark`
          }
          type='button'
          onClick={() => setShowLiked(true)}>
          top liked
        </button>
      </div>
      <ul className='py-8 flex flex-col w-full'>
        {blogEntries.map(entry => (
          <BlogEntry
            key={entry.id}
            title={entry.title}
            author={entry.author}
            user={entry.user}
            likes={entry.likes}
            createdOn={entry.createdOn}
            url={entry.url}
            currentUser={currentUser}
            sendDeleteEntry={() => sendDeleteEntry(entry.id)}
            sendNewLike={() => sendNewLike(entry)}
          />
        ))}
      </ul>
    </section>
  )
}

export default BlogList
