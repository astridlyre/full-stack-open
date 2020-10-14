import React from 'react'
import Page from '../components/Page'
import PageTitle from '../components/PageTitle'
import Author from '../components/Author'
import { ReactComponent as Icon } from '../assets/img/pen.svg'
import { useQuery } from '@apollo/client'
import { GET_AUTHORS } from '../services'
import { ReactComponent as LoaderIcon } from '../assets/img/loader.svg'

const Authors = ({ show, currentUser, setNotify }) => {
  const authorsResult = useQuery(GET_AUTHORS)
  const authors = authorsResult.data?.allAuthors || []

  if (!show) {
    return null
  }

  return (
    <Page>
      <div className='flex justify-between items-center w-full'>
        <PageTitle title='authors' />
        <div className='mb-8 fade-slide-in-right-effect text-orange-500'>
          <Icon />
        </div>
      </div>
      {authorsResult.loading && (
        <div className='w-full h-64 flex justify-center items-center text-orange-500'>
          <LoaderIcon />
        </div>
      )}
      <ul className='w-full'>
        {authors.map(a => (
          <Author
            key={a.id}
            author={a}
            currentUser={currentUser}
            setNotify={setNotify}
          />
        ))}
      </ul>
    </Page>
  )
}

export default Authors
