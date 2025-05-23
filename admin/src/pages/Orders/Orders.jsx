import React, { useEffect, useState } from "react";
import "./Orders.css";
import { assets, url } from "../../assets/assets";
import axios from "axios";
import { toast } from "react-toastify";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const fetchAllOrders = async () => {
    const response = await axios.get(url + "/api/order/list");
    if (response.data.success) {
      setOrders(response.data.data);
    } else {
      toast.error("Error");
    }
  };
  const statusHandler = async (event, orderId) => {
    const response = await axios.post(url + "/api/order/status", {
      orderId,
      status: event.target.value,
    });
    if (response.data.success) {
      await fetchAllOrders();
    }
  };
  const convertDate = (date) => {
    const dateConvert = new Date(date);
    const formattedDate = dateConvert.toLocaleDateString("vi-VN");
    return formattedDate;
  };
  useEffect(() => {
    fetchAllOrders();
  }, []);

  return (
    <div className="order add">
      <h3>Order Page</h3>
      <div className="order-list">
        {orders.map((order, index) => {
          return (
            <div key={index} className="order-item">
              <img src={assets.parcel_icon} alt="" />
              <div>
                <p className="order-item-food">
                  {order.items.map((item, index) => {
                    if (index === order.items.length - 1) {
                      return (
                        item?.name +
                        ` (Size: ${item.size})` +
                        " x " +
                        item?.quantity
                      );
                    } else {
                      return (
                        item?.name +
                        ` (Size: ${item.size})` +
                        " x " +
                        item?.quantity +
                        ", "
                      );
                    }
                  })}
                </p>
                <p>
                  <b>Date: </b> {convertDate(order.date)}
                </p>
                <p className="order-item-name">
                  <p>
                    <b>Name: </b>
                    {order.address.firstName + " " + order.address.lastName}
                  </p>
                </p>
                <div className="order-item-address">
                  <h3>Address</h3>
                  <p>Street: {order.address.street + ","}</p>
                  <p>
                    {order.address.city +
                      ", " +
                      order.address.state +
                      ", " +
                      order.address.country +
                      ", " +
                      order.address.zipcode}
                  </p>
                </div>
                <p className="order-item-phone">
                  <b>Phone number: </b>
                  {order.address.phone}
                </p>
              </div>
              <p>
                <b>Items: </b> {order.items.length}
              </p>
              <p style={{ color: "red" }}>${order.amount.toLocaleString()}</p>
              <select
                onChange={(event) => statusHandler(event, order._id)}
                value={order.status}
              >
                <option value="Food Processing">Food Processing</option>
                <option value="Out for delivery">Out for delivery</option>
                <option value="Delivered">Delivered</option>
              </select>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Orders;
