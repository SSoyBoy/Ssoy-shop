import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import { assets, IoIosSearch } from "../assets/assets";
import { useLocation, useNavigate } from "react-router-dom";

const SearchBar = () => {
  const {
    showSearch,
    setShowSearch,
    search,
    setSearch,
    products,
    url,
    currency,
    theme,
  } = useContext(ShopContext);
  const [searchData, setSearchData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [imageLoaded, setImageLoaded] = useState({});

  const navigate = useNavigate();
  const { pathname } = useLocation();

  const handleImageLoad = (index) => {
    setImageLoaded((prev) => ({ ...prev, [index]: true }));
  };

  const searchFilter = () => {
    let productsCopy = products.slice();
    if (showSearch && search) {
      productsCopy = productsCopy.filter((item) =>
        item.name.toLowerCase().includes(search.toLowerCase())
      );
      setSearchData(productsCopy);
    } else {
      setSearchData([]);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      if (pathname !== "/collection") {
        setShowSearch(false);
        navigate("/collection");
      } else {
        setShowSearch(false);
      }
    }
  };

  useEffect(() => {
    setLoading(true);
    if (search !== "" && products.length > 0) {
      searchFilter();
      setLoading(false);
    } else {
      setSearchData([]);
      setLoading(false);
    }
  }, [search, showSearch]);

  return showSearch ? (
    <>
      <div
        style={{ backgroundColor: "rgba(0, 0, 0, 0.6)" }}
        onClick={() => setShowSearch(false)}
        className="fixed top-0 left-0 bottom-0 right-0 z-40 cursor-pointer"
      ></div>
      <div className="fixed top-[8%] left-[6%] bottom-[8%] right-[6%] sm:top-[10%] sm:left-[20%] sm:bottom-[10%] sm:right-[20%] flex z-50 items-center justify-center">
        <div
          className={`w-full h-full rounded-lg ${
            theme === "dark" ? "bg-[#181818]" : "bg-white"
          }`}
        >
          <div className="flex justify-between items-center rounded-xl m-2 border">
            <div className="inline-flex w-full items-center justify-center  px-3 py-2 ">
              <IoIosSearch className="w-5 h-5 mr-1" />
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="flex-1 outline-none w-full bg-inherit text-sm border-none"
                type="text"
                onKeyDown={handleKeyDown}
                placeholder="Tìm kiếm theo tên"
              />
            </div>
            {loading ? (
              <img
                className="w-5 h-5 animate-spin mr-2"
                src={assets.loading_icon}
                alt=""
              />
            ) : (
              <div
                onClick={() => setSearch("")}
                className="px-2 py-2 flex items-center justify-center"
              >
                <img
                  src={assets.cross_icon}
                  className="inline w-4 cursor-pointer"
                  alt=""
                />
              </div>
            )}
          </div>
          <div className="w-full h-[90%] overflow-y-auto sm:px-2">
            {searchData.length > 0 ? (
              searchData?.map((item, index) => (
                <div
                  key={index}
                  onClick={() => {
                    navigate(`/product/${item._id}`);
                    setShowSearch(false);
                    setSearch("");
                  }}
                  className="flex p-2 mx-2 rounded-lg items-center cursor-pointer hover:shadow-lg transition-all hover:mx-0 hover:shadow-gray-700"
                >
                  <div>
                    <img
                      className={`w-14 sm:w-20 rounded-md ${
                        imageLoaded[index]
                          ? "opacity-100 blur-none"
                          : "opacity-0 blur-md transition-all duration-500"
                      }`}
                      src={`${url}/images/` + item.image[0]}
                      alt=""
                      loading="lazy"
                      onLoad={() => handleImageLoad(index)}
                    />
                  </div>
                  <div className="w-[80%] text-xs sm:text-sm md:text-base px-4">
                    <p className="">{item?.name}</p>
                  </div>
                  <div className="text-sm text-red-700 font-medium">
                    {item.price.toLocaleString()}
                    {currency}
                  </div>
                </div>
              ))
            ) : (
              <div className="w-full flex justify-center pt-4">
                Không tìm thấy kết quả nào.
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  ) : null;
};

export default SearchBar;
