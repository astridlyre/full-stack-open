import React, { useState } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import Wrapper from './components/Wrapper'
import NavBar from './components/NavBar'
import { ReactComponent as Logo } from './assets/img/logo.svg'

const App = () => {
  const [page, setPage] = useState('authors')

  return (
    <Wrapper>
      <div className='p-4 flex justify-center w-full bg-gray-800 max-w-screen-md sm:rounded-t-sm sm:mt-8'>
        <Logo className='sm:w-48 w-32 text-pink-700' />
      </div>
      <div className='max-w-screen-md w-full bg-gray-100 rounded-sm'>
        <NavBar page={page} setPage={setPage} />
        <div className='sm:p-16 p-4'>
          <Authors show={page === 'authors'} />

          <Books show={page === 'books'} />

          <NewBook show={page === 'add'} />
        </div>
      </div>
    </Wrapper>
  )
}

export default App
