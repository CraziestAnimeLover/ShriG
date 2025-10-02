import React from "react";

const Header = () => {
  return (
    <div
      className="h-[34vw] my-[30px] bg-[url('/header_img.png')] bg-no-repeat bg-contain relative
      max-[1050px]:h-[38vw]"
    >
      <div
        className="absolute flex flex-col items-start gap-[1.5vw] max-w-[50%] bottom-[10%] left-[6vw] animate-fadeIn
        max-[1050px]:max-w-[45%] max-[750px]:max-w-[55%]"
      >
        <h2 className="font-medium text-white text-[max(4.5vw,22px)]">
          Order your favourite food here
        </h2>

        <p className="text-white text-[1vw] max-[750px]:hidden">
          Choose from a diverse menu featuring a delectable array of dishes
          crafted with the finest ingredients and culinary expertise. Our
          mission is to satisfy your cravings and elevate your dining
          experience, one delicious meal at a time.
        </p>

        <button
          className="border-none text-[#747474] font-medium px-[2.3vw] py-[1vw] 
          bg-white text-[max(1vw,13px)] rounded-full max-[750px]:px-[4vw] max-[750px]:py-[2vw]"
        >
          View Menu
        </button>
      </div>
    </div>
  );
};

export default Header;
