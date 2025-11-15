import React, { useContext } from "react";
import { StoreContext } from "../../Context/StoreContext";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const {
    cartItems,
    food_list,
    removeFromCart,
    getTotalCartAmount,
    url,
    currency,
    deliveryCharge,
  } = useContext(StoreContext);
  const navigate = useNavigate();

  return (
    <div className="my-16 mx-auto px-4 md:px-10 lg:px-20 w-full max-w-6xl">
      {/* Cart Items Section */}
      <div className="overflow-x-auto">
        <div className="hidden md:grid grid-cols-[1fr_1.5fr_1fr_1fr_1fr_0.5fr] items-center text-gray-500 text-sm font-medium border-b border-gray-200 pb-2">
          <p>Items</p>
          <p>Title</p>
          <p>Price</p>
          <p>Quantity</p>
          <p>Total</p>
          <p>Remove</p>
        </div>

        {/* Cart Items */}
        <div className="mt-4">
          {food_list.map((item, index) => {
            if (cartItems[item._id] > 0) {
              return (
                <div key={index} className="border-b border-gray-200 py-3">
                  {/* Desktop layout */}
                  <div className="hidden md:grid grid-cols-[1fr_1.5fr_1fr_1fr_1fr_0.5fr] items-center text-black gap-2">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-12 h-12 object-cover rounded"
                    />
                    <p className="truncate">{item.name}</p>
                    <p>
                      {currency}
                      {item.price}
                    </p>
                    <div className="max-w-[40px] text-center border border-gray-200 px-2 py-1 text-xs">
                      {cartItems[item._id]}
                    </div>
                    <p>
                      {currency}
                      {item.price * cartItems[item._id]}
                    </p>
                    <p
                      onClick={() => removeFromCart(item._id)}
                      className="cursor-pointer text-red-500 font-semibold"
                    >
                      ×
                    </p>
                  </div>

                  {/* Mobile layout */}
                  <div className="md:hidden flex flex-col gap-2 text-sm text-gray-700">
                    <div className="flex items-center gap-3">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-16 h-16 object-cover rounded"
                      />
                      <div className="flex flex-col">
                        <p className="font-semibold">{item.name}</p>
                        <p className="text-gray-500">
                          {currency}
                          {item.price}
                        </p>
                      </div>
                    </div>
                    <div className="flex justify-between items-center mt-1">
                      <p>
                        Qty:{" "}
                        <span className="border border-gray-300 px-2 py-1 text-xs">
                          {cartItems[item._id]}
                        </span>
                      </p>
                      <p>
                        Total:{" "}
                        <span className="font-semibold">
                          {currency}
                          {item.price * cartItems[item._id]}
                        </span>
                      </p>
                      <button
                        onClick={() => removeFromCart(item._id)}
                        className="text-red-500 font-bold text-lg"
                      >
                        ×
                      </button>
                    </div>
                  </div>
                </div>
              );
            }
            return null;
          })}
        </div>
      </div>

      {/* Cart Bottom Section */}
      <div className="mt-16 flex flex-col md:flex-row justify-between gap-10">
        {/* Cart Total */}
        <div className="flex flex-col gap-5 flex-1 border border-gray-200 rounded-lg p-5 shadow-sm">
          <h2 className="text-xl font-semibold">Cart Totals</h2>
          <div className="space-y-2 text-[#555]">
            <div className="flex justify-between">
              <p>Subtotal</p>
              <p>
                {currency}
                {getTotalCartAmount()}
              </p>
            </div>
            <div className="flex justify-between">
              <p>Delivery Fee</p>
              <p>
                {currency}
                {getTotalCartAmount() === 0 ? 0 : deliveryCharge}
              </p>
            </div>
            <hr />
            <div className="flex justify-between font-semibold text-gray-800">
              <p>Total</p>
              <p>
                {currency}
                {getTotalCartAmount() === 0
                  ? 0
                  : getTotalCartAmount() + deliveryCharge}
              </p>
            </div>
          </div>
          <button
            onClick={() => navigate("/order")}
            className="bg-[#FF4C24] hover:bg-[#ff3c0f] text-white py-3 rounded-md font-medium transition-all"
          >
            PROCEED TO CHECKOUT
          </button>
        </div>

        {/* Promo Code Section */}
        <div className="flex-1 border border-gray-200 rounded-lg p-5 shadow-sm">
          <p className="text-[#555] font-medium">
            If you have a promo code, Enter it here
          </p>
          <div className="flex mt-3 bg-[#eaeaea] rounded-md overflow-hidden">
            <input
              type="text"
              placeholder="Promo code"
              className="flex-1 bg-transparent border-none outline-none pl-3 text-sm py-2"
            />
            <button className="w-[max(30%,120px)] py-2 bg-black text-white text-sm font-medium">
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
