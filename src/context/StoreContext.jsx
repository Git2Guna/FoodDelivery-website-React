import { createContext, useEffect, useState } from "react";
import { food_list } from "../assets/assets";
import './StoreContext.css'

export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {
  const [cartItems, setCartItems] = useState({});
  const [token, setToken] = useState(null);
  const [orders, setOrders] = useState([]);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false); // State to control the success message popup
  const [search, setSearch] = useState('');
  const [showSearch, setShowSearch] = useState(false);

  // Load cart items, token, and orders from localStorage on initial load
  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    const storedCart = localStorage.getItem("cartItems");
    const storedOrders = localStorage.getItem("orders");

    if (storedToken) {
      setToken(storedToken);
    }

    if (storedCart) {
      setCartItems(JSON.parse(storedCart));
    }

    if (storedOrders) {
      setOrders(JSON.parse(storedOrders));
    }
  }, []);

  // Save cartItems to localStorage whenever cartItems state changes
  useEffect(() => {
    if (Object.keys(cartItems).length > 0) {
      localStorage.setItem("cartItems", JSON.stringify(cartItems));
    }
  }, [cartItems]);

  // Save orders to localStorage whenever orders state changes
  useEffect(() => {
    if (orders.length > 0) {
      localStorage.setItem("orders", JSON.stringify(orders));
    }
  }, [orders]);

  // Function to handle placing an order
  const placeOrder = (deliveryInfo) => {
    // Create the order data
    const order = {
      items: Object.keys(cartItems).map((itemId) => ({
        name: food_list.find((product) => product._id === itemId)?.name || "Food Name",
        quantity: cartItems[itemId],
        price: food_list.find((product) => product._id === itemId)?.price || 5,
      })),
      amount: getTotalCartAmount(),
      delivery: deliveryInfo,
      status: "Pending", // You can update the status as needed
    };

    // Add the new order to the list of orders
    const updatedOrders = [...orders, order];
    setOrders(updatedOrders);

    // Save the updated orders to localStorage
    localStorage.setItem("orders", JSON.stringify(updatedOrders));

    // Optionally, clear the cart after the order is placed
    localStorage.removeItem("cartItems");

    // Clear cartItems state
    setCartItems({});

    // Show the success message popup after 3 seconds
    setTimeout(() => {
      setShowSuccessMessage(true);  // Show the success message after 1 seconds
    }, 1000);

    // Optionally, hide the message after a few seconds (e.g., 4 more seconds)
    setTimeout(() => {
      setShowSuccessMessage(false);
    }, 5000);  // Hide the message after 5 seconds
  };

  // Get total cart amount (total cost of items in the cart)
  const getTotalCartAmount = () => {
    let totalAmount = 0;
    for (const item in cartItems) {
      if (cartItems[item] > 0) {
        const itemInfo = food_list.find((product) => product._id === item);
        if (itemInfo) {
          totalAmount += itemInfo.price * cartItems[item];
        }
      }
    }
    return totalAmount;
  };

  // Add item to the cart
  const addToCart = (itemId) => {
    setCartItems((prev) => {
      const newCart = { ...prev };
      if (!newCart[itemId]) {
        newCart[itemId] = 1;
      } else {
        newCart[itemId] += 1;
      }
      return newCart;
    });
  };

  // Remove item from the cart
  const removeFromCart = (itemId) => {
    setCartItems((prev) => {
      const newCart = { ...prev };
      if (newCart[itemId] > 1) {
        newCart[itemId] -= 1;
      } else {
        delete newCart[itemId];
      }
      return newCart;
    });
  };

  // Logout function
  const logout = () => {
    localStorage.removeItem("token");
    setToken(null);
  };

  // Login function (for demonstration purposes)
  const login = (userToken) => {
    setToken(userToken);
    localStorage.setItem("token", userToken);
  };

  // Context value to pass to components
  const contextValue = {
    food_list,
    search,
    setSearch,
    showSearch,
    setShowSearch,
    cartItems,
    setCartItems,
    addToCart,
    removeFromCart,
    getTotalCartAmount,
    token,
    setToken,
    login,
    logout,
    placeOrder,  // New method for placing orders
    orders,      // New state for orders
  };

  return (
    <StoreContext.Provider value={contextValue}>
      {props.children}

      {/* Show success message popup */}
      {showSuccessMessage && (
        <div className="success-message">
          <p> Your order has been successfully placed !</p>
        </div>
      )}
    </StoreContext.Provider>
  );
};

export default StoreContextProvider;
