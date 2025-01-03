import React, { useContext, useEffect, useRef, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "./Title";
import ProductItem from "./ProductItem";
import { FaArrowRightLong } from "react-icons/fa6";

const Slider = () => {
  const { products, url } = useContext(ShopContext);
  const [counter, setCounter] = useState(0);
  const [size, setSize] = useState(null);
  const [mouseDownAt, setMouseDownAt] = useState(0);
  const [mouseUpAt, setMouseUpAt] = useState(0);
  const [mouse, setMouse] = useState(0);

  const [slider, setSlider] = useState([]);

  const slideRef = useRef(null);

  useEffect(() => {
    if (slideRef.current && slideRef.current.children.length > 0) {
      setSize(slideRef.current.children[0].offsetParent.clientWidth);
    }
    const slide = slideRef.current;
    if (!slide) return;

    const handleTransitionEnd = () => {
      const totalSlides = slider.length - 4;
      if (counter >= totalSlides) {
        slide.style.transition = "none";
        setCounter(0);
        slide.style.transform = `translateX(0px)`;
      }
      if (counter < 0) {
        slide.style.transition = "none";
        setCounter(totalSlides);
        slide.style.transform = `translateX(${-size * totalSlides}px)`;
      }
    };

    slide.addEventListener("transitionend", handleTransitionEnd);

    return () => {
      slide.removeEventListener("transitionend", handleTransitionEnd);
    };
  }, [counter, size, products]);

  const nextSlide = () => {
    if (counter > slider.length - 4) return;
    slideRef.current.style.transition = "transform 0.3s ease-in-out";
    setCounter(counter + 1);
  };

  const prevSlide = () => {
    if (counter <= -1) return;
    slideRef.current.style.transition = "transform 0.3s ease-in-out";
    setCounter(counter - 1);
  };

  const handleOnDown = (e) => setMouseDownAt(e.clientX);

  const handleOnUp = (e) => {
    setMouseUpAt(e.clientX);
    if (mouseDownAt - e.clientX > size / 2) {
      nextSlide();
    } else if (e.clientX - mouseDownAt > size / 2) {
      prevSlide();
    }
    setMouseDownAt(0);
    setMouseUpAt(0);
  };

  const handleOnMove = () => {
    const space = mouseDownAt - mouseUpAt;
    // console.log("space", space);
  };

  useEffect(() => {
    if (products) {
      setSlider(products.slice(0, 10));
    }
  }, [products]);

  return (
    <>
      <div className="w-full flex flex-col sm:flex-row px-[6%] py-5">
        <div className="block sm:hidden text-center py-8 text-xl md:text-2xl lg:text-3xl z-10 relative">
          <Title text1={"LATEST"} text2={"COLLECTION"} />
          <p className="w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-300">
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the.
          </p>
        </div>
        <div className="hidden sm:block w-1/4 pt-10 mr-2 lg:mr-4">
          <h1 className="text-xl md:text-2xl lg:text-3xl font-medium mb-1">
            New
          </h1>
          <div className="w-full bg-[#D7CCC8] p-1 text-xl md:text-2xl lg:text-3xl font-medium">
            Arrivals
          </div>
          <p className="mt-2 text-base lg:text-xl">
            Khám phá những mẫu sản phẩm mới nhất, cập nhật xu hướng thời trang
            và phong cách hiện đại.
          </p>
        </div>
        <div className="w-full sm:w-3/4 relative sm:pt-8">
          <div className="select-none m-auto overflow-hidden">
            <div
              className="flex w-1/2 md:w-1/3 lg:w-1/4"
              ref={slideRef}
              style={{ transform: `translateX(${-size * counter}px)` }}
              onMouseDown={handleOnDown}
              onMouseUp={handleOnUp}
              // onMouseMove={handleOnMove}
            >
              {slider.map((item, index) => {
                return (
                  <div
                    key={index}
                    className={`min-w-full px-2 cursor-e-resize`}
                  >
                    <ProductItem
                      key={index}
                      index={index}
                      id={item._id}
                      name={item.name}
                      image={item.image}
                      price={item.price}
                      outOfStock={item.outOfStock}
                    />
                  </div>
                );
              })}
            </div>
          </div>
          <button
            className="absolute left-0 top-[45%] text-2xl select-none text-black px-2 rounded-sm transition-all duration-200 hover:text-white hover:bg-black"
            onClick={prevSlide}
          >
            <FaArrowRightLong className="w-6 rotate-180" />
          </button>
          <button
            className="absolute right-0 top-[45%] text-2xl select-none text-black px-2 rounded-sm transition-all duration-200 hover:text-white hover:bg-black"
            onClick={nextSlide}
          >
            <FaArrowRightLong className="w-6" />
          </button>
        </div>
      </div>
    </>
  );
};
export default Slider;
