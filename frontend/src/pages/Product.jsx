import React, {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { useParams } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";
import { assets, AiOutlineUser, IoMdSend } from "../assets/assets";
import RelatedProducts from "../components/RelatedProducts";
import { toast } from "react-toastify";
import axios from "axios";
import Pagination from "../components/Pagination";
import Loader from "../components/Loader";

const Product = () => {
  const { productId } = useParams();
  const {
    products,
    currency,
    addToCart,
    url,
    token,
    user,
    convertTimestamp,
    theme,
  } = useContext(ShopContext);
  const [productData, setProductData] = useState(false);
  const [image, setImage] = useState("");
  const [size, setSize] = useState("");
  const [comment, setComment] = useState("");
  const [commentData, setCommentData] = useState([]);
  const [isShowComment, setIsShowComment] = useState(false);
  const [totalPages, setTotalPages] = useState(1);
  const [totalComments, setTotalComments] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoadingComments, setIsLoadingComments] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [hoverPosition, setHoverPosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  const product = useMemo(
    () => products.find((item) => item._id === productId),
    [productId, products]
  );

  useEffect(() => {
    if (product) {
      setProductData(product);
      setImage(product.image[0]);
    }
  }, [product]);

  const getComment = useCallback(async () => {
    try {
      setIsLoadingComments(true);
      const response = await axios.get(
        `${url}/api/comment/${productId}/getcomments?page=${currentPage}&limit=10`
      );
      setTotalPages(response.data?.totalPages);
      setTotalComments(response.data?.totalComments);
      const userIds = response.data?.comments?.map((item) => item.userId);
      const usersResponse = await axios.post(`${url}/api/user/userscomment`, {
        userIds,
      });
      const users = usersResponse.data.data;

      const commentsWithUserData = response.data?.comments?.map((comment) => {
        const user = users.find((user) => user._id === comment.userId);
        return { ...comment, user };
      });
      setCommentData(commentsWithUserData);
      setIsLoadingComments(false);
    } catch (error) {
      console.error("Error fetching comments", error);
      toast.error("Lỗi khi lấy dữ liệu bình luận");
    }
  }, [productId, url, currentPage]);

  useEffect(() => {
    getComment();
  }, [getComment]);

  const handleSend = async (e) => {
    e.preventDefault();

    if (!user) return toast.error("Bạn cần đăng nhập để có thể bình luận.");
    if (!comment.trim()) return toast.error("Vui lòng bình luận.");

    try {
      const response = await axios.post(
        `${url}/api/comment/${productId}/addcomment`,
        { comment },
        { headers: { token } }
      );

      if (response.data.success) {
        setComment("");
        getComment();
        toast.success("Bình luận thành công");
      } else {
        toast.error("Lỗi khi gửi bình luận");
      }
    } catch (error) {
      console.error("Error sending comment", error);
      toast.error("Có lỗi xảy ra khi gửi bình luận");
    }
  };

  const handleMouseMove = (e, item) => {
    const rect = e.target.getBoundingClientRect(); // Lấy kích thước và vị trí ảnh
    const x = ((e.clientX - rect.left) / rect.width) * 100; // Tính vị trí X (%)
    const y = ((e.clientY - rect.top) / rect.height) * 100; // Tính vị trí Y (%)
    setHoverPosition({ x, y });
  };

  if (!productData) return <div className="opacity-0"></div>;

  return (
    <div className="border-t-2 pt-24 transition-opacity ease-in duration-500 opacity-100 px-4 md:px-16 lg:px-24">
      {/* Product Data */}
      <div className="flex gap-12 sm:gap-12 flex-col sm:flex-row">
        {/* Product Image */}
        <div className="flex-1 flex flex-col-reverse gap-3 sm:flex-row">
          <div className="scrollbar-none flex sm:flex-col overflow-x-auto sm:overflow-y-scroll justify-between sm:justify-normal sm:w-[18.7%] w-full">
            {productData.image.map((item, index) => (
              <img
                onClick={() => {
                  setImage(item);
                  setSelectedIndex(index);
                }}
                src={`${url}/images/` + item}
                key={index}
                className={`w-[24%] rounded-lg sm:w-full sm:mb-3 flex-shrink-0 cursor-pointer ${
                  selectedIndex === index ? "border border-orange-500" : ""
                }`}
                alt=""
              />
            ))}
          </div>
          <div
            className="w-full h-max rounded-xl sm:w-[80%] relative overflow-hidden cursor-zoom-in"
            onMouseMove={handleMouseMove}
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
          >
            <img
              src={`${url}/images/` + image}
              className={`w-full h-auto rounded-xl transition-transform duration-300 ${
                isHovering ? "scale-[3000]" : "scale-100"
              }`}
              style={{
                transformOrigin: `${hoverPosition.x}% ${hoverPosition.y}%`,
              }}
              alt=""
            />
            {productData.outOfStock && (
              <div className="absolute -top-1 right-1 border border-[#999696] border-t-black bg-red-600 text-white p-2 text-[10px]">
                Hết hàng
              </div>
            )}
          </div>
        </div>
        {/* Product Info */}
        <div className="flex-1">
          <h1 className="font-medium text-2xl mt-2">{productData.name}</h1>
          <div className="flex items-center gap-1 mt-2">
            <img src={assets.star_icon} alt="" className="w-3.5" />
            <img src={assets.star_icon} alt="" className="w-3.5" />
            <img src={assets.star_icon} alt="" className="w-3.5" />
            <img src={assets.star_icon} alt="" className="w-3.5" />
            <img src={assets.star_dull_icon} alt="" className="w-3.5" />
            <p className="pl-2">(122)</p>
          </div>
          <p className="mt-5 text-3xl font-medium text-orange-600">
            {productData.price.toLocaleString()} {currency}
          </p>
          <p
            className={`mt-5 md:w-4/5 ${
              theme === "light" ? "text-[#444]" : "text-[#999696]"
            }`}
          >
            {productData.description}
          </p>
          <div className="flex flex-col gap-4 my-8 font-medium">
            <p>Chọn Size</p>
            <div className="flex gap-2">
              {productData.sizes.map((item, index) => (
                <button
                  onClick={() => {
                    productData.outOfStock
                      ? toast.error("Out Of Stock!")
                      : setSize(item);
                  }}
                  className={`border py-2 px-4 rounded-lg ${
                    productData.outOfStock
                      ? "cursor-not-allowed"
                      : item === size
                      ? "border-orange-600 text-orange-600"
                      : ""
                  } ${theme === "light" ? "white" : "bg-black"}`}
                  key={index}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
          <button
            onClick={() => addToCart(productData._id, size)}
            className="bg-black text-white px-8 py-3 text-sm active:bg-[#444] hover:border-[#fa580c] hover:bg-[#fa580c] transition-all"
          >
            Thêm Vào Giỏ Hàng
          </button>
          <hr className="mt-8 sm:w-4/5" />
          <div
            className={`text-sm text-gray-500mt-5 flex flex-col gap-1 ${
              theme === "light" ? "text-[#444]" : "text-[#999696]"
            }`}
          >
            <p>100% sản phẩm chính hãng.</p>
            <p>Có hình thức thanh toán khi nhận hàng cho sản phẩm này.</p>
            <p>Chính sách đổi trả dễ dàng trong vòng 7 ngày.</p>
          </div>
        </div>
      </div>
      {/* Description & Review Section */}
      <div className="mt-20">
        <div className="flex">
          <b
            onClick={() => setIsShowComment(false)}
            className={`border px-5 py-3 text-sm cursor-pointer select-none ${
              !isShowComment ? "text-orange-600" : ""
            }`}
          >
            Mô tả sản phẩm
          </b>
          <div
            onClick={() => setIsShowComment(true)}
            className={`border px-5 py-3 text-sm cursor-pointer select-none ${
              isShowComment ? "text-orange-600" : ""
            }`}
          >
            <b>Review</b> ({totalComments})
          </div>
        </div>
        <div
          className={`border p-4 md:p-6 text-sm ${
            theme === "light" ? "text-[#444]" : "text-[#999696]"
          }`}
        >
          {!isShowComment ? (
            <div className="flex flex-col gap-4">
              <h2
                className={`mb-2 font-medium ${
                  theme === "light" ? "text-black" : "text-white"
                }`}
              >
                SSOY CAM KẾT
              </h2>
              <p className="pb-4">
                Hình ảnh sản phẩm là ảnh thật do shop tự chụp và giữ bản quyền
                hình ảnh Quần được kiểm tra kỹ, cẩn thận và tư vấn nhiệt tình
                Hàng có sẵn, giao hàng ngay khi nhận được đơn Hoàn tiền nếu sản
                phẩm không giống với mô tả Chấp nhận đổi hàng khi size không vừa
                Giao hàng trên toàn quốc, nhận hàng trả tiền{" "}
              </p>
              <h2
                className={`mb-2 font-medium ${
                  theme === "light" ? "text-black" : "text-white"
                }`}
              >
                QUY ĐỊNH BẢO HÀNH, ĐỔI TRẢ
              </h2>
              <p className="pb-4">
                1. Điều kiện áp dụng (trong vòng 60 ngày kể từ khi nhận sản
                phẩm) <br />- Hàng hoá vẫn còn mới, chưa qua sử dụng <br />-
                Hàng hoá bị lỗi hoặc hư hỏng do vận chuyển hoặc do nhà sản xuất{" "}
                <br />
                2. Trường hợp được chấp nhận: <br />- Hàng không đúng size, kiểu
                dáng như quý khách đặt hàng - Không đủ số lượng, không đủ bộ như
                trong đơn hàng <br />
                3. Trường hợp không đủ điều kiện áp dụng chính sách: <br />- Quá
                20 ngày kể từ khi Quý khách nhận hàng <br />- Gửi lại hàng không
                đúng mẫu mã, không phải sản phẩm của OFS <br />- Không thích,
                không hợp, đặt nhầm mã, nhầm màu,... Do màn hình và điều kiện
                ánh sáng khác nhau, màu sắc thực tế của sản phẩm có thể chênh
                lệch khoảng 2-3%
              </p>
              <p>
                💖 Chắc chắn việc mặc 1 chiếc Quần Tây Nam - Quần Âu Nam thời
                trang, năng động sẽ mang lại cho bạn sự tự tin trong ánh mắt
                những người xung quanh, Còn trần chờ gì mà không thêm sản phẩm
                vào giỏ hàng!
              </p>
            </div>
          ) : (
            <>
              {!isLoadingComments ? (
                <div className="flex flex-col gap-4 mb-4">
                  {commentData &&
                    commentData.map((item, index) => (
                      <div className="w-full" key={index}>
                        <div key={index} className="flex items-start gap-3">
                          {item.user?.image ? (
                            <img
                              src={`${url}/images/${item.user.image}`}
                              className="w-7 h-7 rounded-full bg-center"
                            />
                          ) : (
                            <AiOutlineUser className="w-7 h-7 bg-[#f5f5f5] rounded-full" />
                          )}
                          <div
                            className={`flex w-fit flex-col p-3 rounded-xl ${
                              theme === "light"
                                ? "bg-[#f5f5f5]"
                                : "bg-[#3a3b3cc0]"
                            }`}
                          >
                            <p
                              className={`font-medium ${
                                theme === "light" ? "text-black" : "text-white"
                              }`}
                            >
                              {item?.user?.name}
                            </p>
                            <p
                              className={
                                theme === "light"
                                  ? "text-[#444]"
                                  : "text-gray-300"
                              }
                            >
                              {convertTimestamp(item.createAt)}
                            </p>
                            <div
                              className={`mt-2 ${
                                theme === "light" ? "text-black" : "text-white"
                              }`}
                            >
                              <p>{item.comment}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
              ) : (
                <Loader text={"Loading"} />
              )}

              <Pagination
                data={commentData}
                currentPage={currentPage}
                totalPages={totalPages}
                setCurrentPage={setCurrentPage}
              />
            </>
          )}
          {isShowComment ? (
            <div className="w-full flex gap-3">
              {user && user.image ? (
                <img
                  src={`${url}/images/${user.image}`}
                  className="w-7 h-7 rounded-full bg-center"
                />
              ) : (
                <AiOutlineUser className="w-7 h-7 bg-[#f5f5f5] rounded-full" />
              )}
              <form className="w-full relative">
                <input
                  type="text"
                  className={`p-3 w-full border-none rounded-xl pr-10 ${
                    theme === "light"
                      ? "bg-[#f5f5f5] text-black"
                      : "bg-[#3a3b3cc0] text-white"
                  }`}
                  placeholder="Thêm bình luận của bạn"
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                />
                <button
                  type="submit"
                  className="absolute p-3 right-0"
                  onClick={handleSend}
                >
                  <IoMdSend className="w-5 h-5" />
                </button>
              </form>
            </div>
          ) : null}
        </div>
      </div>
      {/* Display related products */}

      <RelatedProducts
        category={productData.category}
        subCategory={productData.subCategory}
      />
    </div>
  );
};

export default Product;
