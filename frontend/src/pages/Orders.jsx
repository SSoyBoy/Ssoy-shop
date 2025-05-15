import { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
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

    setData(response.data.data?.reverse());
  };

  useEffect(() => {
    if (token) {
      fetchOrders();
    }
  }, [token]);

  return (
    <div className="border-t w-full">
      <h1 className="text-2xl font-medium">Tất cả đơn hàng:</h1>
      <div>
        <div className="w-full flex flex-col gap-6">
          {data && data.length > 0 ? (
            data?.map((order, index) => (
              <div
                key={index}
                className={`p-4 rounded-sm ${
                  theme === "dark" ? "bg-[#1a1a1a]" : "bg-gray-50"
                }`}
              >
                <div className="flex items-center mb-2">
                  {/* <IoMdArrowDropdown className="w-5 h-5 mr-2" /> */}
                  <p className="font-normal">
                    Ngày:{" "}
                    <span
                      className={
                        theme === "light" ? "text-[#444]" : "text-[#999696]"
                      }
                    >
                      {convertTimestamp(order?.date)}
                    </span>
                  </p>
                </div>
                <div className="flex flex-col gap-2">
                  <div className="grid grid-cols-1 sm:grid-cols-2 p-5 border rounded-sm">
                    <p>
                      Họ và tên:{" "}
                      <span className="font-medium">
                        {order?.address?.firstName +
                          " " +
                          order?.address?.lastName}
                      </span>
                    </p>
                    <p>
                      Email:
                      <span className="font-medium ml-1">
                        {order?.address?.email}
                      </span>
                    </p>
                    <p>
                      Số điện thoạt:
                      <span className="font-medium ml-1">
                        {order?.address?.phone}
                      </span>
                    </p>
                    <p>
                      Địa chỉ:{" "}
                      <span className="font-medium ml-1">
                        {order?.address?.street}
                      </span>
                    </p>
                  </div>
                  <div>
                    {order?.items?.map((item, index) => (
                      <div
                        key={index}
                        className="py-4 border-t border-b flex flex-col md:flex-row md:items-center md:justify-between gap-4"
                      >
                        <div className="flex items-start gap-6 text-sm">
                          <img
                            className="w-16 sm:w-20 rounded-md"
                            src={`${url}/images/` + item.image[0]}
                            alt=""
                          />
                          <div>
                            <p className="sm:text-base font-medium">
                              {item.name}
                            </p>
                            <div className="flex items-center gap-3 mt-2 text-base">
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
                          </div>
                        </div>
                        <div className="md:w-1/2 flex justify-center">
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
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="w-full flex flex-col md:flex-row md:justify-between gap-3">
                    <div className="flex items-center">
                      <p>Tổng giá:</p>
                      <p className="text-lg text-[#fa580c] font-medium ml-2">
                        {order?.amount.toLocaleString()} {currency}
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
    </div>
  );
};

export default Orders;
