import React, { useCallback, useContext, useEffect, useState } from "react";
import Title from "../components/Title";
import { FaArrowRightLong } from "../assets/assets";
import { ShopContext } from "../context/ShopContext";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Input from "../components/Input";
import { toast } from "react-toastify";
import Profile from "./Profile";
import Orders from "./Orders";
import NotFound from "./NotFound";

const Account = () => {
  const {
    logout,
    user,
    url,
    token,
    fetchProvinces,
    fetchDistricts,
    fetchWards,
    provinces,
    districts,
    wards,
    setDistricts,
    setWards,
    listAddress,
    fetchAddress,
    theme,
  } = useContext(ShopContext);
  // const [action, setAction] = useState("address");
  const [isShowForm, setIsShowForm] = useState(false);
  const [currentEditedAddressId, setCurrentEditedAddressId] = useState(null);

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
  const { action: urlAction } = useParams();
  const [action, setAction] = useState(urlAction || "profile");
  const navigate = useNavigate();

  const validActions = ["profile", "address", "orders"];
  if (!action || !validActions.includes(action)) {
    return <NotFound />;
  }

  const handleActionChange = (newAction) => {
    if (newAction === "logout") {
      logout();
      navigate("/");
    } else {
      setAction(newAction);
      navigate(`/account/${newAction}`);
    }
  };

  useEffect(() => {
    if (urlAction) {
      setAction(urlAction);
    }
  }, [urlAction]);

  const onChangeHandler = useCallback((e) => {
    const { name, value } = e.target;

    if (name === "province") {
      const provinece = JSON.parse(value);
      setAddress((data) => ({
        ...data,
        province: provinece,
        district: {},
        ward: {},
      }));
      setDistricts([]);
      setProvinceCode(provinece.code);
      setWards([]);
    } else if (name === "district") {
      const district = JSON.parse(value);
      setAddress((data) => ({
        ...data,
        district: district,
        ward: {},
      }));
      setWards([]);
      setDistrictCode(district.code);
    } else if (name === "ward") {
      const ward = JSON.parse(value);
      setAddress((data) => ({
        ...data,
        ward: ward,
      }));
    } else {
      setAddress((data) => ({ ...data, [name]: value }));
    }
  }, []);

  const handleAddOrUpdateAddress = async (e) => {
    e.preventDefault();

    try {
      const response =
        currentEditedAddressId !== null
          ? await axios.post(
              `${url}/api/address/editaddress`,
              { address, addressId: currentEditedAddressId },
              { headers: { token } }
            )
          : await axios.post(
              `${url}/api/address/add`,
              { address },
              { headers: { token } }
            );

      if (response.data.success) {
        setAddress({
          firstName: "",
          lastName: "",
          email: "",
          street: "",
          province: "",
          district: "",
          ward: "",
          zipcode: "",
          phone: "",
        });
        fetchAddress();
        setDistricts([]);
        setWards([]);
        setCurrentEditedAddressId(null);
        toast.success(response.data.message);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error("Error sending address", error);
      toast.error("Có lỗi xảy ra, vui lòng thử lại sau");
    }
  };

  const handleEditAddress = (item) => {
    setIsShowForm(true);
    setAddress({
      firstName: item.firstName,
      lastName: item.lastName,
      email: item.email,
      street: item.street,
      province: item.province,
      district: item.district,
      ward: item.ward,
      zipcode: item.zipcode,
      phone: item.phoneNumber,
    });
    setCurrentEditedAddressId(item._id);
  };

  const handleDelete = async (addressId) => {
    try {
      const response = await axios.post(`${url}/api/address/removeaddress`, {
        addressId,
      });
      if (response.data.success) {
        fetchAddress();
        toast.success("Xoá địa chỉ thành công");
      } else {
        toast.error("Lỗi khi thêm địa chỉ");
      }
    } catch (error) {
      console.error("Error remove", error);
      toast.error("Có lỗi xảy ra, vui lòng thử lại sau");
    }
  };

  useEffect(() => {
    fetchAddress();
  }, [token]);

  useEffect(() => {
    fetchProvinces();
  }, [fetchProvinces]);

  useEffect(() => {
    fetchDistricts(address.province.code);
  }, [address.province.code, fetchDistricts]);

  useEffect(() => {
    fetchWards(address.district.code);
  }, [address.district.code, fetchWards]);

  return (
    <div className="py-24 px-4 md:px-16 lg:px-24 min-h-[80vh]">
      <div className="text-xl mb-7">
        <Title text1="Tài khoản" text2="của tôi" />
      </div>
      {user ? (
        <div className="w-full flex flex-col md:flex-row px-1">
          {/* left */}
          <div className="w-full md:w-1/4 mb-5">
            <ul className="flex flex-col gap-2">
              {["profile", "orders", "address", "logout"].map((item) => (
                <li
                  key={item}
                  onClick={() => handleActionChange(item)}
                  className={`flex items-center hover:text-orange-600 cursor-pointer border-b pb-2 ${
                    action === item ? "text-orange-600" : ""
                  } ${theme === "dark" ? "border-[#4d4d4d]" : ""}`}
                >
                  {action === item && <FaArrowRightLong className="w-3 mr-1" />}
                  {item === "profile"
                    ? "Thông tin cá nhân"
                    : item === "orders"
                    ? "Đơn hàng"
                    : item === "address"
                    ? "Địa chỉ"
                    : "Đăng xuất"}
                </li>
              ))}
            </ul>
          </div>
          {/* right */}
          <div className="w-full md:w-3/4 flex justify-center mx-auto max-w-[900px]">
            {action === "address" ? (
              <div className="w-full">
                <h2 className="mb-4 border text-orange-500 border-orange-500 p-2">
                  Các địa chỉ sau sẽ được sử dụng làm mặc định trên trang thanh
                  toán!
                </h2>
                <h1 className="font-bold text-lg mb-4">Địa chỉ của bạn:</h1>
                <div
                  className={`w-full grid grid-cols-1 sm:grid-cols-2 gap-4 ${
                    theme === "dark" ? "text-gray-300 border-gray-300" : ""
                  }`}
                >
                  {listAddress.length > 0
                    ? listAddress.map((item) => (
                        <div
                          className="border flex flex-col w-full p-6"
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
                              Email :{" "}
                              <span className="font-medium">{item.email}</span>
                            </p>
                            <p>
                              Tỉnh/Thành phố :{" "}
                              <span className="font-medium">
                                {item.province?.name}
                              </span>
                            </p>
                            <p>
                              Quận/Thị trấn :{" "}
                              <span className="font-medium">
                                {item.district?.name}
                              </span>
                            </p>
                            <p>
                              Phường :{" "}
                              <span className="font-medium">
                                {item.ward?.name}
                              </span>
                            </p>
                            <p>
                              Địa chỉ :{" "}
                              <span className="font-medium">{item.street}</span>
                            </p>
                            <p>
                              Mã bưu điện :{" "}
                              <span className="font-medium">
                                {item.zipcode}
                              </span>
                            </p>
                            <p>
                              Số điện thoại :{" "}
                              <span className="font-medium">
                                {item.phoneNumber}
                              </span>
                            </p>
                          </div>
                          <div className="mt-5">
                            <button
                              onClick={() => handleEditAddress(item)}
                              className="mr-5 inline-block bg-black hover:bg-gray-600 text-white px-5 py-3 text-xs font-medium uppercase tracking-wide"
                            >
                              Chỉnh sửa
                            </button>
                            <button
                              onClick={() => handleDelete(item._id)}
                              className="inline-block bg-black hover:bg-gray-600 text-white px-5 py-3 text-xs font-medium uppercase tracking-wide"
                            >
                              Xoá
                            </button>
                          </div>
                        </div>
                      ))
                    : "Không tìm thấy địa chỉ! Vui lòng thêm địa chỉ mới bên dưới"}
                </div>
                <button
                  onClick={() => setIsShowForm(!isShowForm)}
                  className="p-2 border my-4 hover:text-[#ff4a17] hover:border-[#ff4a17] transition-all duration-300"
                >
                  {isShowForm ? "Ẩn form địa chỉ" : "Thêm địa chỉ"}
                </button>
                {isShowForm && (
                  <form
                    onSubmit={handleAddOrUpdateAddress}
                    className="w-full flex flex-col gap-4"
                  >
                    <div className="flex gap-3">
                      <Input
                        label="Tên"
                        name="firstName"
                        value={address.firstName}
                        onChange={onChangeHandler}
                        required={true}
                      />
                      <Input
                        label="Họ"
                        name="lastName"
                        value={address.lastName}
                        onChange={onChangeHandler}
                        required={true}
                      />
                    </div>
                    <Input
                      label="Địa chỉ Email"
                      name="email"
                      type="email"
                      value={address.email}
                      onChange={onChangeHandler}
                      required={true}
                    />
                    <div className="flex flex-wrap md:flex-nowrap gap-3">
                      <Input
                        label="Tỉnh/Thành phố"
                        name="province"
                        value={address.province}
                        onChange={onChangeHandler}
                        required={true}
                        isSelect
                        options={provinces}
                      />
                      <Input
                        label="Quận/Thị trấn"
                        name="district"
                        value={address.district}
                        onChange={onChangeHandler}
                        required={true}
                        isSelect
                        options={districts}
                      />
                      <Input
                        label="Phường"
                        name="ward"
                        value={address.ward}
                        onChange={onChangeHandler}
                        required={true}
                        isSelect
                        options={wards}
                      />
                    </div>
                    <Input
                      label="Địa chỉ"
                      name="street"
                      value={address.street}
                      onChange={onChangeHandler}
                      required={true}
                    />
                    <Input
                      label="Mã bưu điện"
                      name="zipcode"
                      type="number"
                      value={address.zipcode}
                      onChange={onChangeHandler}
                      required={true}
                    />
                    <Input
                      label="Số điện thoại"
                      name="phone"
                      type="text"
                      value={address.phone}
                      onChange={onChangeHandler}
                      required={true}
                    />
                    <button
                      type="submit"
                      className="px-3 py-2 rounded-sm border transition-all duration-300 border-[#ff4a17] text-[#ff4a17] hover:text-white hover:bg-[#ff4a17] uppercase font-normal mt-4"
                    >
                      {currentEditedAddressId
                        ? "Cập nhật địa chỉ"
                        : "Thêm địa chỉ"}
                    </button>
                  </form>
                )}
              </div>
            ) : action === "profile" ? (
              <Profile />
            ) : (
              <Orders />
            )}
          </div>
        </div>
      ) : (
        <div>
          <button
            onClick={() => navigate("/login")}
            className="flex items-center border-b hover:text-orange-600 hover:border-orange-600"
          >
            Login now
            <FaArrowRightLong className="w-6 ml-1" />
          </button>
        </div>
      )}
    </div>
  );
};

export default Account;
