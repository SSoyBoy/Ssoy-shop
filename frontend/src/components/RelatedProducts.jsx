import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "./Title";
import ProductItem from "./ProductItem";

const RelatedProducts = ({ category, subCategory }) => {
  const { products } = useContext(ShopContext);
  const [related, setRelated] = useState([]);

  useEffect(() => {
    if (products.length > 0) {
      let productsCopy = products.slice();

      productsCopy = productsCopy.filter((item) => category === item.category);
      productsCopy = productsCopy.filter(
        (item) => subCategory === item.subCategory
      );

      setRelated(productsCopy.slice(0, 5));
    }
  }, [products]);

  return (
    <div className="py-24">
      <div className="text-center text-3xl py-2">
        <Title text1={"SẢN PHẨM"} text2={"LIÊN QUAN"} />
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6">
        {related.map((item, index) => (
          <ProductItem
            key={index}
            index={index}
            id={item._id}
            image={item.image}
            name={item.name}
            price={item.price}
            outOfStock={item.outOfStock}
          />
        ))}
      </div>
    </div>
  );
};

export default RelatedProducts;
