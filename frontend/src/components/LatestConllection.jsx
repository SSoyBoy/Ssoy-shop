import { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "./Title";
import ProductItem from "./ProductItem";

const LatestConllection = () => {
  const { products, theme } = useContext(ShopContext);
  const [latestProducts, setLatestProducts] = useState([]);

  useEffect(() => {
    setLatestProducts(products.slice(0, 5));
  }, [products]);

  return (
    <div className="my-10 px-4 md:px-16 lg:px-24 relative">
      <div
        className={`absolute top-0 left-96 w-20 h-20 rounded-full animate-bounce z-0 hidden md:block ${
          theme === "light" ? "bg-gray-300" : "bg-black"
        }`}
      ></div>
      <div
        className={`absolute top-10 left-10 w-72 h-72 rounded-full  z-0 hidden md:block`}
      ></div>
      <div
        className={`absolute top-10 left-10 w-72 h-72 rounded-full z-0 hidden md:block ${
          theme === "light" ? "bg-gray-300" : "bg-black"
        }`}
      ></div>
      <div className="text-center py-8 text-xl md:text-2xl lg:text-3xl z-10 relative">
        <Title text1={"LATEST"} text2={"COLLECTION"} />
        <p
          className={`w-3/4 m-auto text-xs sm:text-sm md:text-base font-semibold ${
            theme === "light" ? "text-[#444]" : "text-[#999696]"
          }`}
        >
          Bộ sưu tập hiện đại mang đậm dấu ấn phong cách và chất lượng, được
          chọn lọc từ những xu hướng mới nhất.
        </p>
      </div>
      {/* Rendering Products */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6">
        {latestProducts.map((item, index) => (
          <ProductItem
            key={index}
            index={index}
            id={item._id}
            name={item.name}
            image={item.image}
            price={item.price}
            outOfStock={item.outOfStock}
          />
        ))}
      </div>
    </div>
  );
};

export default LatestConllection;
