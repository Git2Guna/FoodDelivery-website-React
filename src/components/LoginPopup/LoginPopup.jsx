import React, { useState, useContext } from 'react';
import './LoginPopup.css';
import { assets } from '../../assets/assets';
import { StoreContext } from '../../context/StoreContext';
import { ToastContainer, toast } from 'react-toastify';

const LoginPopup = ({ setShowLogin }) => {
  const { setToken } = useContext(StoreContext);

  const [currState, setCurrState] = useState('Login');
  const [data, setData] = useState({
    name: '',
    email: '',
    password: '',
  });

  const onChangeHandler = (event) => {
    const { name, value } = event.target;
    setData((prevData) => ({ ...prevData, [name]: value }));
  };

  const onLogin = (event) => {
    event.preventDefault();

    // Check password length if it's in "Sign Up" state
    if (currState === 'Sign Up' && data.password.length < 5) {
      toast.error('Password must be at least 5 characters long.');
      return;
    }

    if (currState === 'Login') {
      // Simulate checking credentials from localStorage
      const storedUser = JSON.parse(localStorage.getItem('user'));

      if (storedUser?.email === data.email && storedUser?.password === data.password) {
        setToken(storedUser.token);  // Set token
        // Show success toast for login with username
        toast.success(`Welcome, ${storedUser.name}! Login successful!`);

        // Use setTimeout to close the popup after the toast
        setTimeout(() => {
          setShowLogin(false);  // Close popup after 3 seconds
        }, 3000);
      } else {
        toast.error('Invalid credentials. Please check your email and password.');
      }
    } else {
      // Simulate user registration
      const userData = { ...data, token: 'newToken' }; // Simulate token generation
      localStorage.setItem('user', JSON.stringify(userData));
      setCurrState('Login');  // Switch to login state after account creation
      toast.success('Account created successfully! Please log in.');  // Success toast
    }
  };

  return (
    <div className="login-popup">
      <form onSubmit={onLogin} className="login-popup-container">
        <div className="login-popup-title">
          <h2>{currState}</h2>
          <img onClick={() => setShowLogin(false)} src={assets.cross_icon} alt="Close" />
        </div>
        <div className="login-popup-inputs">
          {currState === 'Sign Up' && (
            <input
              name="name"
              onChange={onChangeHandler}
              value={data.name}
              type="text"
              placeholder="Your name"
              required
            />
          )}
          <input
            name="email"
            onChange={onChangeHandler}
            value={data.email}
            type="email"
            placeholder="Your email"
            required
          />
          <input
            name="password"
            onChange={onChangeHandler}
            value={data.password}
            type="password"
            placeholder="Password"
            minLength={5}  // Minimum length for password
            required
          />
        </div>
        <button type="submit">{currState === 'Sign Up' ? 'Create account' : 'Login'}</button>
        <div className="login-popup-condition">
          <input type="checkbox" required />
          <p>By continuing, I agree to the terms of use & privacy policy.</p>
        </div>
        {currState === 'Login' ? (
          <p>
            Don't have an account? <span onClick={() => setCurrState('Sign Up')}>Create one</span>
          </p>
        ) : (
          <p>
            Already have an account? <span onClick={() => setCurrState('Login')}>Login here</span>
          </p>
        )}
      </form>

      {/* ToastContainer to display toast notifications */}
      <ToastContainer position="top-center" autoClose={3000} />
    </div>
  );
};

export default LoginPopup;
