import React, { useContext, useState, useEffect } from 'react';
import './MyOrders.css';
import { assets } from '../../assets/assets';

const MyOrders = () => {
  const [data, setData] = useState([]);

  // Fetch orders from localStorage when the component mounts
  useEffect(() => {
    const storedOrders = JSON.parse(localStorage.getItem("orders")) || []; // Fetch orders from localStorage
    setData(storedOrders);  // Update the state with the fetched orders
  }, []); // Empty dependency array means this effect runs only once when the component mounts

  return (
    <div className='my-orders'>
      <h2>My Orders</h2>
      <div className="container">
        {data.length === 0 ? (
          <div className="no-orders">
            <p>No orders found</p> {/* "No Orders" message */}
            <img src={assets.empty_icon}  className="empty-box-image" /> {/* Empty box image */}
          </div>
        ) : (
          data.map((order, index) => (
            <div key={index} className="my-orders-order">
              <img src={assets.parcel_icon} alt="Parcel" />
              <p>{order.items.map((item, idx) => {
                return `${item.name} x ${item.quantity}${idx === order.items.length - 1 ? '' : ','}`;
              })}</p>
              <p>${order.amount}.00</p>
              <p>Items: {order.items.length}</p>
              <p><span>&#x25cf;</span> <b>{order.status}</b></p>
              <button>Track Order</button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default MyOrders;
