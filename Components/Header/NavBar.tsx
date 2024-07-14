
import Link from 'next/link'
import React from 'react'
import NavDrawer from './Client/NavDrawer'
import SearchBox from './Client/SearchBox'
import Menu from './Client/Menu'
import UserOptions from './Client/UserOptions'
const NavBar = () => {

  return (
    <>

      <div className="navbar md:px-16">
        <div className="navbar-start">
          <NavDrawer />
        </div>
        <div className="navbar-center hidden md:flex">
          <Link href="/" className="btn btn-ghost text-4xl font-serif">KrishaQ</Link>
        </div>
        <div className="navbar-end">
          <SearchBox />
          <Menu/>
        </div>
        <div className="flex-none z-40">
          <UserOptions/>
        </div>
      </div>
    </>
  )
}

export default NavBar