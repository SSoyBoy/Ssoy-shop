import { useNavigate } from "react-router-dom";

const TopCategories = () => {
  const navigate = useNavigate();
  return (
    <div className="px-5 sm:px-[6%] py-20">
      <div className="w-full flex flex-col lg:flex-row gap-5">
        <div className="w-full lg:w-1/2 flex flex-col gap-5">
          <div className="hidden sm:block w-full py-10 lg:pb-28  mr-2 lg:mr-4">
            <h1 className="text-xl md:text-2xl lg:text-3xl font-medium mb-1">
              Top
            </h1>
            <div className="w-1/2 bg-[#D7CCC8] p-1 text-xl md:text-2xl lg:text-3xl font-medium">
              Categories
            </div>
          </div>
          <div className="bg-[#99CC00] flex p-2 sm:p-5 sm:py-7 mt-5 relative">
            <img
              className="w-1/2 md:w-1/3 lg:w-1/2 absolute bottom-0 left-0"
              src="https://static.vecteezy.com/system/resources/previews/036/746/544/non_2x/ai-generated-young-stylish-man-posing-isolated-on-transparent-background-free-png.png"
              alt=""
            />
            <div className="w-1/2"></div>
            <div className="w-1/2 flex flex-col items-center text-start justify-center p-2 sm:p-5 gap-2">
              <div className="w-full first-letter:text-start">
                <h1 className="font-semibold text-xl">Men Casual</h1>
                <p>24 items</p>
              </div>
              <button
                onClick={() =>
                  navigate("/collection", { state: { category: "Men" } })
                }
                className="rounded border border-black w-full py-2"
              >
                See detail
              </button>
            </div>
          </div>
          <div className="w-full flex flex-col sm:flex-row gap-5">
            <div className="w-full sm:w-1/2 flex bg-[#FFFF66] p-5">
              <img
                className="w-1/2"
                src="https://galle.vn/images/products/2024/large/fc-980v4sz9.webp"
                alt=""
              />
              <div className="w-1/2 flex flex-col items-center text-start justify-center p-5 gap-2">
                <div className="w-full first-letter:text-start">
                  <h1 className="font-semibold text-xl">Men Watch</h1>
                  <p>24 items</p>
                </div>
              </div>
            </div>
            <div className="w-full sm:w-1/2 flex bg-[#FF9999] p-5">
              <img
                className="w-1/2"
                src="https://png.pngtree.com/png-clipart/20240901/original/pngtree-sports-shoes-png-image_15910407.png"
                alt=""
              />
              <div className="w-1/2 flex flex-col items-center text-start justify-center p-5 gap-2">
                <div className="w-full first-letter:text-start">
                  <h1 className="font-semibold text-xl">Men Shoes</h1>
                  <p>24 items</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="w-full lg:w-1/2 flex flex-col gap-5">
          <div className="w-full flex sm:flex-row flex-col gap-5">
            <div className="w-full sm:w-1/2 flex bg-[#CCCC99] p-5">
              <div className="w-1/2 h-auto flex items-center justify-center">
                <img
                  className="w-full"
                  src="https://static.vecteezy.com/system/resources/thumbnails/048/093/551/small/high-quality-realistic-bag-isolated-on-transparent-background-for-mockup-free-png.png"
                  alt=""
                />
              </div>
              <div className="w-1/2 flex flex-col items-center text-start justify-center p-5 gap-2">
                <div className="w-full first-letter:text-start">
                  <h1 className="font-semibold text-xl">Women Bag</h1>
                  <p>24 items</p>
                </div>
              </div>
            </div>
            <div className="w-full sm:w-1/2 flex bg-[#CC9966] p-5">
              <img
                className="w-1/2"
                src="https://static.vecteezy.com/system/resources/previews/041/856/332/non_2x/ai-generated-women-shoes-isolated-on-transparent-background-free-png.png"
                alt=""
              />
              <div className="w-1/2 flex flex-col items-center text-start justify-center p-5 gap-2">
                <div className="w-full first-letter:text-start">
                  <h1 className="font-semibold text-xl">Women Shoes</h1>
                  <p>24 items</p>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-[#99FF33] flex p-2 sm:p-5 mt-5">
            <div className="w-1/2 relative">
              <img
                className="w-full absolute top-0 left-0 right-0"
                src="https://static.vecteezy.com/system/resources/previews/042/654/133/non_2x/ai-generated-focused-female-athlete-in-sports-gear-free-png.png"
                alt=""
              />
            </div>
            <div className="w-1/2 flex flex-col items-center text-start justify-center p-2 sm:p-5 gap-2">
              <div className="w-full first-letter:text-start">
                <h1 className="font-semibold text-xl">Women Sport</h1>
                <p>24 items</p>
              </div>
              <button
                onClick={() =>
                  navigate("/collection", { state: { category: "Women" } })
                }
                className="rounded border border-black w-full py-2"
              >
                See detail
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopCategories;
