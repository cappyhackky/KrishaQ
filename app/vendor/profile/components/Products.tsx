"use client";
import React, { useContext, useEffect, useState } from "react";
import ProductForm from "./ProductForm";
import { AuthContext } from "@/lib/Providers/AuthProvider";
import { Product } from "@/lib/Models/ProductModel";
import { FaEdit, FaEye, FaTrashAlt } from "react-icons/fa";
import toast from "react-hot-toast";

const Products = ({vendorProducts}:{vendorProducts:Product[]}) => {
  const [addProduct, setAddProduct] = useState(false);
  const [products, setProducts] = useState<Product[]>([]);
  const [editProduct, setEditProduct] = useState<Product | null>(null);
  const [isEdit, setIsEdit] = useState(false)
  const [loading, setLoading] = useState(true);
  const { user } = useContext(AuthContext) as any;

  const deleteProduct = async (_id: string) => {
    try {
      const response = await fetch('/api/products/vendor-products', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ _id }),
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }
      const data = await response.json();
      setProducts(products.filter(product => product._id !== _id));
      toast.success('Product deleted!');
    } catch (error) {
      console.error('Failed to delete product:', error);
    }
  };
  const handleAddNew = () => {
    setIsEdit(false)
    setAddProduct(true)
  }
  const handleEditProduct = (product: Product) => {
    setEditProduct(product)
    setIsEdit(true)
    setAddProduct(true)
  }
  
  const updateProducts = (updatedProduct: Product) => {
    if (isEdit) {
      setProducts(products.map(product => product._id === updatedProduct._id ? updatedProduct : product));
    } else {
      setProducts([...products, updatedProduct]);
    }
  };
  useEffect(()=>{
    setLoading(true);
    setProducts(vendorProducts);
    setLoading(false);
  },[vendorProducts])

  if (loading) {
    return <div className="container flex h-full justify-center items-center"><span className="text-lime-600 loading loading-lg loading-dots"></span></div>
  }
  return (
    <>
      <div className="container">
        {!addProduct ? (
          products.length > 0 ?
            <div className="overflow-x-auto">
              <table className="table">
                <thead>
                  <tr>
                    <th>Product Name</th>
                    <th>Description</th>
                    <th>Available stock</th>
                    <th className="text-center"><button className="btn bg-lime-500 hover:bg-lime-600 btn-sm border-0 rounded-sm text-white" onClick={handleAddNew}>Add New Product +</button></th>
                  </tr>
                </thead>
                <tbody>
                  {products.map((product: Product) => (
                    <tr key={product.sku}>
                      <td>
                        <div className="flex items-center gap-3">
                          <div className="avatar"><div className="h-12 w-12"><img src={product.images[0]} alt={product.sku} /></div></div>
                          <div>
                            <div className="font-bold">{product.title}</div>
                            <div className="text-sm opacity-50">Rs. {product.price}</div>
                          </div>
                        </div>
                      </td>
                      <td>
                        <div className="">{product.description}</div>
                        <div className="text-sm opacity-50">{product.category.toUpperCase()}</div>
                      </td>
                      <td>{product.stock}</td>
                      <th>
                        <div className="w-full flex justify-around">
                          <button className="btn bg-lime-500 hover:bg-lime-600 btn-sm border-0 rounded-sm text-white" onClick={() => { deleteProduct(product._id) }}><FaTrashAlt /></button>
                          <button className="btn bg-lime-500 hover:bg-lime-600 btn-sm border-0 rounded-sm text-white" onClick={() => { handleEditProduct(product) }}><FaEdit /></button>
                          <a className="btn bg-lime-500 hover:bg-lime-600 btn-sm border-0 rounded-sm text-white" href={`/products/${product.sku}`}><FaEye /></a>
                        </div>
                      </th>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            :
            <div className="mx-auto w-11/12 sm:p-16 lg:p-16 grid md:grid-cols-2 mt-20">
              <div className="flex justify-center items-center border-b-4 md:border-b-0 md:border-r-4 border-lime-900 text-2xl">
                <div className="py-16 lg:p-16">
                  Start adding your products!{" "}
                  <button className="btn rounded bg-lime-500 border-0 text-white hover:bg-lime-600" onClick={() => setAddProduct(true)}>Add Products</button>
                </div>
              </div>
              <div className="mx-auto p-16">
                <img src="/images/others/add-product.png" className="w-32" alt="Add Product" />
              </div>
            </div>
        ) : (
          <ProductForm deactivate={setAddProduct} updateProducts={updateProducts} isEdit={isEdit} product={editProduct} />
        )}
      </div>
    </>
  );
};

export default Products;
