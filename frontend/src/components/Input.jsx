import React, { useContext, useMemo } from "react";
import { ShopContext } from "../context/ShopContext";

const Input = ({
  label,
  type = "text",
  name,
  value,
  onChange,
  options = [],
  required = false,
  isSelect = false,
}) => {
  const { theme } = useContext(ShopContext);

  const inputClass = useMemo(
    () =>
      `focus:bg-inherit rounded-md py-1.5 px-3.5 w-full border ${
        theme === "dark"
          ? "border-[#4d4d4d] bg-[#2a2a2a]"
          : "border-[#ebebeb] bg-[#fafafa]"
      }`,
    [theme]
  );

  return (
    <div className="w-full">
      <p className="mb-3 text-sm">{label}</p>
      {isSelect ? (
        <select
          name={name}
          value={JSON.stringify(value)}
          onChange={onChange}
          required={required}
          className={`${inputClass} ${
            options.length === 0 ? "cursor-not-allowed" : "cursor-pointer"
          }`}
          disabled={options.length === 0 ? true : false}
        >
          <option value="" disabled hidden>
            {`Chọn ${label.toLowerCase()}`}
          </option>
          {options.map((option, index) => (
            <option
              key={index}
              className="text-black"
              value={JSON.stringify({ code: option.code, name: option.name })}
            >
              {option.name}
            </option>
          ))}
        </select>
      ) : (
        <input
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          required={required}
          className={inputClass}
          placeholder={`Nhập ${label.toLowerCase()} của bạn`}
        />
      )}
    </div>
  );
};

export default Input;
