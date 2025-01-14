import React, { useContext } from "react";
import {
  assets,
  AiFillYoutube,
  AiOutlineTwitter,
  FaLinkedinIn,
  TbBrandSlack,
} from "../assets/assets";
import { Link, useNavigate } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";

const Services = ["Trang chủ", "Bộ sưu tập", "Về chúng tôi", "Liên hệ"];

const Footer = () => {
  const { theme } = useContext(ShopContext);
  const navigate = useNavigate();
  return (
    <div>
      <div
        className={`w-full px-4 md:px-[6%] pt-10 ${
          theme === "dark" ? "bg-[#181818] text-white" : "bg-white text-black"
        }`}
      >
        {/*  */}
        <div className="px-0 pt-10">
          <div
            className=" mx-auto w-full justify-center m-0 
             "
          >
            <div className="flex flex-wrap">
              <div className="w-1/4 text-base mb-10 max-lg:w-1/2 max-sm:w-full">
                <div className="block">
                  <svg
                    // width="707"
                    // height="280"
                    viewBox="0 0 707 280"
                    fill="none"
                    className={`w-20 bg-cover object-cover cursor-pointer`}
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M18.3981 1.47572C9.70873 3.22329 4.27184 8.17475 1.16504 17.2524C0.291252 19.8252 0.242709 22.4466 0.242709 84.2427C0.242709 146.039 0.291252 148.66 1.16504 151.233C4.02912 159.583 8.10679 163.854 15.6796 166.476C18.6408 167.447 19.466 167.495 54.5146 167.641L90.2913 167.786V185.845C90.2913 196.379 90.0971 204.631 89.8058 205.65C89.1262 208.078 87.7184 209.243 85.3398 209.243C83.835 209.243 83.1553 208.951 82.233 207.883L81.068 206.524V190.99V175.505H40.534H-0.0485535L0.0970776 218.32C0.242709 260.65 0.242709 261.233 1.26213 263.854C4.51455 272.35 8.59222 276.379 16.2621 278.757C19.0291 279.583 22.4757 279.631 85.4369 279.631C148.398 279.631 151.845 279.583 154.612 278.757C160.971 276.816 165.097 273.369 167.913 267.786C171.311 261.087 171.117 265.893 171.117 188.612C171.117 124.049 171.068 118.709 170.291 115.65C168.398 108.466 164.32 102.835 159.029 100.262C153.301 97.4466 151.845 97.3495 114.757 97.3495H81.068V85.8932V74.4369L82.4757 73.0291C83.9806 71.5243 85.5825 71.2815 87.5243 72.1553C89.466 73.0291 90 74.7767 90.1942 81.4272L90.3884 87.6408H130.922H171.408L171.214 54.7281C171.068 26.0874 170.922 21.4757 170.243 18.8058C168.35 11.8155 164.223 6.233 159.029 3.66019C152.961 0.699021 154.709 0.747565 85.0485 0.796108C34.5631 0.844652 20.9223 0.990283 18.3981 1.47572Z"
                      fill="#ea580c"
                    />
                    <path
                      d="M197.816 1.28153C188.01 2.93202 181.65 9.04852 179.078 19.1942C178.058 23.1747 178.058 145.311 179.078 149.291C181.359 158.32 186.262 163.757 194.66 166.573C197.136 167.398 199.951 167.495 232.913 167.641L268.447 167.786V186.718C268.447 207.495 268.398 207.786 265.583 209C263.592 209.777 261.699 209.097 260.34 207.058C259.223 205.505 259.223 205.214 259.223 190.505V175.505H218.689H178.107L178.301 217.592C178.447 263.417 178.301 261.087 181.214 267.447C182.67 270.602 186.262 274.583 189.223 276.33C190.34 277.01 192.67 278.029 194.32 278.612C197.33 279.631 197.427 279.631 262.087 279.777C301.117 279.825 327.816 279.728 329.32 279.437C330.825 279.146 331.845 279.146 331.942 279.437C332.039 279.68 371.117 279.874 430.146 279.874H528.155V244.68V209.485H438.835H349.563L349.417 163.223L349.272 117.01L348.01 113.32C345.825 106.913 342.524 102.883 337.379 100.262C332.136 97.5922 333.107 97.6408 294.806 97.4951L259.223 97.301V86.6213C259.223 75.3107 259.563 73.2233 261.553 72.1553C262.816 71.4757 264.854 71.4757 266.068 72.1068C267.961 73.1262 268.447 75.1165 268.447 81.5728V87.6408H308.981H349.515V55.6019C349.515 20.1165 349.417 19 346.456 12.932C343.786 7.49513 339.32 3.85435 332.767 1.76697C330.631 1.08736 322.913 0.990271 265.291 0.941727C229.515 0.893183 199.175 1.03881 197.816 1.28153Z"
                      fill="currentColor"
                    />
                    <path
                      d="M376.505 1.23298C366.019 3.0291 360.049 8.8058 357.573 19.534C356.893 22.6893 356.796 30.6505 356.796 101.087C356.796 187.301 356.65 182.738 359.903 189.34C362.864 195.359 367.961 199.243 375 200.845C377.379 201.33 390.146 201.476 442.718 201.476C503.155 201.476 507.718 201.427 510.631 200.602C519.369 198.223 524.369 193.029 527.039 183.709C527.864 180.748 527.913 176.524 527.913 101.233C527.913 26.7184 527.864 21.6699 527.039 18.7087C524.66 9.9223 520 4.77667 511.99 2.00968L508.981 0.990262L443.932 0.941718C408.155 0.893174 377.816 1.03881 376.505 1.23298ZM445.243 63.9514C447.039 64.8252 447.136 67.0582 446.99 102.058L446.845 136.087L445.68 137.349C444.029 139.097 440.777 139.146 439.078 137.398L437.864 136.233V101.087C437.864 66.5242 437.864 65.8932 438.835 64.6796C440.194 62.932 442.767 62.6407 445.243 63.9514Z"
                      fill="currentColor"
                    />
                    <path
                      d="M535.097 64.9223C535.243 123.563 535.291 129.388 536.068 132.204C537.913 138.951 541.65 144.194 546.505 146.767C552.67 150.068 551.408 149.971 590.194 150.165L625.243 150.311V178.369C625.243 205.748 625.243 206.476 624.272 207.689C623.01 209.291 620.922 209.728 618.786 208.806C617.427 208.272 616.942 207.689 616.553 206.233C616.214 205.068 616.019 196.087 616.019 181.184V158.029H575.485H534.903L535.097 208.854C535.243 256.087 535.291 259.922 536.117 262.641C538.932 272.058 544.612 277.107 554.66 279.146C558.058 279.825 565.485 279.874 622.816 279.777C680.583 279.631 687.379 279.534 689.66 278.806C693.981 277.495 696.748 275.893 699.272 273.32C702.33 270.262 704.126 266.913 705.34 262.107C706.311 258.417 706.311 256.282 706.311 129.534V0.74759H665.777H625.243V40.3107V79.8738H623.107C620.049 79.8738 618.058 79 617.087 77.2524C616.311 75.8932 616.262 72.6408 616.117 38.2233L616.019 0.74759H575.437H534.903L535.097 64.9223Z"
                      fill="currentColor"
                    />
                  </svg>
                  <p className="mt-7 mr-5 block ">
                    Tất cả nội dung của trang web này không cung cấp phát trực
                    tuyến chính hãng. Nếu quyền lợi của bạn bị vi phạm, vui lòng
                    thông báo cho chúng tôi!
                  </p>
                </div>
                <div className="mt-6 flex flex-wrap -m-2">
                  <Link
                    // to="/"
                    className="border-2 rounded-full border-solid h-9 w-9 m-2 items-center 
                            flex justify-center duration-300 ease-linear hover:scale-105 hover:border-orange-600 text-xl font-medium"
                  >
                    <FaLinkedinIn className=" h-4 w-4 hover:scale-105" />
                  </Link>
                  <Link
                    // to="/"
                    className="border-2 rounded-full border-solid h-9 w-9 m-2 items-center 
                            flex justify-center duration-300 ease-linear hover:scale-105 hover:border-orange-600 text-xl font-medium"
                  >
                    <AiOutlineTwitter className=" hover:scale-105" />
                  </Link>
                  <Link
                    // to="/"
                    className="border-2 rounded-full border-solid h-9 w-9 m-2 items-center 
                            flex justify-center duration-300 ease-linear hover:scale-105 hover:border-orange-600 text-xl font-medium"
                  >
                    <AiFillYoutube className=" hover:scale-105" />
                  </Link>
                  <Link
                    // to="/"
                    className="border-2 rounded-full border-solid h-9 w-9 m-2 items-center 
                            flex justify-center duration-300 ease-linear hover:scale-105 hover:border-orange-600 text-xl font-medium"
                  >
                    <TbBrandSlack className=" hover:scale-105" />
                  </Link>
                </div>
              </div>
              <div
                className={`w-1/4 text-base mb-10 max-lg:w-1/2 max-sm:w-full ${
                  theme === "dark" ? "text-gray-300" : "text-[#181818]"
                }`}
              >
                <div className="block">
                  <h2 className="text-xl mb-9  font-bold">Sản phẩm</h2>
                  <ul className="m-0 p-0">
                    {Services.map((e, idx) => {
                      return (
                        <li key={idx} className="mb-5 hover:text-orange-600">
                          <Link to={`/${e}`} className="">
                            {e}
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </div>
              <div
                className={`w-1/4 text-base mb-10 max-lg:w-1/2 max-sm:w-full ${
                  theme === "dark" ? "text-gray-300" : "text-[#181818]"
                }`}
              >
                <div className="block">
                  <h2 className="text-xl mb-9  font-bold">Liên hệ</h2>
                  <ul className="m-0 p-0">
                    <li className="mb-5">+88 888 8888 8888</li>
                    <li className="mb-5">ssoy@shop.com</li>
                    <li className="mb-5">
                      50 Đường ABC, SSoy
                      <br />
                      City, Việt Nam
                    </li>
                  </ul>
                </div>
              </div>
              <div
                className={`w-1/4 text-base mb-10 max-lg:w-1/2 max-sm:w-full ${
                  theme === "dark" ? "text-gray-300" : "text-[#181818]"
                }`}
              >
                <div className="block">
                  <h2 className="text-xl mb-9  font-bold">Subscribe</h2>
                  <div className="mt-1.5 block ">
                    <form className="relative block">
                      <input
                        type="email"
                        placeholder="ssoy@shop.com"
                        className={`rounded-xl border-none  h-12 py-1.5 pl-4 pr-22 w-full outline-0
                                  max-lg:pr-20 ${
                                    theme === "dark"
                                      ? "bg-black"
                                      : "bg-gray-200"
                                  }`}
                      ></input>
                      <div className="absolute right-1 top-1">
                        <button
                          className="bg-[#ff4a17] rounded-xl text-white font-semibold overflow-hidden py-2 px-6 group cursor-pointer
                                   max-lg:w-16 max-lg:px-4 relative"
                        >
                          <span>Send</span>
                          <div className="absolute left-0 top-0 bottom-0 w-0 group-hover:w-full transition-all rounded-xl bg-[rgba(0,0,0,0.3)]"></div>
                        </button>
                      </div>
                    </form>
                    <div className="mt-6 block ">
                      Nếu quyền lợi của bạn bị vi phạm chúng tôi sẽ xóa nội dung
                      vi phạm kịp thời, cảm ơn sự hợp tác của bạn!
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/*  */}
        {/*  */}
        <div className="max-w-7xl mx-auto w-full block max-2xl:max-w-7xl max-xl:max-w-5xl max-lg:max-w-3xl max-md:max-w-xl">
          <div
            className="border-t border-solid border-gray-400 flex flex-wrap justify-between py-5
              max-md:items-center max-md:flex-col max-md:justify-center max-md:text-center"
          >
            <div className="py-1 block ">
              <div className="text-base">Copyright © 2024 Ssoy.</div>
            </div>
            <div className="py-1 block text-base">
              <ul className="flex flex-wrap m-0 p-0">
                <li className="pr-3 hover:text-orange-600">
                  <Link to="">Terms of Use</Link>
                </li>
                |
                <li className="pl-3 hover:text-orange-600">
                  <Link to="">Privacy Policy</Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
        {/*  */}
      </div>
    </div>
  );
};

export default Footer;
