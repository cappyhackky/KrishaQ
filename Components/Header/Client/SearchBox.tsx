"use client"
import React, { useEffect, useState } from 'react';


const SearchBox = () => {
  const [showSearch, setShowSearch] = useState(false);
  const openModal = () => {
    console.log(showSearch);
    setShowSearch(true)
  }
  const closeModal = () => {
    console.log(showSearch);
    setShowSearch(false)
  }

  useEffect(() => {

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        closeModal();
      }
    };

    if (showSearch) {
      window.addEventListener("keydown", handleKeyDown);
    }

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [showSearch]);

  return (
    <>
      <button className="btn btn-ghost btn-circle" onClick={openModal}>
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
      </button>
      {showSearch && (
        <div className="fixed inset-0 z-50 flex pt-32 items-start justify-center bg-black bg-opacity-50">
          <div className="modal-box relative bg-slate-200 p-6 rounded-lg shadow-lg">
            <button className="absolute top-1 right-1 btn btn-circle btn-sm btn-ghost hover:bg-transparent font-bold" onClick={closeModal}>✕</button>
            <input type="text" placeholder="Search for products" className="my-4 input input-lg w-full border" />
            <button className="btn btn-primary text-lg tracking-wide">Search</button>
          </div>
        </div>
      )}
    </>
  )
}

export default SearchBox