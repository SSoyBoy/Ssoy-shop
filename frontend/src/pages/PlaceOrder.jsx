import React, { useContext, useEffect, useState } from "react";
import Title from "../components/Title";
import CartTotal from "../components/CartTotal";
import { assets } from "../assets/assets";
import { ShopContext } from "../context/ShopContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import OrderSuccess from "../components/OrderSuccess";

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
    listAddress,
    fetchAddress,
    setCartItems,
  } = useContext(ShopContext);
  const [method, setMethod] = useState("stripe");
  const [data, setData] = useState([]);
  const [selected, setSelected] = useState(null);
  const [address, setAddress] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    province: {},
    district: {},
    ward: {},
    zipcode: "",
    phone: "",
  });
  const [orderSuccess, setOrderSuccess] = useState(false);
  const navigate = useNavigate();

  const handlerSelect = (address) => {
    setSelected(address._id);
    setAddress({
      firstName: address.firstName,
      lastName: address.lastName,
      email: address.email,
      street: address.street,
      province: address.province,
      district: address.district,
      ward: address.ward,
      zipcode: address.zipcode,
      phone: address.phoneNumber,
    });
  };

  const placeOrder = async () => {
    let orderData = {
      address: address,
      items: data,
      amount: getCartAmount() + delivery_fee,
      paymentMethod: method,
    };
    let response = await axios.post(url + "/api/order/place", orderData, {
      headers: { token },
    });
    if (response.data.success) {
      if (method === "stripe") {
        const { session_url } = response.data;
        window.location.replace(session_url);
      } else if (method === "cash") {
        setOrderSuccess(true);
        setCartItems({});
        toast.success(response.data.message);
      }
    } else {
      setOrderSuccess(false);
      toast.error("Error");
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
    if (orderSuccess) {
      setTimeout(() => {
        navigate("/account/orders");
      }, [3000]);
    }
  }, [orderSuccess]);

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (!storedToken) {
      toast.error("Vui lòng đăng nhập để có thể tiến hành thanh toán!");
      navigate("/cart");
    } else {
      fetchAddress();
    }
  }, []);

  if (orderSuccess) {
    return <OrderSuccess />;
  }

  return (
    <div className="flex flex-col sm:flex-row gap-4 lg:gap-10 pt-20 min-h-[80vh] border-t px-4 md:px-16 lg:px-24 py-10">
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
        <div className="text-xl sm:text-2xl mt-3">
          <Title text1={"THÔNG TIN"} text2={"GIAO HÀNG"} />
          <p className="text-base">
            Hoàn tất đơn hàng của bạn bằng cách chọn địa chỉ bên dưới
          </p>
        </div>

        <div className="flex flex-col gap-2">
          {listAddress.length > 0
            ? listAddress.map((item) => (
                <div
                  className={`border rounded-sm flex flex-col w-full p-6 ${
                    selected === item._id ? "border-orange-600" : ""
                  }`}
                  key={item._id}
                >
                  <div className="flex-1">
                    <p>
                      Họ và tên :{" "}
                      <span className="font-medium">
                        {item.lastName + " " + item.firstName}
                      </span>
                    </p>
                    <p>
                      Email : <span className="font-medium">{item.email}</span>
                    </p>
                    <p>
                      Tỉnh/Thành phố :{" "}
                      <span className="font-medium">{item.province?.name}</span>
                    </p>
                    <p>
                      Quận/Thị trấn :{" "}
                      <span className="font-medium">{item.district?.name}</span>
                    </p>
                    <p>
                      Phường :{" "}
                      <span className="font-medium">{item.ward?.name}</span>
                    </p>
                    <p>
                      Địa chỉ :{" "}
                      <span className="font-medium">{item.street}</span>
                    </p>
                    <p>
                      Mã bưu điện :{" "}
                      <span className="font-medium">{item.zipcode}</span>
                    </p>
                    <p>
                      Số điện thoại :{" "}
                      <span className="font-medium">{item.phoneNumber}</span>
                    </p>
                  </div>
                  <div className="mt-5">
                    <button
                      onClick={() => handlerSelect(item)}
                      className="mr-5 inline-block bg-black hover:bg-gray-600 text-white px-5 py-3 text-xs font-medium uppercase tracking-wide"
                    >
                      {selected === item._id
                        ? "Đã chon địa chỉ"
                        : "chọn địa chỉ"}
                    </button>
                  </div>
                </div>
              ))
            : "Không tìm thấy địa chỉ! Vui lòng thêm địa chỉ mới bên dưới"}
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
              className="flex items-center gap-3 p-2 px-3 cursor-pointer rounded-lg"
            >
              <div className="flex p-1 border border-[#FF4A17] rounded-full">
                <p
                  className={`min-w-2 h-2 rounded-full ${
                    method === "stripe" ? "bg-[#FF4A17]" : ""
                  }`}
                ></p>
              </div>
              {/* <img className="h-5 mx-4" src={assets.stripe_logo} alt="" /> */}
              <span
                className={`font-medium transition-all duration-300 hover:text-orange-600 ${
                  method === "stripe" && "text-orange-600"
                }`}
              >
                Chuyển khoản ngân hàng
              </span>
            </div>
            <div
              onClick={() => setMethod("cash")}
              className="flex items-center gap-3 p-2 px-3 cursor-pointer rounded-lg"
            >
              <div className="flex p-1 border border-[#FF4A17] rounded-full">
                <p
                  className={`min-w-2 h-2 rounded-full ${
                    method === "cash" ? "bg-[#FF4A17]" : ""
                  }`}
                ></p>
              </div>
              <span
                className={`font-medium transition-all duration-300 hover:text-orange-600 ${
                  method === "cash" && "text-orange-600"
                }`}
              >
                Tiền mặt khi giao hàng
              </span>
            </div>
          </div>
          <div className="w-full text-end mt-8">
            <button
              disabled={(data && data.length === 0) || selected === null}
              onClick={placeOrder}
              className="disabled:opacity-50 disabled:cursor-not-allowed bg-black text-white px-16 py-3 text-sm"
            >
              ĐẶT HÀNG
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlaceOrder;
