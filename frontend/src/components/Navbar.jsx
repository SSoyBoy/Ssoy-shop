import { useContext, useEffect, useState } from "react";
import {
  assets,
  IoIosArrowUp,
  FaRegLightbulb,
  FaLightbulb,
  LuUser2,
  TbBorderStyle2,
  RiLogoutCircleRLine,
  AiOutlineLogin,
  IoIosSearch,
  BsCart3,
} from "../assets/assets";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";

const NavBar = () => {
  const {
    setShowSearch,
    getCartCount,
    token,
    handleScrollTop,
    setTheme,
    theme,
    logout,
  } = useContext(ShopContext);
  const [visible, setVisible] = useState(false);
  const [isShowBtn, setIsShowBtn] = useState(false);

  const { pathname } = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY >= 1200) {
        setIsShowBtn(true);
      } else {
        setIsShowBtn(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [theme, pathname]);

  //"bg-[linear-gradient(180deg,rgba(0,0,0,0.8)_40%,transparent)]"
  return (
    <div
      className={`transition-all duration-300 fixed top-0 left-0 right-0 px-4 md:px-[6%] z-50 ${
        theme === "dark" ? "bg-black text-white" : "bg-white text-black"
      }`}
    >
      <div
        onClick={handleScrollTop}
        className={`fixed bottom-10 right-[2%] border rounded-full p-2 cursor-pointer hover:text-orange-600 hover:border-orange-600 ${
          isShowBtn ? "block" : "hidden"
        } ${
          theme === "light"
            ? "text-black border-black"
            : "text-white border-white"
        }`}
      >
        <IoIosArrowUp className="w-6 h-6" />
      </div>
      <div className="flex items-center justify-between py-2 font-medium">
        <Link to={"/"}>
          <svg
            // width="707"
            // height="280"
            viewBox="0 0 707 280"
            fill="none"
            className={`w-20 bg-cover object-cover`}
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
        </Link>
        <ul className="hidden md:flex gap-8 text-sm">
          <NavLink
            to={"/"}
            className="flex flex-col items-center gap-1 hover:text-orange-600"
          >
            <p>TRANG CHỦ</p>
            <hr className="w-full border-none h-[1.5px] bg-orange-600 hidden" />
          </NavLink>
          <NavLink
            to={"/collection"}
            className="flex flex-col items-center gap-1 hover:text-orange-600"
          >
            <p>BỘ SƯU TẬP</p>
            <hr className="w-full border-none h-[1.5px] bg-orange-600 hidden" />
          </NavLink>
          <NavLink
            to={"/about"}
            className="flex flex-col items-center gap-1 hover:text-orange-600"
          >
            <p>GIỚI THIỆU</p>
            <hr className="w-full border-none h-[1.5px] bg-orange-600 hidden" />
          </NavLink>
          <NavLink
            to={"/contact"}
            className="flex flex-col items-center gap-1 hover:text-orange-600"
          >
            <p>LIÊN HỆ</p>
            <hr className="w-full border-none h-[1.5px] bg-orange-600 hidden" />
          </NavLink>
        </ul>
        <div className="flex items-center gap-6 select-none">
          <IoIosSearch
            onClick={() => setShowSearch(true)}
            className="w-6 h-6 cursor-pointer"
          />
          {theme === "dark" ? (
            <FaLightbulb
              onClick={() => {
                setTheme("light");
                localStorage.setItem("theme", "light");
              }}
              className="w-5 h-5 cursor-pointer"
            />
          ) : (
            <FaRegLightbulb
              onClick={() => {
                setTheme("dark");
                localStorage.setItem("theme", "dark");
              }}
              className="w-5 h-5 cursor-pointer"
            />
          )}

          <div className="group relative">
            <LuUser2 className="w-6 h-6 cursor-pointer" />
            <div className="group-hover:block hidden absolute dropdown-menu right-0 pt-4">
              <div className="flex flex-col gap-1 w-60 py-3 px-3 bg-white shadow-2xl text-gray-500 rounded">
                <div
                  onClick={() => navigate("/account")}
                  className="flex cursor-pointer gap-2 items-center hover:bg-gray-100 p-2 rounded-md"
                >
                  <LuUser2 className="w-5 h-5" />
                  <p className="hover:text-black">Tài khoản</p>
                </div>
                <div
                  onClick={() => navigate("/account/orders")}
                  className="flex cursor-pointer gap-2 items-center hover:bg-gray-100 p-2 rounded-md"
                >
                  <TbBorderStyle2 className="w-5 h-5" />
                  <p className="hover:text-black">Đơn hàng</p>
                </div>

                {token ? (
                  <div
                    onClick={logout}
                    className="flex cursor-pointer gap-2 items-center hover:bg-gray-100 p-2 rounded-md"
                  >
                    <RiLogoutCircleRLine className="w-5 h-5" />
                    <p className="hover:text-black">Đăng xuất</p>
                  </div>
                ) : (
                  <div
                    onClick={() => navigate("/login")}
                    className="flex cursor-pointer gap-2 items-center hover:bg-gray-100 p-2 rounded-md"
                  >
                    <AiOutlineLogin className="w-5 h-5" />
                    <p className="hover:text-black">Đăng nhập</p>
                  </div>
                )}
              </div>
            </div>
          </div>
          <Link to="/cart" className="relative">
            <BsCart3 className="w-6 h-6 min-w-5" />
            <p className="absolute text-orange-600 right-[-10px] bottom-[-6px] w-4 text-center leading-4 aspect-square rounded-full text-[12px]">
              {getCartCount()}
            </p>
          </Link>
          <img
            onClick={() => setVisible(true)}
            src={assets.menu_icon_white}
            className="w-7 cursor-pointer md:hidden"
            alt=""
          />
        </div>
        {/* Sidevar small */}
        <div
          className={`fixed top-0 right-0 bottom-0 bg-[#181818] transition-all ${
            visible ? "w-full" : "w-0"
          }`}
        >
          <div className="flex flex-col">
            <div
              onClick={() => setVisible(false)}
              className="flex items-center gap-4 p-3 cursor-pointer"
            >
              <img
                src={assets.dropdown_icon}
                className="h-4 rotate-180"
                alt=""
              />
            </div>
            <NavLink
              className={"py-2 pl-6 border-b border-gray-500"}
              onClick={() => setVisible(false)}
              to={"/home"}
            >
              TRANG CHỦ
            </NavLink>
            <NavLink
              className={"py-2 pl-6 border-b border-gray-500"}
              onClick={() => setVisible(false)}
              to={"/collection"}
            >
              BỌ SƯU TẬP
            </NavLink>
            <NavLink
              className={"py-2 pl-6 border-b border-gray-500"}
              onClick={() => setVisible(false)}
              to={"/about"}
            >
              GIỚI THIỆU
            </NavLink>
            <NavLink
              className={"py-2 pl-6 border-b border-gray-500"}
              onClick={() => setVisible(false)}
              to={"/contact"}
            >
              LIÊN HỆ
            </NavLink>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
