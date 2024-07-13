import Link from 'next/link'
import React from 'react'
import NavDrawer from './Client/NavDrawer'
import SearchBox from './Client/SearchBox'
import Menu from './Client/Menu'
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
          <div className="dropdown dropdown-end">
            <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
              <div className="w-10 rounded-full">
                <img alt="Tailwind CSS Navbar component" src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
              </div>
            </div>
            <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
              <li>
                <a className="justify-between">
                  Profile
                  <span className="badge">New</span>
                </a>
              </li>
              <li><a>Settings</a></li>
              <li><a>Logout</a></li>
            </ul>
          </div>
        </div>
      </div>
    </>
  )
}

export default NavBar