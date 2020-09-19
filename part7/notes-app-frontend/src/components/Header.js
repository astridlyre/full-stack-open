import React from 'react'
import NotePalLogo from './NotePalLogo'
import NavBar from './NavBar'

const Header = () => (
  <header className='w-full bg-blue-900 py-4 px-8 flex justify-center items-end shadow relative'>
    <div className='px-8 max-w-screen-md w-full flex flex-col sm:flex-row justify-between sm:items-end items-center'>
      <NotePalLogo />
      <NavBar />
    </div>
  </header>
)

export default Header
