import { useContext, useMemo } from "react";
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
  error,
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

  // Nếu có lỗi, thêm class border đỏ
  const errorClass = error ? "border-red-500" : "";

  return (
    <div className="w-full">
      <p className="mb-1 text-sm">{label}</p>
      {isSelect ? (
        <select
          name={name}
          value={JSON.stringify(value)}
          onChange={onChange}
          required={required}
          className={`${inputClass} ${errorClass} ${
            options.length === 0 ? "cursor-not-allowed" : "cursor-pointer"
          }`}
          disabled={options.length === 0}
        >
          <option value={JSON.stringify({ code: "", name: "" })} disabled>
            Chọn {label.toLowerCase()}
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
          className={`${inputClass} ${errorClass}`}
          placeholder={`Nhập ${label.toLowerCase()} của bạn`}
        />
      )}
      {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
    </div>
  );
};

export default Input;
