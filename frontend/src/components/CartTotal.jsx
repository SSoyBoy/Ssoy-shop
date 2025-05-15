import { useContext } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "./Title";

const CartTotal = () => {
  const { currency, delivery_fee, getCartAmount } = useContext(ShopContext);
  return (
    <div className="w-full">
      <div className="text-2xl">
        <Title text1={"TỔNG GIÁ TRỊ"} text2={"GIỎ HÀNG"} />
      </div>
      <div className="flex flex-col gap-2 mt-2 text-sm font-medium">
        <div className="flex justify-between">
          <p>Tổng Cộng</p>
          <p className="text-[#fa580c]">
            {getCartAmount().toLocaleString()}
            {currency}
          </p>
        </div>
        <div className="flex justify-between pb-2 border-b border-[#999696]">
          <p>Phí Vận Chuyển</p>
          <p className="text-[#fa580c]">
            {delivery_fee.toLocaleString()}
            {currency}
          </p>
        </div>
        <div className="flex justify-between">
          <b>Tổng Cộng</b>
          <b className="text-[#fa580c]">
            {getCartAmount() === 0
              ? 0
              : (getCartAmount() + delivery_fee).toLocaleString()}
            {currency}
          </b>
        </div>
      </div>
    </div>
  );
};

export default CartTotal;
