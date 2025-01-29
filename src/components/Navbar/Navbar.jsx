import React, { useContext, useState } from 'react';
import './Navbar.css';
import { assets } from '../../assets/assets';
import { Link, useNavigate } from 'react-router-dom';
import { StoreContext } from '../../context/StoreContext';

const Navbar = ({ setShowLogin }) => {
    const [menu, setMenu] = useState("home");
    const [popupMessage, setPopupMessage] = useState(""); // State to manage the popup message
    const { setShowSearch,  token, setToken, cartItems } = useContext(StoreContext);
    const navigate = useNavigate();

    // Logout function with popup message
    const logout = () => {
        localStorage.removeItem("token");
        setToken(""); // Clear the token from context
        setPopupMessage(" logged out successfully!"); // Set the popup message

        // Hide the popup after 3 seconds
        setTimeout(() => {
            setPopupMessage(""); // Clear the message after 2 seconds
        }, 2000);

        navigate("/"); // Redirect to the homepage
    };

    // Calculate the total number of items in the cart
    const cartItemCount = Object.values(cartItems).reduce((total, quantity) => total + quantity, 0);

    return (
        <div className='navbar'>
            <Link to='/'>
                <img src={assets.logo} alt="Logo" className='logo' />
            </Link>
            <ul className='navbar-menu'>
                <Link to='/' onClick={() => setMenu("home")} className={menu === "home" ? "active" : ""}>Home</Link>
                <a href='#explore-menu' onClick={() => setMenu("menu")} className={menu === "menu" ? "active" : ""}>Menu</a>
                <a href='#app-download' onClick={() => setMenu("mobile-app")} className={menu === "mobile-app" ? "active" : ""}>Mobile App</a>
                <a href='#footer' onClick={() => setMenu("contact us")} className={menu === "contact us" ? "active" : ""}>Contact Us</a>
            </ul>
            <div className="navbar-right">
                {/* Search Icon */}
                <img onClick={() => setShowSearch(true)} src={assets.search_icon} className='w-5 cursor-pointer' alt="Search" />

                {/* Cart Icon */}
                <div className="navbar-search-icon">
                    <Link to='/cart'>
                        <img src={assets.basket_icon} alt="Cart" />
                    </Link>
                    {cartItemCount > 0 && <div className="dot">{cartItemCount}</div>} {/* Show item count in the cart */}
                </div>

                {/* User Profile or Sign In Button */}
                {!token ? (
                    <button onClick={() => setShowLogin(true)}>Sign In</button>
                ) : (
                    <div className='navbar-profile'>
                        <img src={assets.profile_icon} alt="Profile" />
                        <ul className="nav-profile-dropdown">
                            <li>
                                <Link to="/myorders">
                                    <img src={assets.bag_icon} alt="Orders" />
                                    <p>Orders</p>
                                </Link>
                            </li>
                            <hr />
                            <li onClick={logout}>
                                <img src={assets.logout_icon} alt="Logout" />
                                <p>Logout</p>
                            </li>
                        </ul>
                    </div>
                )}
            </div>

            {/* Popup message for logout */}
            {popupMessage && (
                <div className="logout-popup">
                    <p>{popupMessage}</p>
                </div>
            )}
        </div>
    );
};

export default Navbar;
