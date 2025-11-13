import React, { useContext, useState } from 'react';
import { assets } from '../../assets/assets';
import { StoreContext } from '../../Context/StoreContext';
import axios from 'axios';
import { toast } from 'react-toastify';

const LoginPopup = ({ setShowLogin }) => {
  const { setToken, url, loadCartData } = useContext(StoreContext);
  const [currState, setCurrState] = useState("Sign Up");

  const [data, setData] = useState({
    name: "",
    email: "",
    password: ""
  });

  // Handle input changes
  const onChangeHandler = (event) => {
    const { name, value } = event.target;
    setData(prev => ({ ...prev, [name]: value }));
  };

  // Helper to call backend
  const postUser = async (endpoint, payload) => {
    try {
      const response = await axios.post(`${url}/api/user/${endpoint}`, payload, {
        withCredentials: true,
        headers: { "Content-Type": "application/json" },
      });
      return response.data;
    } catch (error) {
      console.error("Network or server error:", error);
      return { success: false, message: "Network/Server error. Try again later." };
    }
  };

  // Handle form submit
  const onLogin = async (e) => {
    e.preventDefault();

    if (!data.email || !data.password || (currState === "Sign Up" && !data.name)) {
      toast.error("Please fill all required fields");
      return;
    }

    const endpoint = currState === "Login" ? "login" : "register";
    const payload =
      currState === "Login"
        ? { email: data.email, password: data.password }
        : { name: data.name, email: data.email, password: data.password };

    const result = await postUser(endpoint, payload);

    if (result.success) {
      setToken(result.token);
      localStorage.setItem("token", result.token);
      loadCartData({ token: result.token });
      toast.success(currState === "Login" ? "Login successful!" : "Account created!");
      setShowLogin(false);
    } else {
      toast.error(result.message);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 grid place-items-center animate-fadeIn">
      <form
        onSubmit={onLogin}
        className="bg-white text-[#808080] w-[min(90%,400px)] sm:w-[max(23vw,330px)] flex flex-col gap-6 p-6 rounded-lg text-sm shadow-lg"
      >
        {/* Title */}
        <div className="flex justify-between items-center text-black">
          <h2 className="text-xl font-semibold">{currState}</h2>
          <img
            onClick={() => setShowLogin(false)}
            src={assets.cross_icon}
            alt="Close"
            className="w-4 cursor-pointer hover:opacity-70"
          />
        </div>

        {/* Inputs */}
        <div className="flex flex-col gap-5">
          {currState === "Sign Up" && (
            <input
              name="name"
              onChange={onChangeHandler}
              value={data.name}
              type="text"
              placeholder="Your name"
              required
              className="border border-[#C9C9C9] rounded-md px-3 py-2 outline-none focus:border-[#FF4C24]"
            />
          )}
          <input
            name="email"
            onChange={onChangeHandler}
            value={data.email}
            type="email"
            placeholder="Your email"
            required
            className="border border-[#C9C9C9] rounded-md px-3 py-2 outline-none focus:border-[#FF4C24]"
          />
          <input
            name="password"
            onChange={onChangeHandler}
            value={data.password}
            type="password"
            placeholder="Password"
            required
            className="border border-[#C9C9C9] rounded-md px-3 py-2 outline-none focus:border-[#FF4C24]"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="bg-[#FF4C24] text-white py-2.5 rounded-md text-base font-medium cursor-pointer hover:bg-[#ff6542] transition"
        >
          {currState === "Login" ? "Login" : "Create account"}
        </button>

        {/* Terms */}
        <div className="flex items-start gap-2 -mt-3">
          <input type="checkbox" required className="mt-[5px]" />
          <p className="text-xs">
            By continuing, I agree to the terms of use & privacy policy.
          </p>
        </div>

        {/* Switch Between Login/Signup */}
        <p className="text-center text-sm">
          {currState === "Login" ? (
            <>
              Create a new account?{" "}
              <span
                onClick={() => setCurrState("Sign Up")}
                className="text-[#FF4C24] font-medium cursor-pointer hover:underline"
              >
                Click here
              </span>
            </>
          ) : (
            <>
              Already have an account?{" "}
              <span
                onClick={() => setCurrState("Login")}
                className="text-[#FF4C24] font-medium cursor-pointer hover:underline"
              >
                Login here
              </span>
            </>
          )}
        </p>
      </form>
    </div>
  );
};

export default LoginPopup;
