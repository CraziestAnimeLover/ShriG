import React from "react";
import { assets } from "../../assets/assets";

const AppDownload = () => {
  return (
    <div
      id="app-download"
      className="my-[100px] text-center font-medium text-[max(3vw,20px)]"
    >
      <p>
        For Better Experience Download <br /> Tomato App
      </p>

      <div className="flex justify-center gap-[max(2vw,10px)] mt-[40px]">
        <img
          src={assets.play_store}
          alt="Play Store"
          className="w-[max(30vw,120px)] max-w-[180px] cursor-pointer transition-transform duration-500 hover:scale-105"
        />
        <img
          src={assets.app_store}
          alt="App Store"
          className="w-[max(30vw,120px)] max-w-[180px] cursor-pointer transition-transform duration-500 hover:scale-105"
        />
      </div>
    </div>
  );
};

export default AppDownload;
