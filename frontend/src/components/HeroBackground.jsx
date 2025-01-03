import React from "react";
import { assets } from "../assets/assets";
import { FaArrowRightLong } from "react-icons/fa6";

const funFact = [
  {
    title: "Global Happy Clients",
    total: "40K",
  },
  {
    title: "Project Completed",
    total: "50K",
  },
  {
    title: "Team Members",
    total: "245",
  },
  {
    title: "Digital products",
    total: "550",
  },
];

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
      {/* container */}
      {/* <div className="max-w-7xl mx-auto w-full px-3">
        <div className="-mt-32 items-center bg-gradient-to-r from-[#080808] to-[#151515] rounded-2xl flex px-20 py-[60px] relative z-1 w-full">
          <div
            style={{ backgroundImage: `url(${assets.funfact_shape_bg})` }}
            className=" bg-[100%] bg-no-repeat rounded-2xl h-full absolute left-0 top-0 w-full"
          ></div>
          <div className="relative w-[40%] z-2 block ">
            <div className="block">
              <h2 className="text-5xl mb-5 text-white font-semibold ">
                Our fun fact
              </h2>
              <p className="text-gray-300">
                Sed ut perspiciatis unde omnis iste natus error voluptatem
                accusantium doloremque laudantium, totam rem aperiam, eaque ipsa
                quae ab illo inventore veritatis.
              </p>
            </div>
          </div>
          <div className="relative pl-20 z-2 ">
            <div className="gap-x-10 gap-y-9 grid grid-cols-2">
              {funFact.map((items) => (
                <div className="items-center flex">
                  <div className="text-5xl mr-3 text-white font-semibold ">
                    {items?.total}
                  </div>
                  <div className="block">
                    <span className="block text-xl font-bold -mt-1 text-orange-600">
                      +
                    </span>
                    <p className="text-gray-300">{items?.title}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div> */}
      {/* end container */}
    </div>
  );
};

export default HeroBackground;
