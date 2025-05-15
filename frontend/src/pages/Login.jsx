import { useContext, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import Loader from "../components/Loader";

const Login = () => {
  const { url, setToken } = useContext(ShopContext);
  const [currentState, setCurrentState] = useState("Login");
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const onChangeHandler = (event) => {
    const { name, value } = event.target;
    setData((data) => ({ ...data, [name]: value }));
  };

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    setIsLoading(true);

    let newUrl = url;
    if (currentState === "Login") {
      newUrl += "/api/user/login";
    } else {
      newUrl += "/api/user/register";
    }
    const response = await axios.post(newUrl, data);
    if (response.data.success) {
      setData({
        name: "",
        email: "",
        password: "",
      });
      setToken(response.data.token);
      localStorage.setItem("token", response.data.token);
      toast.success(response.data.message);
      setIsLoading(false);
      navigate("/");
    } else {
      toast.error(response.data.message);
      setIsLoading(false);
    }
  };

  const renderInput = (label, name, type = "text", value, placeholder) => (
    <div className="relative w-full">
      <label
        htmlFor={name}
        className="pt-0 pr-2 pb-0 pl-2 absolute -mt-3 ml-2 font-medium text-gray-600 bg-white"
      >
        {label}
      </label>
      <input
        id={name}
        type={type}
        name={name}
        value={value}
        onChange={onChangeHandler}
        className="border placeholder-gray-400 text-black focus:outline-none w-full p-4 text-base bg-white border-gray-300 rounded-md"
        placeholder={placeholder}
        required
      />
    </div>
  );

  return (
    <div className="min-h-screen flex items-center justify-center">
      <form
        onSubmit={onSubmitHandler}
        className="flex flex-col items-center w-[90%] md:max-w-xl gap-8 bg-white shadow-2xl p-6 sm:p-10 rounded-xl"
      >
        <div className="inline-flex items-center gap-2 mb-2 mt-10">
          <p className="prata-regular text-black text-3xl">{currentState}</p>
          <hr className="border-none h-[1.5px] w-8 bg-[#999696]" />
        </div>
        {currentState === "Sign Up" &&
          renderInput("Name", "name", "text", data.name, "Nhập tên của bạn")}
        {renderInput(
          "Email",
          "email",
          "email",
          data.email,
          "Nhập email của bạn"
        )}
        {renderInput(
          "Password",
          "password",
          "password",
          data.password,
          "Nhập mật khẩu"
        )}

        <div className="w-full flex justify-between text-sm mt-[-8px] text-[#999696]">
          <p className="cursor-pointer hover:text-orange-600">Quên mật khẩu?</p>
          <p
            onClick={() =>
              setCurrentState(currentState === "Login" ? "Sign Up" : "Login")
            }
            className="cursor-pointer hover:text-orange-600 underline"
          >
            {currentState === "Login" ? "Tạo tài khoản" : "Đăng nhập"}
          </p>
        </div>
        <button className="inline-flex w-full items-center justify-center bg-black px-6 py-4 text-lg text-white transition-all duration-200 ease-in-out focus:shadow font-medium uppercase tracking-wide">
          {isLoading ? (
            <Loader
              text={currentState === "Login" ? "Logging in" : "Loading"}
            />
          ) : (
            currentState
          )}
        </button>
      </form>
    </div>
  );
};

export default Login;
