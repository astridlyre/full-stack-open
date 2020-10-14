import React from 'react'
import Page from '../components/Page'
import PageTitle from '../components/PageTitle'
import Author from '../components/Author'
import { ReactComponent as Icon } from '../assets/img/pen.svg'

const Authors = ({ show, authors, currentUser, setNotify }) => {
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
