import React, { useContext, useState } from 'react';
import './FoodItem.css';
import { assets } from '../../assets/assets';
import { StoreContext } from '../../context/StoreContext';

const FoodItem = ({ id, name, price, description, image }) => {
  const { cartItems, addToCart, removeFromCart } = useContext(StoreContext);

  // Local state to control popup visibility, message, and background color
  const [popup, setPopup] = useState({ visible: false, message: '', bgColor: '' });

  // Function to handle adding item to cart with popup
  const handleAddToCart = (id, name) => {
    addToCart(id);
    setPopup({ visible: true, message: `${name} added to cart!`, bgColor: 'green' });

    // Hide the popup after 3 seconds
    setTimeout(() => {
      setPopup({ visible: false, message: '', bgColor: '' });
    }, 3000); // 3000ms = 3 seconds
  };

  // Function to handle removing item from cart with popup
  const handleRemoveFromCart = (id, name) => {
    removeFromCart(id);
    setPopup({ visible: true, message: `${name} removed from cart!`, bgColor: 'red' });

    // Hide the popup after 3 seconds
    setTimeout(() => {
      setPopup({ visible: false, message: '', bgColor: '' });
    }, 3000); // 3000ms = 3 seconds
  };

  return (
    <div className="food-item">
      <div className="food-item-img-container">
        <img className="food-item-image" src={image} alt={name} />
        {!cartItems[id] ? (
          <img
            className="add"
            onClick={() => handleAddToCart(id, name)} // Trigger add
            src={assets.add_icon_white}
            alt="Add"
          />
        ) : (
          <div className="food-item-counter">
            <img
              onClick={() => handleRemoveFromCart(id, name)} // Trigger remove
              src={assets.remove_icon_red}
              alt="Remove"
            />
            <p>{cartItems[id]}</p>
            <img
              onClick={() => handleAddToCart(id, name)} // Trigger add
              src={assets.add_icon_green}
              alt="Add"
            />
          </div>
        )}
      </div>
      <div className="food-item-info">
        <div className="food-item-name-rating">
          <p>{name}</p>
          <img src={assets.rating_starts} alt="Rating" />
        </div>
        <p className="food-item-desc">{description}</p>
        <p className="food-item-price">${price}</p>
      </div>

      {/* Show the popup message */}
      {popup.visible && (
        <div className="popup-message" style={{ backgroundColor: popup.bgColor }}>
          <p>{popup.message}</p>
        </div>
      )}
    </div>
  );
};

export default FoodItem;
