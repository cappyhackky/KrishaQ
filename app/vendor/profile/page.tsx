"use client";
import React, { useContext, useEffect, useState } from "react";
import Profile from "./components/Profile";
import Products from "./components/Products";
// import Settings from "./components/Settings";
import Orders from "./components/Orders";
import { Product } from '@/lib/Models/ProductModel'
import { AuthContext } from "@/lib/Providers/AuthProvider";
import useCartService from "@/lib/Hooks/useCartStore";

const VendorDashboard = () => {
  const [activeTab, setActiveTab] = useState("profile");
  const [products, setProducts] = useState<Product[]>([]);
  const { user, logout } = useContext(AuthContext) as any;
  const { init } = useCartService();
  const [orderSummary, setOrderSummary] = useState({
    pendingOrders: 0,
    completedOrders: 0,
    totalPendingAmount: 0,
    totalCompletedAmount: 0,
  });
  const [orders, setOrders] = useState([]);
  const fetchVendorOrders = async (vendorId: string) => {
    try {
      const response = await fetch(`/api/orders/vendor?vendor=${vendorId}`);
      if (!response.ok) {
        throw new Error('Failed to fetch vendor orders');
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching vendor orders:', error);
      return null;
    }
  };


  const fetchProductsByVendor = async (vendor: string) => {
    try {
      const response = await fetch('/api/products/vendor-products', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ vendor }),
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }

      const data = await response.json();
      setProducts(data.products || []);
    } catch (error) {
      console.error('Failed to fetch products:', error);
    }
  };

  useEffect(() => {
    const getVendorOrders = async () => {
      const data = await fetchVendorOrders(user._id);
      if (data) {
        setOrderSummary(data.summary);
        setOrders(data.orders);
      }
    };
    if (user && user._id) {
      fetchProductsByVendor(user._id);
      getVendorOrders();
    }
  }, [user]);

  const signOutHandler = () => {
    logout("/signin");
    init();
  };

  const getActivetab = () => {
    switch (activeTab) {
      case "profile":
        return <Profile user={user} totalProducts={products.length} orderData={orderSummary} />;
      case "products":
        return <Products vendorProducts={products} />;
      case "orders":
        return <Orders orders={orders} />;
      // case "settings":
      //   return <Settings />;
      default:
        break;
    }
  };
  return (
    <div className="flex flex-col md:flex-row">
      <div className="lg:block w-full md:w-2/6 lg:w-1/6">
        <ul className="mt-12 p-4">
          <li role="button">
            <div className={`p-3 ${activeTab == 'profile' && 'border-l-4  bg-lime-500 text-white shadow-inner border-lime-900'}`} onClick={() => { setActiveTab("profile"); }}>Profile</div>
          </li>
          <li role="button">
            <div className={`p-3 ${activeTab == 'products' && 'border-l-4  bg-lime-500 text-white shadow-inner border-lime-900'}`} onClick={() => { setActiveTab("products"); }}>Products</div>
          </li>
          <li role="button">
            <div className={`p-3 ${activeTab == 'orders' && 'border-l-4  bg-lime-500 text-white shadow-inner border-lime-900'}`} onClick={() => { setActiveTab("orders"); }}>Orders</div>
          </li>
          {/* <li>
            <div className={`p-3 ${activeTab == 'settings' && 'border-l-4  bg-lime-500 text-white shadow-inner border-lime-900'}`} onClick={() => { setActiveTab("settings"); }}>Settings</div>
          </li> */}
          <li role="button" className={`p-4`} onClick={signOutHandler}>
            <div>Logout</div>
          </li>
        </ul>
      </div>
      {!user ?
        <div className="container flex h-full justify-center items-center mt-32"><span className="text-lime-600 loading loading-lg loading-dots"></span></div>
        :
        <div className="md:w-4/5 mt-2">
          {getActivetab()}
        </div>}
    </div>
  );
};

export default VendorDashboard;
