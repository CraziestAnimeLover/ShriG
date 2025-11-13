import { createContext, useEffect, useState } from "react";
import { food_list as initialFoodList, menu_list } from "../assets/assets";
import axios from "axios";

export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {
  const url = "https://shri-g-backend.vercel.app"; // ⚡ Backend URL, no trailing slash
  const [food_list, setFoodList] = useState([]);
  const [cartItems, setCartItems] = useState({});
  const [token, setToken] = useState("");
  const currency = "₹";
  const deliveryCharge = 50;

  // Add to cart
  const addToCart = async (itemId) => {
    setCartItems((prev) => ({ ...prev, [itemId]: (prev[itemId] || 0) + 1 }));
    if (token) {
      await axios.post(
        `${url}/api/cart/add`,
        { itemId },
        { headers: { token }, withCredentials: true }
      );
    }
  };

  // Remove from cart
  const removeFromCart = async (itemId) => {
    setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }));
    if (token) {
      await axios.post(
        `${url}/api/cart/remove`,
        { itemId },
        { headers: { token }, withCredentials: true }
      );
    }
  };

  // Total cart amount
  const getTotalCartAmount = () => {
    let total = 0;
    for (const item in cartItems) {
      try {
        if (cartItems[item] > 0) {
          const itemInfo = food_list.find((f) => f._id === item);
          total += itemInfo.price * cartItems[item];
        }
      } catch (err) {}
    }
    return total;
  };

  // Fetch food list
 const fetchFoodList = async () => {
  try {
    const response = await axios.get(`${url}/api/food/list`); // no withCredentials needed
    setFoodList(response.data.data);
  } catch (err) {
    console.error("Failed to fetch food list:", err);
  }
};

  // Load cart from backend
  const loadCartData = async (tokenHeader) => {
    const response = await axios.post(
      `${url}/api/cart/get`,
      {},
      { headers: tokenHeader, withCredentials: true }
    );
    setCartItems(response.data.cartData);
  };

  // Load initial data
  useEffect(() => {
    async function loadData() {
      await fetchFoodList();
      const storedToken = localStorage.getItem("token");
      if (storedToken) {
        setToken(storedToken);
        await loadCartData({ token: storedToken });
      }
    }
    loadData();
  }, []);

  const contextValue = {
    url,
    food_list,
    menu_list,
    cartItems,
    addToCart,
    removeFromCart,
    getTotalCartAmount,
    token,
    setToken,
    loadCartData,
    setCartItems,
    currency,
    deliveryCharge,
  };

  return (
    <StoreContext.Provider value={contextValue}>
      {props.children}
    </StoreContext.Provider>
  );
};

export default StoreContextProvider;
