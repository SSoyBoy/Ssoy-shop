import React from "react";
import { useNavigate } from "react-router-dom";

const Background = ({ bg_image, title }) => {
  const navigate = useNavigate();
  return (
    <div
      style={{ backgroundImage: `url(${bg_image})` }}
      className={`h-[400px] pt-24 pb-12 lg:h-[450px] xl:h-[550px] w-full relative bg-fixed bg-center bg-no-repeat bg-cover flex items-center`}
    >
      <div className="w-full flex justify-center mx-auto px-2">
        <div>
          <h1 className="text-3xl md:text-5xl mb-4 md:mb-5 block font-bold text-white">
            {title}
          </h1>
          <ol className="flex text-sm justify-end items-center">
            <li
              onClick={() => navigate("/home")}
              className="text-[#999696] cursor-pointer hover:text-orange-600"
            >
              TRANG CHỬ
            </li>
            <li className="text-white flex pl-3 uppercase">
              <p className="pr-3">|</p>
              {title}
            </li>
          </ol>
        </div>
      </div>
    </div>
  );
};

export default Background;
