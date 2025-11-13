import React from "react";
import { assets } from "../../assets/assets";

const Footer = () => {
  return (
    <div
      id="footer"
      className="flex flex-col items-center gap-5 px-[8vw] py-5 pt-20 bg-[#323232] text-[#D9D9D9]"
    >
      {/* --- Footer Content --- */}
      <div
        className="w-full grid grid-cols-[2fr_1fr_1fr] gap-[80px] 
        max-[750px]:flex max-[750px]:flex-col max-[750px]:gap-[35px]"
      >
        {/* Left Section */}
        <div className="flex flex-col items-start gap-5">
          <p className="leading-relaxed">
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            and scrambled it to make a type specimen book.
          </p>
          <div className="flex gap-[15px]">
            <img src={assets.facebook_icon} alt="Facebook" className="w-10" />
            <img src={assets.twitter_icon} alt="Twitter" className="w-10" />
            <img src={assets.linkedin_icon} alt="LinkedIn" className="w-10" />
          </div>
        </div>

        {/* Center Section */}
        <div className="flex flex-col items-start gap-5">
          <h2 className="text-white font-semibold">COMPANY</h2>
          <ul className="space-y-2">
            <li className="cursor-pointer hover:text-white">Home</li>
            <li className="cursor-pointer hover:text-white">About us</li>
            <li className="cursor-pointer hover:text-white">Delivery</li>
            <li className="cursor-pointer hover:text-white">Privacy policy</li>
          </ul>
        </div>

        {/* Right Section */}
        <div className="flex flex-col items-start gap-5">
          <h2 className="text-white font-semibold">GET IN TOUCH</h2>
          <ul className="space-y-2">
            <li className="cursor-pointer hover:text-white">+7428027803</li>
            <li className="cursor-pointer hover:text-white">
              shrigbikanersweetshop@gmail.com
            </li>
          </ul>
        </div>
      </div>

      {/* Divider */}
      <hr className="w-full h-[2px] my-5 border-none bg-[#555]" />

      {/* Copyright */}
      <p className="text-center text-sm">
        Copyright 2024 © SHRIGBIKANER.com - All Rights Reserved.
      </p>
    </div>
  );
};

export default Footer;
