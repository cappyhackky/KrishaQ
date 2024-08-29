'use client'
import Link from 'next/link'
import React, { useContext } from 'react'
import NavDrawer from './Client/NavDrawer'
import SearchBox from './Client/SearchBox'
import Menu from './Client/Menu'
import UserOptions from './Client/UserOptions'
import { AuthContext } from '@/lib/Providers/AuthProvider'
import { RiRobot2Line } from 'react-icons/ri'
const NavBar = () => {
const {user} = useContext(AuthContext) as any;
  return (
    <>

      <div className="navbar md:px-16">
        <div className="navbar-start">
          <NavDrawer />
        </div>
        <div className="navbar-center hidden md:flex">
          <Link href="/" className="text-lime-900 font-bold text-4xl font-serif">KrishaQ</Link>
        </div>
        <div className="navbar-end">
          <Link href="/krish-ai/krish-bot" className="mx-4 text-3xl text-lime-500"><RiRobot2Line/></Link>
        {user && user.role == "user" && 
          <Menu/>
        }
        </div>
        <div className="flex-none z-40">
          <UserOptions/>
        </div>
      </div>
      {/* <div classsName="divider"></div> */}
    </>
  )
}

export default NavBar