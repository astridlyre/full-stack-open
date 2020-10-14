import React, { useState } from 'react'
import Branding from './Branding'
import NavMenu from './NavMenu'
import MobileNavMenu from './MobileNavMenu'

const NavBar = ({ setPage, currentUser, logout }) => {
  const [showMenu, setShowMenu] = useState(false)

  const wrappedLogout = () => {
    setShowMenu(false)
    logout()
  }

  return (
    <nav className='w-full flex justify-between items-center p-8 sm:p-0 sm:px-16'>
      <Branding />
      <NavMenu
        setPage={setPage}
        currentUser={currentUser}
        logout={wrappedLogout}
      />
      <MobileNavMenu
        setPage={setPage}
        showMenu={showMenu}
        setShowMenu={setShowMenu}
        currentUser={currentUser}
        logout={wrappedLogout}
      />
    </nav>
  )
}

export default NavBar
