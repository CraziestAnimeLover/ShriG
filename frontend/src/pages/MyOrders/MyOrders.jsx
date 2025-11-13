import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { StoreContext } from "../../Context/StoreContext";
import { assets } from "../../assets/assets";

const MyOrders = () => {
  const [data, setData] = useState([]);
  const { url, token, currency } = useContext(StoreContext);

  const fetchOrders = async () => {
    try {
      const response = await axios.post(
        `${url}/api/order/userorders`,
        {},
        { headers: { token } }
      );
      setData(response.data.data);
    } catch (err) {
      console.error("Error fetching orders:", err);
    }
  };

  useEffect(() => {
    if (token) fetchOrders();
  }, [token]);

  return (
    <div className="my-12 px-4 md:px-10 lg:px-20 w-full max-w-6xl mx-auto">
      <h2 className="text-2xl md:text-3xl font-semibold text-gray-800 mb-6">
        My Orders
      </h2>

      <div className="flex flex-col gap-5">
        {data.length === 0 ? (
          <p className="text-gray-500 text-center">No orders yet.</p>
        ) : (
          data.map((order, index) => (
            <div
              key={index}
              className="border border-tomato-500 rounded-lg shadow-sm hover:shadow-md transition-all duration-200 p-4 md:p-6 flex flex-col md:grid md:grid-cols-[0.6fr_2fr_1fr_1fr_1.5fr_1fr] items-center gap-3 md:gap-6 text-sm text-gray-700 bg-white"
            >
              {/* Image */}
              <img
                src={assets.parcel_icon}
                alt="parcel"
                className="w-10 h-10 md:w-12 md:h-12 object-contain"
              />

              {/* Items list */}
              <p className="text-center md:text-left text-gray-800">
                {order.items.map((item, i) => (
                  <span key={i}>
                    {item.name} × {item.quantity}
                    {i !== order.items.length - 1 && ", "}
                  </span>
                ))}
              </p>

              {/* Amount */}
              <p className="font-medium text-gray-900">
                {currency}
                {order.amount}.00
              </p>

              {/* Item count */}
              <p className="text-gray-600">Items: {order.items.length}</p>

              {/* Status */}
              <p className="flex items-center gap-2 text-gray-700">
                <span className="text-tomato-500 text-lg">●</span>
                <b className="font-medium capitalize">{order.status}</b>
              </p>

              {/* Track Button */}
              <button
                onClick={fetchOrders}
                className="text-sm md:text-base bg-[#FFE1E1] text-gray-700 py-2 px-3 rounded-md font-medium hover:bg-[#ffcaca] transition-colors w-full md:w-auto"
              >
                Track Order
              </button>

              {/* Mobile condensed view */}
              <div className="flex md:hidden justify-between items-center w-full mt-2 text-xs text-gray-500">
                <span>{currency}{order.amount}.00</span>
                <span>{order.items.length} items</span>
                <span className="capitalize">{order.status}</span>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default MyOrders;
