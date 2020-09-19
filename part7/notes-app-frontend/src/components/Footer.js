import React from 'react'
import NotePalLogo from './NotePalLogo'

const Footer = () => (
  <footer className='mt-8 w-full bg-blue-900 flex justify-center'>
    <div className='p-8 w-full max-w-screen-md flex sm:flex-none flex-col items-center sm:grid sm:grid-cols-2 sm:gap-x-4'>
      <NotePalLogo />
      <div className='mt-2 sm:mt-0 flex flex-col items-end justify-end'>
        <a
          target='_blank'
          rel='noopener noreferrer'
          className='font-semibold text-sm text-gray-100 hover:underline'
          href='https://github.com/astridlyre'>
          GitHub
        </a>
        <a
          target='_blank'
          rel='noopener noreferrer'
          className='font-semibold text-sm text-gray-100 hover:underline'
          href='https://astridlyre.github.io'>
          Created by Astrid Lyre
        </a>
      </div>
    </div>
  </footer>
)

export default Footer
