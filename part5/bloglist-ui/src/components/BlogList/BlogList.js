import React, { useState } from 'react'
import CreateModal from '../CreateModal/CreateModal'
import BlogEntry from './BlogEntry'
import CreateModalButton from '../CreateModal/CreateModalButton'
import Filters from '../Filters'

const BlogList = ({
  sendNewEntry,
  blogEntries,
  sendDeleteEntry,
  sendNewLike,
}) => {
  const [showCreateModal, setShowCreateModal] = useState(false)

  return (
    <section className='flex flex-col justify-start items-center text-dark font-display sm:rounded px-2 sm:px-0'>
      {showCreateModal ? (
        <CreateModal
          sendNewEntry={sendNewEntry}
          setShowCreateModal={setShowCreateModal}
        />
      ) : (
        <CreateModalButton func={() => setShowCreateModal(true)} />
      )}
      <Filters />
      <ul className='py-8 flex flex-col w-full'>
        {blogEntries.map(entry => (
          <BlogEntry
            key={entry.id}
            entry={entry}
            sendDeleteEntry={() => sendDeleteEntry(entry.id)}
            sendNewLike={() => sendNewLike(entry)}
          />
        ))}
      </ul>
    </section>
  )
}

export default BlogList
