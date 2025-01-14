import React from "react";
import { assets, FaArrowRightLong } from "../assets/assets";

const HeroBackground = () => {
  return (
    <div>
      <div
        style={{ backgroundImage: `url(${assets.hero_bg_2})` }}
        className={` pt-48 pb-48 w-full relative bg-fixed bg-center bg-no-repeat bg-cover`}
      >
        <div className="max-w-[540px] md:max-w-[720px] lg:max-w-[1000px] xl:max-w-[1140px] mx-auto w-full px-3">
          <div className="relative z-3 block">
            <h1 className="text-4xl sm:text-6xl md:text-8xl xl:text-9xl block font-bold mb-5 md:mb-16 text-white">
              Creativity In
              <br />
              Our Blood Line
            </h1>
            <div className="grid md:flex items-center text-white">
              <div className="w-full md:w-1/2 order-2 md:order-1">
                <a className="items-center cursor-pointer hover:text-orange-600 inline-flex font-semibold group">
                  <span
                    className="relative inline-block before:bg-white before:bottom-0 before:h-0.5 before:w-0 before:left-0 before:absolute
                    before:duration-500 before:ease-out group-hover:before:bg-orange-600 group-hover:before:origin-left group-hover:before:w-full"
                  >
                    Shop now
                  </span>
                  <FaArrowRightLong className="w-4 ml-2" />
                </a>
              </div>
              <div className="w-full md:w-1/2 order-1 md:order-2">
                <div className="text-base xl:text-lg mb-6 md:mb-0">
                  Chúng tôi cung cấp giải pháp giải quyết vấn đề tốt nhất cho
                  khách hàng và cung cấp sản phẩm hoàn thiện tốt nhất hiện tại
                  và tương lai.
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="hidden text-white h-6 text-sm lg:flex absolute -right-12 top-[40%] -rotate-90">
          <div
            className=" relative whitespace-nowrap after:bg-gray-300 after:rounded-sm after:-bottom-1 after:h-4 after:inline-block 
             after:absolute after:w-0.5 after:-rotate-90 after:-right-5 after:mr-2 after:top-1.5 mr-8"
          >
            Follow Us
          </div>
          <ul className="flex flex-wrap m-0 p-0">
            <li className="pr-3 cursor-pointer hover:text-orange-600">
              <a>Behance</a>
            </li>
            |
            <li className="pl-3 cursor-pointer hover:text-orange-600">
              <a>Twitter</a>
            </li>
          </ul>
        </div>

        <a
          href=""
          className="flex justify-center items-center border-2 border-solid bottom-[10%] h-9 left-1/2 -ml-3 absolute w-5 rounded-3xl"
        >
          <div className="w-1 h-1 bg-white rounded-[50%] animate-bounce "></div>
        </a>
      </div>
    </div>
  );
};

export default HeroBackground;
