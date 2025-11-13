import React, { useContext, useState } from "react";
import { assets } from "../../assets/assets";
import { Link, useNavigate } from "react-router-dom";
import { StoreContext } from "../../Context/StoreContext";

const Navbar = ({ setShowLogin }) => {
  const [menu, setMenu] = useState("home");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { getTotalCartAmount, token, setToken } = useContext(StoreContext);
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    setToken("");
    navigate("/");
  };

  const handleMenuClick = (menuItem) => {
    setMenu(menuItem);
    setMobileMenuOpen(false);
  };

  return (
    <nav className="w-full bg-white shadow-sm sticky top-0 z-50">
      <div className="flex justify-between items-center px-5 md:px-10 py-4">
        {/* Logo */}
        <Link to="/" className="text-xl font-bold text-[#FF4C24]">
          Shri<span className="text-gray-700">G</span>
        </Link>

        {/* Hamburger Icon (Mobile) */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden focus:outline-none"
        >
          <svg
            className="w-7 h-7 text-gray-700"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            {mobileMenuOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>

        {/* Desktop Menu */}
        <ul className="hidden md:flex list-none gap-7 text-[#49557E] text-[17px] font-medium">
          <Link
            to="/"
            onClick={() => handleMenuClick("home")}
            className={`capitalize ${
              menu === "home" ? "border-b-2 border-[#FF4C24]" : ""
            }`}
          >
            home
          </Link>
          <a
            href="#explore-menu"
            onClick={() => handleMenuClick("menu")}
            className={`capitalize ${
              menu === "menu" ? "border-b-2 border-[#FF4C24]" : ""
            }`}
          >
            menu
          </a>
          <a
            href="#app-download"
            onClick={() => handleMenuClick("mob-app")}
            className={`capitalize ${
              menu === "mob-app" ? "border-b-2 border-[#FF4C24]" : ""
            }`}
          >
            mobile app
          </a>
          <a
            href="#footer"
            onClick={() => handleMenuClick("contact")}
            className={`capitalize ${
              menu === "contact" ? "border-b-2 border-[#FF4C24]" : ""
            }`}
          >
            contact us
          </a>
        </ul>

        {/* Right Section (Desktop) */}
        <div className="hidden md:flex items-center gap-6">
          <img
            src={assets.search_icon}
            alt="search"
            className="w-6 cursor-pointer"
          />

          <Link to="/cart" className="relative">
            <img
              src={assets.basket_icon}
              alt="cart"
              className="w-6 cursor-pointer"
            />
            {getTotalCartAmount() > 0 && (
              <div className="absolute top-[-6px] right-[-6px] min-w-[10px] min-h-[10px] bg-[#FF4C24] rounded-full"></div>
            )}
          </Link>

          {!token ? (
            <button
              onClick={() => setShowLogin(true)}
              className="bg-transparent text-[#49557E] border border-[#FF4C24] px-6 py-2 rounded-full text-base transition duration-300 hover:bg-[#fff4f2]"
            >
              Sign in
            </button>
          ) : (
            <div className="relative group">
              <img
                src={assets.profile_icon}
                alt="profile"
                className="w-8 cursor-pointer"
              />
              <ul className="absolute hidden group-hover:flex flex-col gap-2 bg-[#fff2ef] right-0 mt-2 p-3 rounded-md border border-[tomato] list-none z-10">
                <li
                  onClick={() => navigate("/myorders")}
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

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 shadow-sm flex flex-col items-start px-6 py-4 gap-4 text-[#49557E] font-medium">
          {/* Nav Links */}
          <Link
            to="/"
            onClick={() => handleMenuClick("home")}
            className={`capitalize ${
              menu === "home" ? "text-[#FF4C24] font-semibold" : ""
            }`}
          >
            home
          </Link>
          <a
            href="#explore-menu"
            onClick={() => handleMenuClick("menu")}
            className={`capitalize ${
              menu === "menu" ? "text-[#FF4C24] font-semibold" : ""
            }`}
          >
            menu
          </a>
          <a
            href="#app-download"
            onClick={() => handleMenuClick("mob-app")}
            className={`capitalize ${
              menu === "mob-app" ? "text-[#FF4C24] font-semibold" : ""
            }`}
          >
            mobile app
          </a>
          <a
            href="#footer"
            onClick={() => handleMenuClick("contact")}
            className={`capitalize ${
              menu === "contact" ? "text-[#FF4C24] font-semibold" : ""
            }`}
          >
            contact us
          </a>

          {/* Divider */}
          <hr className="w-full border-gray-200 my-2" />

          {/* Icons (Mobile) */}
          <div className="flex items-center gap-45">
            <img
              src={assets.search_icon}
              alt="search"
              className="w-6 cursor-pointer"
            />

            <Link to="/cart" className="relative">
              <img
                src={assets.basket_icon}
                alt="cart"
                className="w-6 cursor-pointer"
              />
              {getTotalCartAmount() > 0 && (
                <div className="absolute top-[-6px] right-[-6px] min-w-[10px] min-h-[10px] bg-[#FF4C24] rounded-full"></div>
              )}
            </Link>

            {token ? (
              <img
                src={assets.profile_icon}
                alt="profile"
                className="w-8 cursor-pointer"
                onClick={() => {
                  navigate("/myorders");
                  setMobileMenuOpen(false);
                }}
              />
            ) : (
              <button
                onClick={() => {
                  setShowLogin(true);
                  setMobileMenuOpen(false);
                }}
                className="bg-[#FF4C24] text-white px-4 py-2 rounded-full text-sm font-medium hover:bg-[#e23b1a]"
              >
                Sign in
              </button>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
