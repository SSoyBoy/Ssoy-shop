import React, { useContext } from "react";
import Title from "../components/Title";
import { assets } from "../assets/assets";
import NewsletterBox from "../components/NewsletterBox";
import Background from "../components/Background";
import { ShopContext } from "../context/ShopContext";

const Contact = () => {
  const { theme } = useContext(ShopContext);
  return (
    <div>
      <Background bg_image={assets.contact_hero_bg} title={"Liên Hệ"} />
      <div className="my-10 flex flex-col justify-center md:flex-row gap-10 mb-28 px-4 md:px-16 lg:px-24">
        <img
          className="w-full md:max-w-[450px] rounded-md"
          src={assets.service_2}
          alt=""
        />
        <div className="flex flex-col justify-center gap-6 items-start">
          <p className="font-semibold text-xl">Cửa Hàng Của Chúng Tôi</p>
          <p className={theme === "light" ? "text-[#444]" : "text-[#999696]"}>
            54709 Willms Station
            <br />
            Suite 350, Washington, USA
          </p>
          <p className={theme === "light" ? "text-[#444]" : "text-[#999696]"}>
            Tel: (415) 555-0132
            <br />
            Email: ssoy@admin.com
          </p>
          <p className="font-semibold text-xl">Careers at SSoy</p>
          <p className={theme === "light" ? "text-[#444]" : "text-[#999696]"}>
            Tìm hiểu thêm về các nhóm và việc làm của chúng tôi.
          </p>
          <button
            className={`border px-8 py-4 text-sm font-medium hover:text-white hover:border-[#fa580c] hover:bg-[#fa580c] transition-all duration-500 ${
              theme === "light" ? "border-black" : "border-white"
            }`}
          >
            Khám phá
          </button>
        </div>
      </div>
      <NewsletterBox />
    </div>
  );
};

export default Contact;
