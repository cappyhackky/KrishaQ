"use client"
import Link from 'next/link'
import React, { useState } from 'react'
import { BiSolidRightArrow } from 'react-icons/bi';

const NavDrawer = () => {
  const [showDrawer, setShowDrawer] = useState(false)
  const closeDrawer = () => {
    setShowDrawer(false)
  }
  return (
    <>
      <div className="drawer z-50">
        <input id="my-drawer" type="checkbox" checked={showDrawer} onChange={() => { setShowDrawer(!showDrawer) }} className="drawer-toggle" />
        <div className="drawer-content">
          <label tabIndex={0} htmlFor="my-drawer" role="button" className="btn btn-ghost btn-circle drawer-button">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h7" /></svg>
          </label>
        </div>
        <div className="drawer-side">
          <label htmlFor="my-drawer" aria-label="close sidebar" className="drawer-overlay"></label>
          <ul className="menu p-4 w-80 min-h-full bg-base-200 text-base-content">
            <div className="text-2xl flex justify-between items-center font-bold"><span>KrishaQ</span>  <button className="btn btn-circle btn-ghost" onClick={closeDrawer}>✕</button></div>
            <li><Link href="/" onClick={closeDrawer}>Home</Link></li>
            <div className={`dropdown dropdown-right ${showDrawer ? 'block' : 'hidden'}`}>
              <li>
                <div tabIndex={0} className="w-100 flex justify-between"><span>Our Products</span> <BiSolidRightArrow /> </div>
                <ul tabIndex={0} className="dropdown-content menu shadow bg-base-200 rounded w-52">
                  <li><Link href="/products" onClick={closeDrawer}>Product-1</Link></li>
                  <li><Link href="/products" onClick={closeDrawer}>Product-2</Link></li>
                  <li><Link href="/products" onClick={closeDrawer}>Product-3</Link></li>
                </ul>
              </li>
            </div>
            <li><Link href="/about" onClick={closeDrawer}>About</Link></li>
            <li><Link href="/contact" onClick={closeDrawer}>Contact Us</Link></li>
          </ul>
        </div>
      </div>
    </>
  )
}

export default NavDrawer