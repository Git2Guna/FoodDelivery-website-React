import React, { useContext, useEffect, useState } from 'react';
import './FoodDisplay.css';
import { StoreContext } from '../../context/StoreContext';
import FoodItem from '../FoodItem/FoodItem';

const FoodDisplay = ({ category }) => {
  const { food_list, search, showSearch } = useContext(StoreContext);

  // State to hold the filtered list
  const [filteredFood, setFilteredFood] = useState([]);

  // Apply filter based on search and showSearch
  const applyFilter = () => {
    let food_listCopy = food_list.slice();

    // Apply search filter if enabled
    if (showSearch && search) {
      food_listCopy = food_listCopy.filter(item => 
        item.name.toLowerCase().includes(search.toLowerCase())
      );
    }

    // Update filtered list state
    setFilteredFood(food_listCopy);
  };

  // Run the filter logic on mount or when food_list, search or showSearch change
  useEffect(() => {
    applyFilter();
  }, [food_list, search, showSearch]);

  return (
    <div className="food-display" id="food-display">
      <h2>Top dishes near you</h2>
      <div className="food-display-list">
        {filteredFood.map((item, index) => {
          // Only display items matching the category
          if (category === "All" || category === item.category) {
            return <FoodItem key={index} id={item._id} name={item.name} description={item.description} price={item.price} image={item.image} />;
          }
          return null;
        })}
      </div>
    </div>
  );
};

export default FoodDisplay;
