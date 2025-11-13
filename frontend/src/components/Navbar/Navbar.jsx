import React, { useContext, useState } from 'react'
import { assets } from '../../assets/assets'
import { Link, useNavigate } from 'react-router-dom'
import { StoreContext } from '../../Context/StoreContext'

const Navbar = ({ setShowLogin }) => {
  const [menu, setMenu] = useState("home");
  const { getTotalCartAmount, token, setToken } = useContext(StoreContext);
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    setToken("");
    navigate('/');
  };

  return (
    <div className="flex justify-between items-center mx-5 py-5 px-15">
      {/* Left Menu */}
      <ul className="hidden md:flex list-none gap-5 text-[#49557E] text-lg font-medium">
        <Link
          to="/"
          onClick={() => setMenu("home")}
          className={`capitalize ${menu === "home" ? "border-b-2 border-[#49557E] pb-[2px]" : ""}`}
        >
          home
        </Link>
        <a
          href="#explore-menu"
          onClick={() => setMenu("menu")}
          className={`capitalize ${menu === "menu" ? "border-b-2 border-[#49557E] pb-[2px]" : ""}`}
        >
          menu
        </a>
        <a
          href="#app-download"
          onClick={() => setMenu("mob-app")}
          className={`capitalize ${menu === "mob-app" ? "border-b-2 border-[#49557E] pb-[2px]" : ""}`}
        >
          mobile app
        </a>
        <a
          href="#footer"
          onClick={() => setMenu("contact")}
          className={`capitalize ${menu === "contact" ? "border-b-2 border-[#49557E] pb-[2px]" : ""}`}
        >
          contact us
        </a>
      </ul>

      {/* Right Section */}
      <div className="flex items-center gap-10">
        <img src={assets.search_icon} alt="search" className="w-6 cursor-pointer" />

        <Link to="/cart" className="relative">
          <img src={assets.basket_icon} alt="cart" className="w-6 cursor-pointer" />
          {getTotalCartAmount() > 0 && (
            <div className="absolute top-[-8px] right-[-8px] min-w-[10px] min-h-[10px] bg-[#FF4C24] rounded-full"></div>
          )}
        </Link>

        {!token ? (
          <button
            onClick={() => setShowLogin(true)}
            className="bg-transparent text-[#49557E] border border-[#FF4C24] px-7 py-2.5 rounded-full text-base cursor-pointer transition duration-300 hover:bg-[#fff4f2]"
          >
            sign in
          </button>
        ) : (
          <div className="relative group">
            <img src={assets.profile_icon} alt="profile" className="w-8 cursor-pointer" />
            <ul className="absolute hidden group-hover:flex flex-col gap-2 bg-[#fff2ef] right-0 mt-2 p-3 rounded-md border border-[tomato] outline outline-2 outline-white list-none z-10">
              <li
                onClick={() => navigate('/myorders')}
                className="flex items-center gap-2 cursor-pointer hover:text-[#FF4C24]"
              >
                <img src={assets.bag_icon} alt="orders" className="w-5" />
                <p>Orders</p>
              </li>
              <hr className="border-gray-300" />
              <li
                onClick={logout}
                className="flex items-center gap-2 cursor-pointer hover:text-[#FF4C24]"
              >
                <img src={assets.logout_icon} alt="logout" className="w-5" />
                <p>Logout</p>
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
