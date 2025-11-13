import axios from "axios";
import React, { useContext, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { StoreContext } from "../../Context/StoreContext";

const Verify = () => {
  const { url } = useContext(StoreContext);
  const [searchParams] = useSearchParams();
  const success = searchParams.get("success");
  const orderId = searchParams.get("orderId");
  const navigate = useNavigate();

  const verifyPayment = async () => {
    try {
      const response = await axios.post(`${url}/api/order/verify`, {
        success,
        orderId,
      });
      if (response.data.success) navigate("/myorders");
      else navigate("/");
    } catch (error) {
      navigate("/");
    }
  };

  useEffect(() => {
    verifyPayment();
  }, []);

  return (
    <div className="min-h-screen flex justify-center items-center bg-[#fff8f7] px-5">
      <div className="flex flex-col items-center text-center">
        {/* Spinner */}
        <div
          className="w-[clamp(60px,15vw,100px)] h-[clamp(60px,15vw,100px)] 
          border-[5px] border-[#d1d1d1] border-t-[tomato] rounded-full 
          animate-spin mb-5"
        ></div>

        {/* Status text */}
        <p className="text-[#555] text-[clamp(14px,2vw,18px)] font-medium">
          Verifying your payment...
        </p>
      </div>
    </div>
  );
};

export default Verify;
