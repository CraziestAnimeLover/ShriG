import React, { useContext, useEffect, useState } from "react";
import { StoreContext } from "../../Context/StoreContext";
import { assets } from "../../assets/assets";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";

const PlaceOrder = () => {
  const [payment, setPayment] = useState("cod");
  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipcode: "",
    country: "",
    phone: "",
  });

  const {
    getTotalCartAmount,
    token,
    food_list,
    cartItems,
    url,
    setCartItems,
    currency,
    deliveryCharge,
  } = useContext(StoreContext);

  const navigate = useNavigate();

  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  const placeOrder = async (e) => {
    e.preventDefault();
    let orderItems = [];
    food_list.forEach((item) => {
      if (cartItems[item._id] > 0) {
        orderItems.push({ ...item, quantity: cartItems[item._id] });
      }
    });

    const orderData = {
      address: data,
      items: orderItems,
      amount: getTotalCartAmount() + deliveryCharge,
    };

    try {
      if (payment === "stripe") {
        const res = await axios.post(`${url}/api/order/place`, orderData, {
          headers: { token },
        });
        if (res.data.success) {
          window.location.replace(res.data.session_url);
        } else toast.error("Something went wrong");
      } else {
        const res = await axios.post(`${url}/api/order/placecod`, orderData, {
          headers: { token },
        });
        if (res.data.success) {
          toast.success(res.data.message);
          navigate("/myorders");
          setCartItems({});
        } else toast.error("Something went wrong");
      }
    } catch (err) {
      toast.error("Error placing order");
    }
  };

  useEffect(() => {
    if (!token) {
      toast.error("Please sign in to place an order");
      navigate("/cart");
    } else if (getTotalCartAmount() === 0) {
      navigate("/cart");
    }
  }, [token]);

  return (
    <form
      onSubmit={placeOrder}
      className="flex flex-col lg:flex-row justify-between gap-10 my-10 px-5 md:px-10 lg:px-20"
    >
      {/* LEFT SECTION */}
      <div className="w-full lg:max-w-[500px]">
        <p className="text-2xl font-semibold mb-6 text-gray-800">
          Delivery Information
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <input
            type="text"
            name="firstName"
            onChange={onChangeHandler}
            value={data.firstName}
            placeholder="First name"
            required
            className="border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-tomato-500"
          />
          <input
            type="text"
            name="lastName"
            onChange={onChangeHandler}
            value={data.lastName}
            placeholder="Last name"
            required
            className="border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-tomato-500"
          />
        </div>

        <input
          type="email"
          name="email"
          onChange={onChangeHandler}
          value={data.email}
          placeholder="Email address"
          required
          className="w-full mt-4 border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-tomato-500"
        />
        <input
          type="text"
          name="street"
          onChange={onChangeHandler}
          value={data.street}
          placeholder="Street"
          required
          className="w-full mt-4 border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-tomato-500"
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
          <input
            type="text"
            name="city"
            onChange={onChangeHandler}
            value={data.city}
            placeholder="City"
            required
            className="border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-tomato-500"
          />
          <input
            type="text"
            name="state"
            onChange={onChangeHandler}
            value={data.state}
            placeholder="State"
            required
            className="border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-tomato-500"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
          <input
            type="text"
            name="zipcode"
            onChange={onChangeHandler}
            value={data.zipcode}
            placeholder="Zip code"
            required
            className="border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-tomato-500"
          />
          <input
            type="text"
            name="country"
            onChange={onChangeHandler}
            value={data.country}
            placeholder="Country"
            required
            className="border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-tomato-500"
          />
        </div>

        <input
          type="text"
          name="phone"
          onChange={onChangeHandler}
          value={data.phone}
          placeholder="Phone"
          required
          className="w-full mt-4 border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-tomato-500"
        />
      </div>

      {/* RIGHT SECTION */}
      <div className="w-full lg:max-w-[500px] flex flex-col gap-8">
        {/* Cart Total */}
        <div className="border border-gray-200 rounded-lg p-5 shadow-sm bg-white">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Cart Totals
          </h2>
          <div className="space-y-3 text-gray-700">
            <div className="flex justify-between">
              <p>Subtotal</p>
              <p>
                {currency}
                {getTotalCartAmount()}
              </p>
            </div>
            <hr />
            <div className="flex justify-between">
              <p>Delivery Fee</p>
              <p>
                {currency}
                {getTotalCartAmount() === 0 ? 0 : deliveryCharge}
              </p>
            </div>
            <hr />
            <div className="flex justify-between font-semibold text-gray-900">
              <p>Total</p>
              <p>
                {currency}
                {getTotalCartAmount() === 0
                  ? 0
                  : getTotalCartAmount() + deliveryCharge}
              </p>
            </div>
          </div>
        </div>

        {/* Payment Options */}
        <div className="border border-gray-200 rounded-lg p-5 shadow-sm bg-white">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Payment Method
          </h2>

          <div
            onClick={() => setPayment("cod")}
            className={`flex items-center gap-3 p-3 rounded-md cursor-pointer border ${
              payment === "cod"
                ? "border-tomato-500 bg-[#fff3f0]"
                : "border-gray-300"
            } hover:bg-[#ffe7de] transition`}
          >
            <img
              src={payment === "cod" ? assets.checked : assets.un_checked}
              alt="COD"
              className="w-5 h-5"
            />
            <p>Cash on Delivery (COD)</p>
          </div>

          <div
            onClick={() => setPayment("stripe")}
            className={`flex items-center gap-3 p-3 rounded-md cursor-pointer border mt-3 ${
              payment === "stripe"
                ? "border-tomato-500 bg-[#fff3f0]"
                : "border-gray-300"
            } hover:bg-[#ffe7de] transition`}
          >
            <img
              src={payment === "stripe" ? assets.checked : assets.un_checked}
              alt="Stripe"
              className="w-5 h-5"
            />
            <p>Stripe (Credit / Debit Card)</p>
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="bg-tomato-500 hover:bg-tomato-600 text-white font-semibold py-3 rounded-md transition-all mt-3"
        >
          {payment === "cod" ? "Place Order" : "Proceed to Payment"}
        </button>
      </div>
    </form>
  );
};

export default PlaceOrder;
