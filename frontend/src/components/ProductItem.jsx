import { useContext, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import { Link } from "react-router-dom";

const ProductItem = ({
  index,
  id,
  image,
  name,
  price,
  outOfStock,
  bestseller,
}) => {
  const { currency, url } = useContext(ShopContext);
  const [imageLoaded, setImageLoaded] = useState({});
  const [isHovered, setIsHovered] = useState(false);

  const handleImageLoad = (index) => {
    setImageLoaded((prev) => ({ ...prev, [index]: true }));
  };

  return (
    <Link
      to={`/product/${id}`}
      className="w-full flex flex-col group rounded-lg cursor-pointer relative flex-1 pb-2.5"
      key={index}
    >
      <div className="flex overflow-hidden w-full relative rounded-tl-lg rounded-tr-lg flex-1">
        <img
          className={`w-full h-full sm:max-h-[350px] xl:min-h-[280px] transition-all group-hover:scale-105 object-cover ${
            imageLoaded[index]
              ? "opacity-100 blur-none"
              : "opacity-0 blur-md transition-all duration-500"
          }`}
          src={
            `${url}/images/` +
            (isHovered ? (image.length > 1 ? image[1] : image[0]) : image[0])
          }
          alt=""
          loading="lazy"
          onLoad={() => handleImageLoad(index)}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        />
        {outOfStock ? (
          <div className="absolute -top-1 right-1 border border-[#999696] border-t-black bg-red-600 text-white p-2 text-[10px]">
            Hết hàng
          </div>
        ) : null}
        {bestseller ? (
          <div className="absolute top-1 left-1 sm:top-2 sm:left-2 border border-[#999696] border-t-black bg-black rounded-sm text-white px-3 py-1 text-[10px]">
            SALE
          </div>
        ) : null}
      </div>
      <div className="flex flex-col gap-1 text-sm lg:text-base font-semibold">
        <p className="text-center truncate pt-1 px-1 hover:text-orange-600">
          {name}
        </p>
        <span className="text-orange-600 text-center truncate">
          {price.toLocaleString()} {currency}
        </span>
      </div>
    </Link>
  );
};

export default ProductItem;
