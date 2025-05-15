import { useNavigate } from "react-router-dom";

const AllType = () => {
  const navigate = useNavigate();

  const handleClick = (type) => {
    navigate("/collection", { state: { type: type } });
  };

  return (
    <div className="px-[6%] py-20">
      {/* <div className="text-center py-8 text-xl md:text-2xl lg text-sm sm:text-base md:text-2xl:lg:text-3xl">
        <Title text1={"ALL"} text2={"TYPE"} />
      </div> */}
      <div className="flex gap-3 w-full">
        <div
          className="w-1/3 md:w-1/4 max-h-[500px] cursor-pointer relative group/bottom animate-scroll"
          onClick={() => handleClick("Topwear")}
        >
          <img
            className="rounded w-full h-full object-cover"
            src="https://img.bestdealplus.com/ae01/kf/S89f6e09cedb8406fb1eb4472bd8a672eG.jpg"
            alt=""
          />
          <div
            className="absolute top-0 left-0 right-0 bottom-0 group"
            style={{
              background:
                "linear-gradient(0deg,rgba(0,0,0,0.9),rgba(77,77,77,0))",
            }}
          ></div>
          <div className="absolute bottom-[10%] left-0 right-0 text-white text-center text-xs sm:text-base md:text-2xl lg:text-3xl">
            AUTUM SHOW
          </div>
          <div
            style={{ backgroundColor: "rgba(0, 0, 0, 0.4)" }}
            className="absolute top-0 bottom-0 w-0 overflow-hidden group-hover/bottom:w-full transition-all duration-500 ease-in-out flex items-center justify-center"
          >
            <p className="text-white opacity-0 text-sm md:text-xl font-semibold transition-all duration-300 group-hover/bottom:opacity-100">
              TOP
            </p>
          </div>
        </div>
        <div
          className="w-1/3 md:w-2/4 max-h-[500px] cursor-pointer relative group/top animate-scroll"
          onClick={() => handleClick("Winterwear")}
        >
          <img
            className="rounded w-full h-full object-cover"
            src="https://media.glamourmagazine.co.uk/photos/63beb40c0e89b79e0e1b9267/4:3/w_1920,h_1440,c_limit/WINTER%20DRESSES%20110123_SQ%20GettyImages-1443039681%20.jpg"
            alt=""
          />
          <div
            className="absolute top-0 left-0 right-0 bottom-0 group"
            style={{
              background:
                "linear-gradient(200deg,rgba(0,0,0,0.4),rgba(77,77,77,0))",
            }}
          ></div>
          <div className="absolute bottom-0 top-0 left-0 right-0 flex justify-end items-center text-white  text-xs sm:text-base md:text-2xl lg:text-3xl">
            <div className="text-end pr-2">
              <p>NEW TRENDING</p>
              <h1 className="underline font-semibold">2025</h1>
            </div>
          </div>
          <div
            style={{ backgroundColor: "rgba(0, 0, 0, 0.4)" }}
            className="absolute top-0 bottom-0 w-0 overflow-hidden group-hover/top:w-full transition-all duration-500 ease-in-out flex items-center justify-center"
          >
            <p className="text-white opacity-0 text-sm md:text-xl font-semibold transition-all duration-300  group-hover/top:opacity-100">
              WINTER
            </p>
          </div>
        </div>
        <div
          className="w-1/3 md:w-1/4 max-h-[500px] cursor-pointer relative group/winter animate-scroll"
          onClick={() => handleClick("Bottomwear")}
        >
          <img
            className="rounded w-full h-full object-cover"
            src="https://img.ltwebstatic.com/images3_pi/2024/07/08/be/17204085900ed6cb72a8268258793fa190153e29c3_thumbnail_750x999.webp"
            alt=""
          />
          <div
            className="absolute top-0 left-0 right-0 bottom-0 group"
            style={{
              background:
                "linear-gradient(0deg,rgba(0,0,0,0.9),rgba(77,77,77,0))",
            }}
          ></div>
          <div className="absolute bottom-[10%] left-0 right-0 text-white text-center text-xs sm:text-base md:text-2xl lg:text-3xl">
            <div>
              MAN
              <br />
              COLLECTION
            </div>
          </div>
          <div
            style={{ backgroundColor: "rgba(0, 0, 0, 0.4)" }}
            className="absolute top-0 bottom-0 w-0 overflow-hidden group-hover/winter:w-full transition-all duration-500 ease-in-out flex items-center justify-center"
          >
            <p className="text-white opacity-0 text-sm md:text-xl font-semibold transition-all duration-300  group-hover/winter:opacity-100">
              BOTTOM
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllType;
