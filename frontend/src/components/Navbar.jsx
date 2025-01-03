import React, { useContext, useEffect, useRef, useState } from "react";
import { assets } from "../assets/assets";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";
import { IoIosArrowUp } from "react-icons/io";
import { FaRegLightbulb } from "react-icons/fa";
import { FaLightbulb } from "react-icons/fa";
import { LuUser2 } from "react-icons/lu";
import { TbBorderStyle2 } from "react-icons/tb";
import { RiLogoutCircleRLine } from "react-icons/ri";
import { AiOutlineLogin } from "react-icons/ai";

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

  const navRef = useRef();
  const { pathname } = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      if (navRef.current) {
        // if (window.scrollY >= 80) {
        //   navRef.current.classList.add(`bg-black`);
        // } else {
        //   if (pathname !== "/collection") {
        //     navRef.current.classList.remove("bg-black");
        //   }
        // }
        if (window.scrollY >= 1200) {
          setIsShowBtn(true);
        } else {
          setIsShowBtn(false);
        }
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
      ref={navRef}
      className={`transition-all duration-300 fixed top-0 left-0 right-0 px-4 md:px-[6%] z-50 ${
        pathname === "/collection" ? "bg-black" : "bg-black"
      }`}
    >
      <div
        onClick={handleScrollTop}
        className={`fixed bottom-10 right-10 border rounded-full p-2 cursor-pointer hover:text-orange-600 hover:border-orange-600 ${
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
          <img
            src={assets.logo_ssoy}
            className="w-20 bg-cover object-cover"
            alt=""
          />{" "}
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
          <img
            onClick={() => setShowSearch(true)}
            src={assets.search_icon1}
            className="w-6 cursor-pointer"
            alt=""
          />
          {theme === "light" ? (
            <FaRegLightbulb
              onClick={() => {
                setTheme("dark");
                localStorage.setItem("theme", "dark");
              }}
              className="w-5 h-5 text white cursor-pointer"
            />
          ) : (
            <FaLightbulb
              onClick={() => {
                setTheme("light");
                localStorage.setItem("theme", "light");
              }}
              className="w-5 h-5 text white cursor-pointer"
            />
          )}

          <div className="group relative">
            <img src={assets.user_icon} className="w-6 cursor-pointer" alt="" />
            <div className="group-hover:block hidden absolute dropdown-menu right-0 pt-4">
              <div className="flex flex-col gap-1 w-60 py-3 px-3 bg-white shadow-2xl text-gray-500 rounded">
                <div
                  onClick={() => navigate("/profile")}
                  className="flex gap-2 items-center hover:bg-gray-100 p-2 rounded-md"
                >
                  <LuUser2 className="w-5 h-5" />
                  <p className="cursor-pointer hover:text-black">
                    Thông tin cá nhân
                  </p>
                </div>
                <div
                  onClick={() => navigate("/orders")}
                  className="flex gap-2 items-center hover:bg-gray-100 p-2 rounded-md"
                >
                  <TbBorderStyle2 className="w-5 h-5" />
                  <p className="cursor-pointer hover:text-black">Đơn hàng</p>
                </div>

                {token ? (
                  <div
                    onClick={logout}
                    className="flex gap-2 items-center hover:bg-gray-100 p-2 rounded-md"
                  >
                    <RiLogoutCircleRLine className="w-5 h-5" />
                    <p className="cursor-pointer hover:text-black">Đăng xuất</p>
                  </div>
                ) : (
                  <div
                    onClick={() => navigate("/login")}
                    className="flex gap-2 items-center hover:bg-gray-100 p-2 rounded-md"
                  >
                    <AiOutlineLogin className="w-5 h-5" />
                    <p className="cursor-pointer hover:text-black">Đăng nhập</p>
                  </div>
                )}
              </div>
            </div>
          </div>
          <Link to="/cart" className="relative">
            <img src={assets.cart_icon1} className="w-6 min-w-5" alt="" />
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
