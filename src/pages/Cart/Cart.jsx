import React, { useContext } from 'react';
import './Cart.css';
import { StoreContext } from '../../context/StoreContext';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Cart = () => {
  const { cartItems, food_list, removeFromCart, getTotalCartAmount, token } = useContext(StoreContext);
  const navigate = useNavigate();

  // Function to handle the checkout process
  const handleProceedToCheckout = () => {
    if (!token) {
      // If the user is not logged in, show the toast notification
      toast.error('Please log in to proceed to checkout');
      return;  // Prevent navigation if not logged in
    }

    // If logged in, navigate to the PlaceOrder page
    navigate('/order');
  };

  // Function to handle item removal from the cart with a success toast notification
  const handleRemoveItem = (id, name) => {
    removeFromCart(id);
    toast.error(`${name} removed from cart!`, {
      position: "top-center",
      autoClose: 3000,
      theme: "colored",  // You can change the theme if needed
    });
  };

  return (
    <div className='cart'>
      <div className="cart-items">
        <div className="cart-items-title">
          <p>Items</p>
          <p>Title</p>
          <p>Price</p>
          <p>Quantity</p>
          <p>Total</p>
          <p>Remove</p>
        </div>
        <br />
        <hr />
        {food_list.map((item, index) => {
          if (cartItems[item._id] > 0) {
            return (
              <div key={index}>
                <div className='cart-items-title cart-items-item'>
                  <img src={item.image} alt={item.name} />
                  <p>{item.name}</p>
                  <p>${item.price}</p>
                  <p>{cartItems[item._id]}</p>
                  <p>${item.price * cartItems[item._id]}</p>
                  <p onClick={() => handleRemoveItem(item._id, item.name)} className='cross'>x</p>
                </div>
                <hr />
              </div>
            )
          }
        })}
      </div>

      <div className="cart-bottom">
        <div className="cart-total">
          <h2>Cart Totals</h2>
          <div>
            <div className="cart-total-details">
              <p>Subtotal</p>
              <p>${getTotalCartAmount()}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <p>Delivery Fee</p>
              <p>${getTotalCartAmount() === 0 ? 0 : 2}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <p>Total</p>
              <b>${getTotalCartAmount() === 0 ? 0 : getTotalCartAmount() + 2}</b>
            </div>
          </div>
          <button onClick={handleProceedToCheckout}>PROCEED TO CHECKOUT</button>
        </div>

        <div className="cart-promocode">
          <div>
            <p>If you have a promo code, enter it here</p>
            <div className="cart-promocode-input">
              <input type="text" placeholder='Promo Code' />
              <button>Submit</button>
            </div>
          </div>
        </div>
      </div>

      {/* ToastContainer to display toast notifications */}
      <ToastContainer position="top-center" autoClose={3000} />
    </div>
  );
};

export default Cart;
