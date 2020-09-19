import React, { useState } from 'react'
import CreateModal from '../CreateModal/CreateModal'
import BlogEntry from './BlogEntry'
import CreateModalButton from '../CreateModal/CreateModalButton'
import Filters from '../Filters'
import Wrapper from '../Wrapper'

const BlogList = ({ blogEntries }) => {
  const [showCreateModal, setShowCreateModal] = useState(false)

  return (
    <Wrapper>
      {showCreateModal ? (
        <CreateModal setShowCreateModal={setShowCreateModal} />
      ) : (
        <CreateModalButton func={() => setShowCreateModal(true)} />
      )}
      <Filters />
      <ul className='py-8 flex flex-col w-full'>
        {blogEntries.map(entry => (
          <BlogEntry key={entry.id} entry={entry} />
        ))}
      </ul>
    </Wrapper>
  )
}

export default BlogList
