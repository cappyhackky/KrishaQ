import React from 'react'

const page = async () => {
  const res = await fetch("https://dummyjson.com/products?limit=10")
  const result = await res.json()
  const products = result.products  
  return (
    <>

    </>
  )
}

export default page