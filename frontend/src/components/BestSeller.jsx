import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "./Title";
import ProductItem from "./ProductItem";

const BestSeller = () => {
  const { products, theme } = useContext(ShopContext);
  const [bestSeller, setBestSeller] = useState([]);

  useEffect(() => {
    const bestProduct = products.filter((item) => item.bestseller);
    setBestSeller(bestProduct.slice(0, 5));
  }, [products]);

  return (
    <div className="my-10 px-4 md:px-16 lg:px-24 relative">
      <div className="text-center text-xl md:text-2xl lg:text-3xl py-8">
        <Title text1={"BEST"} text2={"SELLERS"} />
        <p
          className={`w-3/4 m-auto text-xs sm:text-sm md:text-base font-semibold ${
            theme === "light" ? "text-[#444]" : "text-[#999696]"
          }`}
        >
          Những sản phẩm được yêu thích nhất, luôn nằm trong top lựa chọn hàng
          đầu từ khách hàng.
        </p>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6">
        {bestSeller.map((item, index) => (
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
    </div>
  );
};

export default BestSeller;
