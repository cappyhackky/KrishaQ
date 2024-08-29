"use client"
import { user } from '@/lib/Models/UserModel'
import { AuthContext } from '@/lib/Providers/AuthProvider'
import React, { useContext, useEffect, useState } from 'react'
import { BsClipboard2Check, BsClipboard2X } from 'react-icons/bs'
import { FaMailBulk, FaSeedling, FaStoreAlt } from 'react-icons/fa'
import { FaCartFlatbed } from 'react-icons/fa6'
import { MdOutlinePermPhoneMsg, MdPendingActions } from 'react-icons/md'

const Profile = ({ user, totalProducts, orderData }: { user: user, totalProducts: number, orderData: any }) => {
  const [orderSummary, setOrderSummary] = useState({
    pendingOrders: 0,
    completedOrders: 0,
    totalPendingAmount: 0,
    totalCompletedAmount: 0,
  });
  useEffect(() => {
    console.log(orderData);
    
    setOrderSummary(orderData)
  }, [orderData])
  return (
    <>
      <div className="container">
        <div className="flex flex-col-reverse items-end md:items-center md:flex-row justify-end gap-16 border-b-4 px-4 pb-4 border-b-lime-600">
          <div className="flex items-center justify-end text-lime-700">
            {/* <img className="w-32 ms-16" src="/images/others/store.png" alt="store" /> */}
            <div className="text-end">
              <h1 className="text-6xl font-bold border-b-2 mb-2">{user.name}</h1>
              <p className="flex flex-row-reverse items-center gap-4"><FaMailBulk />{user.email}</p>
              <p className="flex flex-row-reverse items-center gap-4"><FaStoreAlt />{user.address}</p>
              <p className="flex flex-row-reverse items-center gap-4"><MdOutlinePermPhoneMsg />+91 {user.phone_no}</p>
            </div>
          </div>
          <img className="rounded-full border-lime-500 border-b-8 shadow-lg aspect-square w-48 h-48 object-cover" src={user.image} alt="" />
        </div>
        <div className="grid md:grid-cols-3 p-4 text-lime-900 bg-fuchsia-100">
          <div className="md:col-span-1 p-4 shadow-lg border border-lime-600 rounded-md flex flex-row text-2xl justify-around items-center">
            <span className="flex flex-col items-center justify-center">
              {totalProducts}
              <h2 className="text- text-xl">Products</h2>
            </span>
            <span className="text-9xl"><FaCartFlatbed /></span>
          </div>
          <div className="md:col-span-2 gap-4 p-4 grid md:grid-cols-2 text-7xl">
            <div className="flex justify-between items-center p-4 shadow-lg border border-lime-600 rounded-md"><MdPendingActions /><span className="text-sm">Pending Orders: {orderSummary.pendingOrders}</span></div>
            <div className="flex justify-between items-center p-4 shadow-lg border border-lime-600 rounded-md"><BsClipboard2Check /><span className="text-sm">Completed Orders: {orderSummary.completedOrders}</span></div>
            <div className="flex justify-between items-center p-4 shadow-lg border border-lime-600 rounded-md"><MdPendingActions /><span className="text-sm">Total Pending Amount: ₹ {orderSummary.totalPendingAmount.toFixed(2)}</span></div>
            <div className="flex justify-between items-center p-4 shadow-lg border border-lime-600 rounded-md"><BsClipboard2Check /><span className="text-sm">Total Completed Amount: ₹ {orderSummary.totalCompletedAmount.toFixed(2)}</span></div>
          </div>
        </div>

      </div>
    </>
  )
}

export default Profile