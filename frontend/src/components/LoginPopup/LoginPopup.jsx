import React, { useContext, useState } from 'react';
import './LoginPopup.css';
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

    // Check required fields
    if (!data.email || !data.password || (currState === "Sign Up" && !data.name)) {
      toast.error("Please fill all required fields");
      return;
    }

    const endpoint = currState === "Login" ? "login" : "register";
    const payload = currState === "Login" ? { email: data.email, password: data.password } 
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
    <div className='login-popup'>
      <form onSubmit={onLogin} className="login-popup-container">
        <div className="login-popup-title">
          <h2>{currState}</h2>
          <img onClick={() => setShowLogin(false)} src={assets.cross_icon} alt="Close" />
        </div>

        <div className="login-popup-inputs">
          {currState === "Sign Up" && (
            <input
              name='name'
              onChange={onChangeHandler}
              value={data.name}
              type="text"
              placeholder='Your name'
              required
            />
          )}
          <input
            name='email'
            onChange={onChangeHandler}
            value={data.email}
            type="email"
            placeholder='Your email'
            required
          />
          <input
            name='password'
            onChange={onChangeHandler}
            value={data.password}
            type="password"
            placeholder='Password'
            required
          />
        </div>

        <button type="submit">
          {currState === "Login" ? "Login" : "Create account"}
        </button>

        <div className="login-popup-condition">
          <input type="checkbox" required />
          <p>By continuing, I agree to the terms of use & privacy policy.</p>
        </div>

        <p>
          {currState === "Login" ? (
            <>Create a new account? <span onClick={() => setCurrState('Sign Up')}>Click here</span></>
          ) : (
            <>Already have an account? <span onClick={() => setCurrState('Login')}>Login here</span></>
          )}
        </p>
      </form>
    </div>
  );
};

export default LoginPopup;
