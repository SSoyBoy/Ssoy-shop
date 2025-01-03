import React, { useContext, useEffect, useState } from "react";
import Title from "../components/Title";
import CartTotal from "../components/CartTotal";
import { assets } from "../assets/assets";
import { ShopContext } from "../context/ShopContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const sizes = ["S", "M", "L", "XL"];
const PlaceOrder = () => {
  const {
    products,
    cartItems,
    getCartAmount,
    url,
    token,
    currency,
    theme,
    delivery_fee,
  } = useContext(ShopContext);
  const [method, setMethod] = useState("stripe");
  const [data, setData] = useState([]);
  const [address, setAddress] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipcode: "",
    country: "",
    phone: "",
  });
  const navigate = useNavigate();

  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setAddress((data) => ({ ...data, [name]: value }));
  };

  const placeOrder = async (e) => {
    e.preventDefault();

    let orderData = {
      address: address,
      items: data,
      amount: getCartAmount() + delivery_fee,
    };
    let response = await axios.post(url + "/api/order/place", orderData, {
      headers: { token },
    });
    if (response.data.success) {
      const { session_url } = response.data;
      window.location.replace(session_url);
    } else {
      alert("Error");
    }
  };

  useEffect(() => {
    let orderItems = [];
    products.map((item) => {
      if (cartItems[item._id]) {
        sizes.map((size) => {
          if (cartItems[item._id][size] > 0) {
            let itemInfo = { ...item };
            itemInfo["quantity"] = cartItems[item._id][size];
            itemInfo["size"] = size;
            orderItems.push(itemInfo);
          }
        });
      }
    });
    setData(orderItems);
  }, [products, cartItems]);

  useEffect(() => {
    if (!token) {
      toast.error("Vui lòng đăng nhập để có thể tiến hành thanh toán!");
      navigate("/cart");
    } else if (getCartAmount() === 0) {
      navigate("/cart");
    }
  }, [token]);

  return (
    <form
      onSubmit={placeOrder}
      className="flex flex-col sm:flex-row gap-4 lg:gap-10 pt-20 min-h-[80vh] border-t px-4 md:px-16 lg:px-24 py-10"
    >
      {/* Left Side */}
      <div
        style={
          theme === "light"
            ? {
                background: "linear-gradient(267.18deg, #f6f7f8a3, #f6f7f8d9)",
              }
            : { background: "linear-gradient(267.18deg, #131313, #080808)" }
        }
        className="flex flex-col gap-4 w-full sm:max-w-[480px] p-4 rounded-lg spin-button"
      >
        <div className="text-xl sm:text-2xl my-3">
          <Title text1={"THÔNG TIN"} text2={"GIAO HÀNG"} />
        </div>
        <div className="flex gap-3">
          <div className="w-full">
            <p className="mb-3 text-sm">Tên</p>
            <input
              type="text"
              name="firstName"
              value={address.firstName}
              onChange={onChangeHandler}
              required
              className="border-[#999696] bg-inherit rounded-xl py-1.5 px-3.5 w-full"
            />
          </div>
          <div className="w-full">
            <p className="mb-3 text-sm">Họ</p>
            <input
              type="text"
              name="lastName"
              value={address.lastName}
              onChange={onChangeHandler}
              required
              className="border-[#999696] bg-inherit rounded-xl py-1.5 px-3.5 w-full"
            />
          </div>
        </div>
        <div>
          <p className="mb-3 text-sm">Địa chỉ Email</p>
          <input
            type="email"
            name="email"
            value={address.email}
            onChange={onChangeHandler}
            required
            className="border-[#999696] bg-inherit rounded-xl py-1.5 px-3.5 w-full"
          />
        </div>

        <div className="flex gap-3">
          <div className="w-full">
            <p className="mb-3 text-sm">Thành phố</p>
            <input
              type="text"
              name="city"
              value={address.city}
              onChange={onChangeHandler}
              required
              className="border-[#999696] bg-inherit rounded-xl py-1.5 px-3.5 w-full"
            />
          </div>
          <div className="w-full">
            <p className="mb-3 text-sm">Tỉnh</p>
            <input
              type="text"
              name="state"
              value={address.state}
              onChange={onChangeHandler}
              required
              className="border-[#999696] bg-inherit rounded-xl py-1.5 px-3.5 w-full"
            />
          </div>
        </div>
        <div>
          <p className="mb-3 text-sm">Đường</p>
          <input
            type="text"
            name="street"
            value={address.street}
            onChange={onChangeHandler}
            required
            className="border-[#999696] bg-inherit rounded-xl py-1.5 px-3.5 w-full"
          />
        </div>
        <div className="flex gap-3">
          <div className="w-full">
            <p className="mb-3 text-sm">Mã bưu điện</p>
            <input
              type="number"
              name="zipcode"
              value={address.zipcode}
              onChange={onChangeHandler}
              required
              className="border-[#999696] bg-inherit rounded-xl py-1.5 px-3.5 w-full"
            />
          </div>
          <div className="w-full">
            <p className="mb-3 text-sm">Quốc gia</p>
            <input
              type="text"
              name="country"
              value={address.country}
              onChange={onChangeHandler}
              required
              className="border-[#999696] bg-inherit rounded-xl py-1.5 px-3.5 w-full"
            />
          </div>
        </div>
        <div>
          <p className="mb-3 text-sm">Số điện thoại</p>
          <input
            type="number"
            name="phone"
            value={address.phone}
            onChange={onChangeHandler}
            required
            className="border-[#999696] bg-inherit rounded-xl py-1.5 px-3.5 w-full"
            style={{
              WebkitAppearance: "none",
              MozAppearance: "textfield",
            }}
          />
        </div>
      </div>
      {/* Right Side */}
      <div className="mt-8 w-full">
        <div className="w-full rounded-xl">
          <div className="text-2xl">
            <Title text1={"TÓM TẮT"} text2={"GIỎ HÀNG"} />
          </div>
          <div className="w-full">
            {data
              ? data.map((item, index) => (
                  <div key={index} className="w-full flex gap-4 my-4">
                    <img
                      className="w-20 sm:w-16 rounded-md"
                      src={`${url}/images/` + item.image[0]}
                      alt=""
                    />
                    <div className="text-base sm:text-sm">
                      <p>{item.name}</p>
                      <div className="flex items-center my-1">
                        <p className="px-2 sm:px-3 sm:py-1 border border-[#999696] rounded-md mr-2">
                          {item.size}
                        </p>
                        <p className="text-[#999696]">
                          Số lượng: {item.quantity}
                        </p>
                      </div>
                      <p className="text-orange-600 font-medium">
                        {item.price.toLocaleString()}
                        {currency}
                      </p>
                    </div>
                  </div>
                ))
              : null}
          </div>
        </div>
        <div className="mt-8 min-w-80">
          <CartTotal />
        </div>
        <div className="mt-12">
          <div className="text-2xl">
            <Title text1={"PHƯƠNG THỨC"} text2={"THANH TOÁN"} />
          </div>
          {/* Payment Method Selection */}
          <div className="flex gap-3 flex-col lg:flex-row">
            <div
              onClick={() => setMethod("stripe")}
              className="flex items-center gap-3 border p-2 px-3 cursor-pointer bg-gray-800 rounded-lg border-none"
            >
              <p
                className={`min-w-3.5 h-3.5 border rounded-full ${
                  method === "stripe" ? "bg-[#FF4A17]" : ""
                }`}
              ></p>
              <img className="h-5 mx-4" src={assets.stripe_logo} alt="" />
            </div>
          </div>
          <div className="w-full text-end mt-8">
            <button
              type="submit"
              // onClick={placeOrder}
              className="bg-black text-white px-16 py-3 text-sm active:bg-[#444]"
            >
              ĐẶT HÀNG
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default PlaceOrder;
