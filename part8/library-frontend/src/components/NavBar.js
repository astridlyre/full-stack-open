import React from 'react'
import Button from './Button'

const NavBar = ({ setPage, page }) => {
  const btnStyle =
    'px-6 py-4 text-gray-100 rounded-none hover:bg-gray-600 text-sm font-semibold flex-grow focus:outline-none focus:bg-pink-700'

  return (
    <nav className='w-full flex flex-col sm:flex-row'>
      <Button
        onClick={() => setPage('authors')}
        text='Authors'
        look={
          page === 'authors'
            ? `${btnStyle} bg-pink-700`
            : `${btnStyle} bg-gray-800`
        }
      />
      <Button
        onClick={() => setPage('books')}
        text='Books'
        look={
          page === 'books'
            ? `${btnStyle} bg-pink-700`
            : `${btnStyle} bg-gray-800`
        }
      />
      <Button
        onClick={() => setPage('add')}
        text='Add book'
        look={
          page === 'add' ? `${btnStyle} bg-pink-700` : `${btnStyle} bg-gray-800`
        }
      />
    </nav>
  )
}

export default NavBar
