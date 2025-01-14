import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "../components/Title";
import CartTotal from "../components/CartTotal";
import { FaRegTrashAlt } from "../assets/assets";

const Cart = () => {
  const {
    products,
    currency,
    cartItems,
    updateQuantity,
    navigate,
    url,
    theme,
  } = useContext(ShopContext);

  const [cartData, setCartData] = useState([]);

  console.log("cartData", cartData);

  useEffect(() => {
    const tempData = [];
    for (const items in cartItems) {
      for (const item in cartItems[items]) {
        if (cartItems[items][item] > 0) {
          tempData.push({
            _id: items,
            size: item,
            quantity: cartItems[items][item],
          });
        }
      }
    }

    setCartData(tempData);
  }, [cartItems]);

  return (
    <div className="border-t pt-24 px-4 md:px-16 lg:px-24">
      <div className="text-2xl mb-3">
        <Title text1={"GIỎ HÀNG"} text2={"CỦA BẠN"} />
      </div>
      <div className="">
        {cartData.length === 0 ? (
          <div className="w-full text-center py-10">
            <h2 className="text-lg font-semibold">
              Bạn chưa thêm sản phẩm nào vào giỏ hàng.
            </h2>
            <p className="mt-2">
              Duyệt qua sản phẩm của chúng tôi và bắt đầu mua sắm!
            </p>
            <button
              onClick={() => navigate("/collection")}
              className="border p-2 mt-4 hover:text-orange-600 hover:border-orange-600"
            >
              Bắt đầu mua sắm
            </button>
          </div>
        ) : (
          cartData.map((item, index) => {
            const productData = products.find(
              (product) => product._id === item._id
            );
            return (
              <div
                key={index}
                className="py-4 border-t border-b border-gray-400 grid grid-cols-[4fr_0.5fr_0.5fr] sm:grid-cols-[4fr_2fr_0.5fr] items-center gap-4"
              >
                <div className="flex items-start gap-6">
                  <img
                    className="w-16 sm:w-20 rounded-md"
                    src={`${url}/images/` + productData?.image[0]}
                    alt=""
                  />
                  <div>
                    <p className="text-xs sm:text-lg font-medium">
                      {productData?.name}
                    </p>
                    <div className="flex items-center gap-5 mt-2">
                      <p className="text-[#fa580c]">
                        {productData?.price.toLocaleString()}
                        {currency}
                      </p>
                      <p
                        className={`px-2 sm:px-3 sm:py-1 border border-[#999696] rounded-md ${
                          theme === "light" ? "bg-white" : "bg-black"
                        }`}
                      >
                        {item?.size}
                      </p>
                    </div>
                  </div>
                </div>
                <input
                  onChange={(e) =>
                    e.target.value === "" || e.target.value === "0"
                      ? null
                      : updateQuantity(
                          item._id,
                          item.size,
                          Number(e.target.value)
                        )
                  }
                  className="border max-w-10 sm:max-w-20 px-1 sm:px-2 py-1 bg-inherit rounded-md"
                  type="number"
                  min={1}
                  // defaultValue={item.quantity}
                  value={item?.quantity}
                />
                <FaRegTrashAlt
                  onClick={() => updateQuantity(item?._id, item?.size, 0)}
                  className="w-4 mr-4 sm:w-5 cursor-pointer text-red-500"
                />
              </div>
            );
          })
        )}
      </div>

      <div className="flex justify-end py-20">
        <div className="w-full sm:w-[450px]">
          <CartTotal />
          <div
            className={`w-full mt-4 flex justify-end items-center ${
              cartData.length === 0 ? "cursor-not-allowed" : "cursor-pointer"
            }`}
          >
            <div
              onClick={() => {
                cartData.length > 0 && navigate("/place-order");
              }}
              className="relative group"
            >
              <button className="bg-[#ff4a17] rounded-xl font-semibold text-white text-xs px-10 py-4">
                TIẾN HÀNH THANH TOÁN
              </button>
              <div
                style={{ background: "rgba(0, 0, 0, 0.4)" }}
                className="absolute rounded-xl w-0 top-0 bottom-0 transition-all duration-300 group-hover:w-full"
              ></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
