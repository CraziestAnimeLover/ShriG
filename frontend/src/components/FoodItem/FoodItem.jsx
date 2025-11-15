import React, { useContext } from 'react';
import { assets } from '../../assets/assets';
import { StoreContext } from '../../Context/StoreContext';

const FoodItem = ({ image, name, price, desc, id }) => {
  const { cartItems, addToCart, removeFromCart, url, currency } =
    useContext(StoreContext);

  if (!id) return null; // <-- prevents undefined id crash

  return (
    <div className="w-full mx-auto rounded-[15px] shadow-[0_0_10px_rgba(0,0,0,0.09)] transition-transform duration-300 animate-fadeIn hover:scale-[1.02]">
      
      <div className="relative">
        <img
          className="w-full rounded-t-[15px]"
          src={image}
          alt={name}
        />

        {!cartItems?.[id] ? (
          <img
            src={assets.add_icon_white}
            alt="Add"
            onClick={() => addToCart(id)}
            className="w-[35px] absolute bottom-[15px] right-[15px] cursor-pointer rounded-full hover:border-2 hover:border-[#FF4C24]"
          />
        ) : (
          <div className="absolute bottom-[15px] right-[15px] flex items-center gap-[10px] p-[6px] rounded-full bg-white">
            <img
              src={assets.remove_icon_red}
              alt="Remove"
              onClick={() => removeFromCart(id)}
              className="w-[30px] cursor-pointer"
            />
            <p className="font-medium text-gray-800">{cartItems?.[id] ?? 0}</p>
            <img
              src={assets.add_icon_green}
              alt="Add"
              onClick={() => addToCart(id)}
              className="w-[30px] cursor-pointer"
            />
          </div>
        )}
      </div>

      <div className="p-5">
        <div className="flex justify-between items-center mb-[10px]">
          <p className="text-[20px] font-medium">{name}</p>
          <img src={assets.rating_starts} alt="Rating" className="w-[70px]" />
        </div>

        <p className="text-[#676767] text-[12px]">{desc}</p>

        <p className="text-[#FF4C24] text-[22px] font-medium my-[10px]">
          {currency}
          {price}
        </p>
      </div>
    </div>
  );
};


export default FoodItem;
