import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "../components/Title";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const statusMap = {
  "Food Processing": "Đang xử lý",
  Processing: "Đang xử lý",
  "Out for delivery": "Đang giao hàng",
  Delivered: "Đã giao hàng",
};

const Orders = () => {
  const { currency, url, token, convertTimestamp, theme } =
    useContext(ShopContext);
  const [data, setData] = useState([]);

  const navigate = useNavigate();

  const fetchOrders = async () => {
    const response = await axios.post(
      url + "/api/order/userorders",
      {},
      {
        headers: { token },
      }
    );

    setData(response.data.data);
  };

  useEffect(() => {
    if (token) {
      fetchOrders();
    }
  }, [token]);

  return (
    <div className="border-t pt-24 px-4 md:px-16 lg:px-24 min-h-[50vh] py-10">
      <div className="text-2xl">
        <Title text1={"TẤT CẢ"} text2={"ĐƠN HÀNG"} />
      </div>
      <div>
        {data && data.length > 0 ? (
          data.map((order, index) => (
            <div key={index}>
              {order.items.map((item, index) => {
                return (
                  <div
                    key={index}
                    className="py-4 border-t border-b border-gray-500 flex flex-col md:flex-row md:items-center md:justify-between gap-4"
                  >
                    <div className="flex items-start gap-6 text-sm">
                      <img
                        className="w-16 sm:w-20 rounded-md"
                        src={`${url}/images/` + item.image[0]}
                        alt=""
                      />
                      <div>
                        <p className="sm:text-base font-medium">{item.name}</p>
                        <div className="flex items-center gap-3 mt-2 text-base">
                          <p className="text-lg text-[#fa580c]">
                            {order?.amount.toLocaleString()} {currency}
                          </p>
                          <p
                            className={
                              theme === "light"
                                ? "text-[#444]"
                                : "text-[#999696]"
                            }
                          >
                            Số lượng: {item.quantity}
                          </p>
                          <p>Size: {item.size}</p>
                        </div>
                        <p className="mt-2">
                          Ngày:{" "}
                          <span
                            className={
                              theme === "light"
                                ? "text-[#444]"
                                : "text-[#999696]"
                            }
                          >
                            {convertTimestamp(order?.date)}
                          </span>
                        </p>
                      </div>
                    </div>
                    <div className="md:w-1/2 flex justify-between">
                      <div className="flex items-center gap-2">
                        <p
                          className={`min-w-2 h-2 rounded-full ${
                            order.status === "Food Processing" ||
                            order.status === "Processing"
                              ? "bg-red-500"
                              : order.status === "Out for delivery"
                              ? "bg-yellow-500"
                              : "bg-green-500"
                          }`}
                        ></p>
                        <p className="text-sm md:text-base">
                          {statusMap[order.status] ||
                            "Trạng thái không xác định"}
                        </p>
                      </div>
                      <button
                        onClick={fetchOrders}
                        className="border px-4 py-2 text-sm font-medium rounded-sm hover:text-white hover:border-[#fa580c] hover:bg-[#fa580c] transition-all"
                      >
                        Theo Dõi Đơn Hàng
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          ))
        ) : data.length === 0 ? (
          <div className="w-full text-center py-10">
            <h2 className="text-lg font-semibold">
              Bạn vẫn chưa có đơn hàng nào.
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
        ) : null}
      </div>
    </div>
  );
};

export default Orders;
