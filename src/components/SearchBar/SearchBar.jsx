import React, { useContext, useEffect, useState } from 'react'
import { StoreContext } from '../../context/StoreContext'
import { useLocation } from 'react-router-dom';
import { assets } from '../../assets/assets';
import './SearchBar.css'

const SearchBar = () => {

    const { search, setSearch, showSearch, setShowSearch } = useContext(StoreContext);
    const [visible, setVisible] = useState(false)
    const location = useLocation();

    useEffect(() => {
      if (location.pathname.includes('/')) {
        setVisible(true);
      }
      else {
        setVisible(false)
      }
    }, [location])



    return showSearch && visible ? (
      <div className="search-bar">
        <div className="search-container">
          <input 
            value={search} 
            onChange={(e) => setSearch(e.target.value)} 
            className="search-input" 
            type="text" 
            placeholder="Search" 
          />
          <img className="search-icon" src={assets.search_icon} alt="Search Icon" />
        </div>
        <img 
          onClick={() => setShowSearch(false)} 
          className="close-icon" 
          src={assets.cross_icon} 
          alt="Close Icon" 
        />
      </div>
    ) : null
  }

export default SearchBar