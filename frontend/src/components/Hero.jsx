import React, { useContext } from "react";
import { FaArrowRightLong } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";

const Hero = () => {
  const { theme } = useContext(ShopContext);
  const navigate = useNavigate();
  return (
    // <div className="flex flex-col sm:flex-row border border-gray-400 relative">
    //   {/* Hero left side */}
    //   <div className="w-full sm:w-1/2 flex items-center justify-center py-10 sm:py-0">
    //     <div className="text-[#414141]">
    //       <div className="flex items-center gap-2">
    //         <p className="w-8 md:w-11 h-[2px] bg-[#414141]"></p>
    //         <p className="font-medium text-sm md:text-base">OUT BESTSELLERS</p>
    //       </div>
    //       <h1 className="prata-regular text-3xl sm:py-3 lg:text-5xl leading-relaxed">
    //         Lastest Arrivals
    //       </h1>
    //       <div
    //         className="flex items-center
    //       gap-2"
    //       >
    //         <p className="font-semibold text-sm md:text-base test">SHOP NOW</p>
    //         <p className="w-8 md:w-11 h-[1px] bg-[#414141]"></p>
    //       </div>
    //     </div>
    //   </div>
    //   {/* Hero Right Side */}
    //   <div className="w-full cursor-pointer relative overflow-hidden sm:w-1/2 mirror">
    //     <img src={assets.hero_img} alt="" />
    //   </div>
    // </div>
    <div className="mx-[6%] relative py-10">
      <div className="w-full cursor-pointer relative overflow-hidden md:w-3/5 mirror ">
        <div className="w-full relative">
          <div className="z-0 relative">
            <img
              className="w-full flex rounded"
              src={
                theme === "light"
                  ? "https://cdn.pixabay.com/photo/2017/05/13/12/40/fashion-2309519_640.jpg"
                  : "https://www.ifema.es/mbfw-madrid/img/desfilando-traje-plumas/rrss-25.jpg"
              }
              alt=""
            />
          </div>
        </div>
      </div>
      <div className="p-5 absolute left-0 right-0 lg:right-[5%] top-0 bottom-0 flex items-center justify-center md:justify-end">
        <div className="z-30 w-full md:max-w-[400px] lg:max-w-[500px]">
          <div className="mb-2 md:mb-5 lg:mb-10 font-semibold">
            <p className="uppercase text-xs sm:text-sm md:text-base">
              <b>new</b> collection
            </p>
            <h1
              style={{ fontFamily: "Hind Madurai" }}
              className="text-2xl lg:text-4xl xl:text-5xl 2xl:text-6xl block py-2 lg:py-5 font-medium"
            >
              Multi-Brand
              <br />
              Store Of Clothes
            </h1>
            <p className="block max-[350px]:hidden text-xs sm:text-sm lg:text-base">
              Chúng tôi theo dõi các xu hướng thời trang và đã làm việc vì bạn
              hơn 20 năm. Tuyển chọn những trang phục đẹp nhất, thú vị nhất, và
              quan trọng là những bộ trang phục nhàm chán cho các dịp khác nhau.
            </p>
          </div>
          <button
            onClick={() => navigate("/collection")}
            className="p-2 sm:px-5 sm:py-3 text-sm lg:text-base text-white rounded-md bg-[#000] flex items-center hover:text-orange-600"
          >
            Shop Now <FaArrowRightLong className="w-4 ml-2" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Hero;