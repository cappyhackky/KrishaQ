import React from 'react';

const Orders = ({ orders }) => {
  const deliveredOrders = orders.filter(order => order.isDelivered === true);
  const notDeliveredOrders = orders.filter(order => order.isDelivered === false);
  const totalOrders = orders.length;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Orders Overview</h1>
      
      <div className="grid grid-cols-3 gap-4 mb-8">
        <div className="bg-blue-500 text-white p-4 rounded-lg shadow-md">
          <h2 className="text-lg font-semibold">Total Orders</h2>
          <p className="text-3xl">{totalOrders}</p>
        </div>
        <div className="bg-green-500 text-white p-4 rounded-lg shadow-md">
          <h2 className="text-lg font-semibold">Delivered Orders</h2>
          <p className="text-3xl">{deliveredOrders.length}</p>
        </div>
        <div className="bg-red-500 text-white p-4 rounded-lg shadow-md">
          <h2 className="text-lg font-semibold">Undelivered Orders</h2>
          <p className="text-3xl">{notDeliveredOrders.length}</p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-6">
        <div>
          <h3 className="text-xl font-semibold mb-4 text-green-600">Delivered Orders</h3>
          {deliveredOrders.map(order => (
            <div key={order._id} className="bg-white p-4 rounded-lg shadow-md mb-4">
              <p className="font-semibold">Order #{order._id}</p>
              <p>Total: ₹{order.totalPrice}</p>
              <p>Payment Method: {order.paymentMethod}</p>
              <p>Shipping To: {order.shippingAddress.fullName}, {order.shippingAddress.address}, {order.shippingAddress.city}</p>
            </div>
          ))}
        </div>

        <div>
          <h3 className="text-xl font-semibold mb-4 text-red-600">Undelivered Orders</h3>
          {notDeliveredOrders.map(order => (
            <div key={order._id} className="bg-white p-4 rounded-lg shadow-md mb-4">
              <p className="font-semibold">Order #{order._id}</p>
              <p>Total: ₹{order.totalPrice}</p>
              <p>Payment Method: {order.paymentMethod}</p>
              <p>Shipping To: {order.shippingAddress.fullName}, {order.shippingAddress.address}, {order.shippingAddress.city}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Orders;
