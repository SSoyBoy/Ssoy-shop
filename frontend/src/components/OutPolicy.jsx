import React, { useContext } from "react";
import { assets } from "../assets/assets";
import { ShopContext } from "../context/ShopContext";
import { BiSupport } from "react-icons/bi";
import { RiExchangeFundsLine } from "react-icons/ri";
import { LiaShippingFastSolid } from "react-icons/lia";

const OutPolicy = () => {
  const { theme } = useContext(ShopContext);
  return (
    <div
      style={
        theme === "light"
          ? { background: "linear-gradient(267.18deg, #f0eeee, #f8f8f8)" }
          : { background: "linear-gradient(267.18deg, #161616, #080808)" }
      }
      className="relative px-4 md:px-16 lg:px-24 flex flex-col sm:flex-row justify-around gap-12 sm:gap-2 text-center py-28 text-xs sm:text-sm md:text-base"
    >
      <div className="absolute -bottom-1/3 right-10 animate-bounce hidden md:block">
        <img src={assets.shape_1} alt="" />
      </div>
      <div>
        <RiExchangeFundsLine
          className={`w-12 h-12 m-auto mb-5 rounded-[50%] cursor-pointer transition-all duration-700 rotate-0 hover:rotate-[360deg] p-2 hover:rounded-sm ${
            theme === "light" ? "text-white bg-black" : "text-black bg-white"
          }`}
        />
        <p className="font-semibold">Chính Sách Đổi Trả Dễ Dàng</p>
        <p className={theme === "light" ? "text-[#444]" : "text-[#999696]"}>
          Chúng tôi cung cấp chính sách đổi trả dễ dàng
        </p>
      </div>
      <div>
        <LiaShippingFastSolid
          className={`w-12 h-12 m-auto mb-5 rounded-[50%] cursor-pointer transition-all duration-700 rotate-0 hover:rotate-[360deg] p-2 hover:rounded-sm ${
            theme === "light" ? "text-white bg-black" : "text-black bg-white"
          }`}
        />
        <p className="font-semibold">Chính Sách Trả Hàng Trong Vòng 7 Ngày</p>
        <p className={theme === "light" ? "text-[#444]" : "text-[#999696]"}>
          Chúng tôi cung cấp chính sách trả hàng miễn phí trong 7 ngày
        </p>
      </div>
      <div>
        <BiSupport
          className={`w-12 h-12 m-auto mb-5 rounded-[50%] cursor-pointer transition-all duration-700 rotate-0 hover:rotate-[360deg] p-2 hover:rounded-sm ${
            theme === "light" ? "text-white bg-black" : "text-black bg-white"
          }`}
        />
        <p className="font-semibold">Hỗ Trợ Khách Hàng Tốt Nhất</p>
        <p className={theme === "light" ? "text-[#444]" : "text-[#999696]"}>
          Chúng tôi cung cấp hỗ trợ khách hàng 24/7
        </p>
      </div>
    </div>
  );
};

export default OutPolicy;
