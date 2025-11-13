import React, { useContext } from 'react';
import { StoreContext } from '../../Context/StoreContext';

const ExploreMenu = ({ category, setCategory }) => {
  const { menu_list } = useContext(StoreContext);

  return (
    <div
      id="explore-menu"
      className="flex flex-col gap-5
      mx-45"
    >
      {/* Title */}
      <h1 className="text-[#262626] font-medium text-2xl md:text-3xl">
        Explore our menu
      </h1>

      {/* Subtitle */}
      <p className="text-[#808080] max-w-[60%] md:max-w-[60%] text-base max-[1050px]:max-w-full max-[1050px]:text-sm">
        Choose from a diverse menu featuring a delectable array of dishes. Our mission
        is to satisfy your cravings and elevate your dining experience, one delicious
        meal at a time.
      </p>

      {/* Menu Scroll List */}
      <div
        className="flex justify-between items-center gap-[30px] text-center my-[20px] overflow-x-scroll scrollbar-hide"
      >
        {menu_list.map((item, index) => (
          <div
            key={index}
            onClick={() =>
              setCategory((prev) => (prev === item.menu_name ? 'All' : item.menu_name))
            }
            className="flex flex-col items-center justify-center cursor-pointer"
          >
            <img
              src={item.menu_image}
              alt={item.menu_name}
              className={`w-[7.5vw] min-w-[80px] rounded-full transition duration-200 cursor-pointer ${
                category === item.menu_name
                  ? 'border-[4px] border-[tomato] p-[2px]'
                  : ''
              }`}
            />
            <p className="mt-[10px] text-[#747474] text-[max(1.4vw,16px)] cursor-pointer">
              {item.menu_name}
            </p>
          </div>
        ))}
      </div>

      {/* Divider */}
      <hr className="my-[10px] h-[2px] bg-[#E2E2E2] border-none" />
    </div>
  );
};

export default ExploreMenu;
