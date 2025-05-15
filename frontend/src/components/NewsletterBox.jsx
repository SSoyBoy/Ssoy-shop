import { useContext } from "react";
import { ShopContext } from "../context/ShopContext";

const NewsletterBox = () => {
  const { theme } = useContext(ShopContext);
  const onSubmitHandler = (e) => {
    e.preventDefault();
  };

  return (
    <div className="text-center px-4 py-20 lg:px-16 xl:px-24">
      <p className="text-2xl font-medium">Đăng ký ngay & giảm giá 20%</p>
      <p
        className={`mt-3 ${
          theme === "light" ? "text-[#444]" : "text-[#999696]"
        }`}
      >
        Đăng ký ngay để nhận ưu đãi đặc biệt! Giảm giá 20% cho đơn hàng đầu tiên
        khi bạn gia nhập cộng đồng của chúng tôi.
      </p>
      <form
        onSubmit={onSubmitHandler}
        className={`w-full sm:w-1/2 flex rounded-xl items-center gap-3 mx-auto my-6  py-2 px-3 ${
          theme === "light"
            ? "bg-white border border-black"
            : "bg-black border-none"
        }`}
      >
        <input
          className="w-full sm:flex-1 border-none outline-none bg-inherit"
          type="text"
          placeholder="Nhập email của bạn"
          required
        />
        <div className="relative group">
          <button
            type="submit"
            className="bg-[#ff4a17] rounded-xl font-semibold text-white text-xs px-10 py-4"
          >
            ĐẶT MUA
          </button>
          <div
            style={{ background: "rgba(0, 0, 0, 0.4)" }}
            className="absolute cursor-pointer rounded-xl w-0 top-0 bottom-0 transition-all duration-300 group-hover:w-full"
          ></div>
        </div>
      </form>
    </div>
  );
};

export default NewsletterBox;
