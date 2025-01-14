import React, { useContext, useEffect, useState } from "react";
import Title from "../components/Title";
import { ShopContext } from "../context/ShopContext";
import { useNavigate } from "react-router-dom";
import {
  assets,
  FaEyeSlash,
  FaArrowRightLong,
  IoEyeSharp,
  IoCameraReverseOutline,
} from "../assets/assets";
import axios from "axios";
import { toast } from "react-toastify";

const Profile = () => {
  const { user, url, token, getUserData, theme, logout } =
    useContext(ShopContext);
  const [formData, setFormData] = useState({
    name: "",
    image: "",
    password: "",
    newPass: "",
    confirmPass: "",
  });

  const [currentState, setCurrentState] = useState("profile");
  const [isShowPass, setIsShowPass] = useState({
    newPass: false,
    confirmPass: false,
  });

  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      setFormData((prev) => ({ ...prev, name: user.name }));
    }
  }, [user]);

  const handleEdit = async () => {
    try {
      const formDataObj = new FormData();
      formDataObj.append("name", formData.name);
      formDataObj.append("image", formData.image);

      const { data } = await axios.put(
        `${url}/api/user/edituser`,
        formDataObj,
        {
          headers: { token },
        }
      );

      if (data.success) {
        toast.success("Chỉnh sửa thành công");
        setFormData((prev) => ({ ...prev, name: "", image: "" }));
        getUserData(token);
      } else {
        toast.error("Lỗi khi chỉnh sửa");
      }
    } catch (error) {
      toast.error("An error occurred");
    }
  };

  const handleChangePass = async () => {
    const { password, newPass, confirmPass } = formData;

    if (newPass !== confirmPass) {
      toast.error("Mật khẩu không khớp");
      return;
    }

    try {
      const { data } = await axios.post(
        `${url}/api/user/changepassword`,
        { password, newPass },
        { headers: { token } }
      );

      if (data.success) {
        toast.success(data.message);
        setFormData((prev) => ({
          ...prev,
          password: "",
          newPass: "",
          confirmPass: "",
        }));
        logout();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("An error occurred");
    }
  };

  const renderInput = (
    label,
    value,
    type,
    onChange,
    placeholder = "",
    isPassword = false
  ) => (
    <div className="w-full flex flex-col gap-2">
      <p>{label}</p>
      <div className="relative flex items-center w-full">
        <input
          name={name || ""}
          type={isPassword && !isShowPass[type] ? "password" : "text"}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={`focus:bg-inherit rounded-md py-1.5 px-3.5 w-full ${
            theme === "dark"
              ? "border-[#4d4d4d] bg-[#2a2a2a] text-white"
              : "border-[#ebebeb] bg-[#fafafa] text-black"
          }`}
          placeholder={placeholder}
          required
          autoComplete="new-password"
        />
        {isPassword && (
          <>
            {isShowPass[type] ? (
              <FaEyeSlash
                onClick={() =>
                  setIsShowPass((prev) => ({ ...prev, [type]: false }))
                }
                className="absolute w-5 h-5 right-2 cursor-pointer select-none"
              />
            ) : (
              <IoEyeSharp
                onClick={() =>
                  setIsShowPass((prev) => ({ ...prev, [type]: true }))
                }
                className="absolute w-5 h-5 right-2 cursor-pointer select-none"
              />
            )}
          </>
        )}
      </div>
    </div>
  );

  return (
    <div className="">
      {/* <div className="text-xl">
        <Title text1="Thông tin" text2="cá nhân" />
      </div> */}
      {user ? (
        <div className="flex items-center justify-center">
          <div className="max-w-4xl flex flex-col sm:flex-row gap-4">
            <div className="w-full sm:w-1/4 rounded-md p-4">
              <label htmlFor="image" className="w-full relative cursor-pointer">
                <img
                  src={
                    formData.image instanceof File
                      ? URL.createObjectURL(formData.image)
                      : user.image
                      ? `${url}/images/${user.image}`
                      : assets.user_icon
                  }
                  alt=""
                  className="w-full rounded-lg"
                />
                <IoCameraReverseOutline className="absolute bg-[rgba(249,115,22,0.65)] cursor-pointer p-2 rounded-lg bottom-0 right-0 z-10 text-white w-12 h-12" />
              </label>
              <input
                type="file"
                id="image"
                hidden
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, image: e.target.files[0] }))
                }
                accept="image/*"
              />
              <p className="text-center mt-4 font-semibold">{user?.name}</p>
            </div>
            <div className="w-full md:w-3/4">
              <div className={`w-full shadow-md rounded-md p-4`}>
                <div className="flex gap-4">
                  {["Thông tin cá nhân", "Đổi mật khẩu"].map((text, index) => (
                    <h1
                      key={index}
                      onClick={() =>
                        setCurrentState(index === 0 ? "profile" : "changepass")
                      }
                      className={`text-base xl:text-xl font-medium mb-4 cursor-pointer select-none pb-2 ${
                        currentState ===
                        (index === 0 ? "profile" : "changepass")
                          ? "border-b-[3px] border-orange-600 text-orange-600"
                          : ""
                      }`}
                    >
                      {text}
                    </h1>
                  ))}
                </div>
                {currentState === "profile" ? (
                  <>
                    {renderInput(
                      "Họ và tên",
                      formData.name,
                      "text",
                      (value) =>
                        setFormData((prev) => ({ ...prev, name: value })),
                      "Nhập tên"
                    )}
                    <p>Email</p>
                    <input
                      type="text"
                      value={user.email}
                      disabled
                      className={`w-full p-2 border-none rounded-lg cursor-not-allowed ${
                        theme === "dark" ? "bg-[#2a2a2a]" : "bg-[#e0e0e0]"
                      }`}
                    />
                  </>
                ) : (
                  <form autoComplete="new-password">
                    {renderInput(
                      "Mật khẩu hiện tại",
                      formData.password,
                      "text",
                      (value) =>
                        setFormData((prev) => ({ ...prev, password: value })),
                      "Mật khẩu hiện tại"
                    )}
                    {renderInput(
                      "Mật khẩu mới",
                      formData.newPass,
                      "newPass",
                      (value) =>
                        setFormData((prev) => ({ ...prev, newPass: value })),
                      "Mật khẩu mới",
                      isShowPass
                    )}
                    {renderInput(
                      "Xác nhận mật khẩu",
                      formData.confirmPass,
                      "confirmPass",
                      (value) =>
                        setFormData((prev) => ({
                          ...prev,
                          confirmPass: value,
                        })),
                      "Xác nhận mật khẩu mới",
                      isShowPass
                    )}
                  </form>
                )}
              </div>
              <div className="flex justify-end">
                <button
                  className="px-3 py-2 rounded-sm border transition-all duration-300 border-[#ff4a17] text-[#ff4a17] hover:text-white hover:bg-[#ff4a17] uppercase font-normal mt-4"
                  onClick={
                    currentState === "profile" ? handleEdit : handleChangePass
                  }
                >
                  {currentState === "profile" ? "Chỉnh sửa" : "Đổi mật khẩu"}
                </button>
              </div>
            </div>
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

export default Profile;
