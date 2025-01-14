import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col gap-2 items-center justify-center h-screen">
      <h1 className="text-4xl font-semibold">404 - Page Not Found</h1>
      <p>Chúng tôi rất tiếc, trang bạn yêu cầu không tồn tại.</p>
      <button
        onClick={() => navigate("/")}
        className="p-3 border border-[#ff4a17] text-[#ff4a17] mt-2 transition-all duration-300 hover:text-white hover:bg-[#ff4a17]"
      >
        Quay lại trang chủ
      </button>
    </div>
  );
};

export default NotFound;
