import React, { useContext } from 'react';
import FoodItem from '../FoodItem/FoodItem';
import { StoreContext } from '../../Context/StoreContext';

const FoodDisplay = ({ category }) => {
  const { food_list } = useContext(StoreContext);

  if (!food_list || food_list.length === 0) {
    return <p className="text-center text-gray-600 mt-10">Loading food items...</p>;
  }

  // Filter items
  const filteredItems = food_list.filter(
    (item) => category === 'All' || category === item.category
  );

  return (
    <div className="mt-[30px] mx-45" id="food-display "   >
      <h2 className="text-[max(2vw,24px)] font-semibold">Top dishes near you</h2>

      <div
        className="grid grid-cols-[repeat(auto-fill,minmax(240px,1fr))] gap-x-[30px] gap-y-[50px] mt-[30px]"
      >
        {filteredItems.map((item) => (
          <FoodItem
            key={item._id}
            image={item.image}
            name={item.name}
            desc={item.description}
            price={item.price}
            id={item._id}
          />
        ))}
      </div>
    </div>
  );
};

export default FoodDisplay;
