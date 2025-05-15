import { useContext } from "react";
import { ShopContext } from "../context/ShopContext";

const Title = ({ text1, text2 }) => {
  const { theme } = useContext(ShopContext);

  return (
    <div className="inline-flex gap-2 items-center mb-3">
      <p className={theme === "light" ? `text-black` : `text-[#999696]`}>
        {text1}{" "}
        <span
          className={` font-medium ${
            theme === "light" ? "text-black" : "text-white"
          }`}
        >
          {text2}
        </span>
      </p>
      <p className="w-8 sm:w-12 h-[1px] sm:h-[2px] bg-gray-500"></p>
    </div>
  );
};

export default Title;
