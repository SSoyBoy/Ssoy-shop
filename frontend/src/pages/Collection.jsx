import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import { assets } from "../assets/assets";
import Title from "../components/Title";
import ProductItem from "../components/ProductItem";
import { useLocation } from "react-router-dom";
import axios from "axios";
import Pagination from "../components/Pagination";

const Collection = () => {
  const { search, showSearch, currency, setShowSearch, url, theme } =
    useContext(ShopContext);
  const [showFilter, setShowFilter] = useState(false);
  const [filterProducts, setFilterProducts] = useState([]);
  const [category, setCategory] = useState([]);
  const [subCategory, setSubCategory] = useState([]);
  const [sortType, setSortType] = useState("relavent");
  const [priceRange, setPriceRange] = useState(0);
  const [maxPrice, setMaxPrice] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [products, setProducts] = useState([]);

  const location = useLocation();
  const Select = location?.state;

  const searchParams = new URLSearchParams(location?.search);
  const currentPage = parseInt(searchParams.get("page")) || 1;

  const fetchProducts = async () => {
    const response = await axios.get(
      url + `/api/product/list?page=${currentPage}&limit=20`
    );
    setProducts(response.data.data.products);
    setTotalPages(response.data.data.totalPages);
  };

  useEffect(() => {
    fetchProducts();
  }, [currentPage]);

  useEffect(() => {
    if (products && products.length > 0) {
      setMaxPrice(Math.max(...products.map((item) => Number(item.price))));
    }
  }, [products]);

  useEffect(() => {
    if (Select) {
      if (Select.type) {
        setSubCategory([Select.type]);
      } else {
        setCategory([Select.category]);
      }
    }
  }, [Select]);

  const toggleCategory = (e) => {
    if (category.includes(e.target.value)) {
      setCategory((prev) => prev.filter((item) => item !== e.target.value));
    } else {
      setCategory((prev) => [...prev, e.target.value]);
    }
  };

  const toggleSubCategory = (e) => {
    if (subCategory.includes(e.target.value)) {
      setSubCategory((prev) => prev.filter((item) => item !== e.target.value));
    } else {
      setSubCategory((prev) => [...prev, e.target.value]);
    }
  };

  const applyFilter = () => {
    let productsCopy = [...products];

    if (search) {
      productsCopy = productsCopy.filter((item) =>
        item.name.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (category.length > 0) {
      productsCopy = productsCopy.filter((item) =>
        category.includes(item.category)
      );
    }

    if (subCategory.length > 0) {
      productsCopy = productsCopy.filter((item) =>
        subCategory.includes(item.subCategory)
      );
    }

    if (priceRange > 0) {
      productsCopy = productsCopy.filter((item) => item.price >= priceRange);
    }

    setFilterProducts(productsCopy);
    // setFilterProducts(
    //   productsCopy.slice((currentPage - 1) * 20, currentPage * 20)
    // );
    // setTotalPages(Math.ceil(productsCopy.length / 20));
  };

  const sortProduct = () => {
    let fbCopy = filterProducts.slice();
    switch (sortType) {
      case "low-high":
        setFilterProducts(fbCopy.sort((a, b) => a.price - b.price));
        break;
      case "high-low":
        setFilterProducts(fbCopy.sort((a, b) => b.price - a.price));
        break;
      default:
        applyFilter();
        break;
    }
  };

  useEffect(() => {
    if (products?.length > 0) {
      applyFilter();
    }
  }, [
    category,
    subCategory,
    search,
    showSearch,
    products,
    priceRange,
    currentPage,
  ]);

  useEffect(() => {
    sortProduct();
  }, [sortType]);

  useEffect(() => {
    const rangeInput = document.querySelector('input[type="range"]');
    if (rangeInput) {
      rangeInput.addEventListener("input", function () {
        const value = ((this.value - this.min) / (this.max - this.min)) * 100;
        this.style.background = `linear-gradient(to right, #FF4A17 ${value}%, transparent ${value}%)`;
      });
    }
  }, [maxPrice, priceRange]);

  return (
    <div className="flex flex-col md:flex-row gap-1 md:gap-5 lg:gap-10 pt-24 border-t px-4 md:px-16 lg:px-24">
      {/* Filter Options */}
      <div className="sm:min-w-60 lg:min-w-72">
        <p
          onClick={() => setShowFilter(!showFilter)}
          className="my-2 text-lg md:text-xl font-medium flex items-center cursor-pointer gap-2 select-none"
        >
          BỘ LỌC
          <img
            className={`h-3 md:hidden transition-all duration-200 ${
              showFilter ? "rotate-90 " : ""
            }`}
            src={assets.dropdown_icon}
            alt=""
          />
        </p>
        {/* Search value */}
        {search ? (
          <div
            style={
              theme === "light"
                ? {
                    background:
                      "linear-gradient(267.18deg, #f6f7f8a3, #f6f7f8d9)",
                  }
                : { background: "linear-gradient(267.18deg, #131313, #080808)" }
            }
            className="w-full flex text-sm !bg-gray-300  p-2 rounded-md"
          >
            <p
              onClick={() => setShowSearch(true)}
              className="cursor-pointer hover:text-orange-600 mr-1"
            >
              Giá trị tìm kiếm{" "}
            </p>
            /<p className="ml-1">{search}</p>
          </div>
        ) : null}
        {/* Price Filter */}
        <div
          style={
            theme === "light"
              ? {
                  background:
                    "linear-gradient(267.18deg, #f6f7f8a3, #f6f7f8d9)",
                }
              : { background: "linear-gradient(267.18deg, #131313, #080808)" }
          }
          className={`w-full rounded-xl !bg-gray-300 pl-5 py-3 mt-6 ${
            showFilter ? "" : "hidden"
          } md:block`}
        >
          <div className="flex">
            <p className="mb-3 text-sm font-medium">GIÁ</p>
          </div>
          <div className="w-full pr-5">
            <input
              type="range"
              id="vol"
              name="vol"
              min="0"
              max={maxPrice}
              value={priceRange}
              onChange={(e) => setPriceRange(Number(e.target.value))}
              className="w-full"
            />
            <p className="text-sm font-medium">
              {priceRange.toLocaleString()} {currency} -{" "}
              {maxPrice.toLocaleString()} {currency}
            </p>
          </div>
        </div>
        {/* Category Filter */}
        <div
          style={
            theme === "light"
              ? {
                  background:
                    "linear-gradient(267.18deg, #f6f7f8a3, #f6f7f8d9)",
                }
              : { background: "linear-gradient(267.18deg, #131313, #080808)" }
          }
          className={` rounded-xl !bg-gray-300  pl-5 py-3 mt-6 ${
            showFilter ? "" : "hidden"
          } md:block`}
        >
          <p className="mb-3 text-sm font-medium">DANH MỤC</p>
          <div
            className={`flex flex-col gap-2 text-sm md:text-base xl:text-lg font-light select-none ${
              theme === "light" ? "text-[#444]" : "text-[#999696]"
            }`}
          >
            <p className="flex gap-2">
              <input
                id="Men"
                type="checkbox"
                className="w-3 cursor-pointer"
                value={"Men"}
                onChange={toggleCategory}
                checked={category.includes("Men")}
              />{" "}
              <label htmlFor="Men" className="cursor-pointer">
                Nam
              </label>
            </p>
            <p className="flex gap-2">
              <input
                id="Women"
                type="checkbox"
                className="w-3 cursor-pointer"
                value={"Women"}
                onChange={toggleCategory}
                checked={category.includes("Women")}
              />{" "}
              <label htmlFor="Women" className="cursor-pointer">
                Nữ
              </label>
            </p>
            <p className="flex gap-2">
              <input
                id="Kids"
                type="checkbox"
                className="w-3 cursor-pointer"
                value={"Kids"}
                onChange={toggleCategory}
                checked={category.includes("Kids")}
              />{" "}
              <label htmlFor="Kids" className="cursor-pointer">
                Trẻ em
              </label>
            </p>
          </div>
        </div>
        {/* SubCategory Filter */}
        <div
          style={
            theme === "light"
              ? {
                  background:
                    "linear-gradient(267.18deg, #f6f7f8a3, #f6f7f8d9)",
                }
              : { background: "linear-gradient(267.18deg, #131313, #080808)" }
          }
          className={` rounded-xl !bg-gray-300  pl-5 py-3 my-5 ${
            showFilter ? "" : "hidden"
          } md:block`}
        >
          <p className="mb-3 text-sm font-medium">LOẠI</p>
          <div
            className={`flex flex-col gap-2 text-sm md:text-base xl:text-lg font-light select-none ${
              theme === "light" ? "text-[#444]" : "text-[#999696]"
            }`}
          >
            <p className="flex gap-2">
              <input
                id="Topwear"
                type="checkbox"
                className="w-3 cursor-pointer"
                value={"Topwear"}
                onChange={toggleSubCategory}
                checked={subCategory.includes("Topwear")}
              />{" "}
              <label htmlFor="Topwear" className="cursor-pointer">
                Topwear
              </label>
            </p>
            <p className="flex gap-2">
              <input
                id="Bottomwear"
                type="checkbox"
                className="w-3 cursor-pointer"
                value={"Bottomwear"}
                onChange={toggleSubCategory}
                checked={subCategory.includes("Bottomwear")}
              />{" "}
              <label htmlFor="Bottomwear" className="cursor-pointer">
                Bottomwear
              </label>
            </p>
            <p className="flex gap-2">
              <input
                id="Winterwear"
                type="checkbox"
                className="w-3 cursor-pointer"
                value={"Winterwear"}
                onChange={toggleSubCategory}
                checked={subCategory.includes("Winterwear")}
              />{" "}
              <label htmlFor="Winterwear" className="cursor-pointer">
                Winterwear
              </label>
            </p>
          </div>
        </div>
      </div>
      {/* Right Side */}
      <div className="flex-1">
        <div className="flex flex-wrap justify-between text-base md:text-2xl mb-4 font-medium">
          <Title text1={"TẤT CẢ"} text2={"BỘ SƯU TẬP"} />
          {/* Product Sort */}
          <div className="flex items-center">
            <p className="pr-2 text-base">Sắp xếp theo:</p>
            <select
              onChange={(e) => setSortType(e.target.value)}
              className="border-2 border-[#999696] bg-inherit h-10 text-sm px-2 max-h-8 focus:text-orange-600 outline-none cursor-pointer focus:border-orange-600"
            >
              <option className="bg-inherit" value="relavent">
                Liên quan
              </option>
              <option className="bg-inherit" value="low-high">
                Giá tăng dần
              </option>
              <option className="bg-inherit" value="high-low">
                Giá giảm dần
              </option>
            </select>
          </div>
        </div>
        {/* Map Products */}
        <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 min-[2000px]:grid-cols-5 gap-3 md:gap-4 gap-y-6">
          {filterProducts.map((item, index) => (
            <ProductItem
              key={index}
              index={index}
              id={item._id}
              image={item.image}
              name={item.name}
              price={item.price}
              outOfStock={item.outOfStock}
              bestseller={item?.bestseller}
            />
          ))}
        </div>

        {/* pagination */}
        <Pagination
          data={filterProducts}
          currentPage={currentPage}
          totalPages={totalPages}
        />
      </div>
    </div>
  );
};

export default Collection;
