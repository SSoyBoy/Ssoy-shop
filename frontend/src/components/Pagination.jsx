import React, { useContext } from "react";
import { GrFormNext } from "../assets/assets";
import { useLocation, useNavigate } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";

const Pagination = ({ data, currentPage, totalPages, setCurrentPage }) => {
  const { handleScrollTop, theme } = useContext(ShopContext);
  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location?.search);

  const handlePageChange = (page) => {
    // Cập nhật URL khi trang thay đổi
    if (location.pathname.includes("/collection")) {
      searchParams.set("page", page);
      handleScrollTop();
      navigate(`${location.pathname}?${searchParams.toString()}`);
    } else {
      setCurrentPage(page);
    }
  };

  const generatePagination = () => {
    const pages = [];
    if (totalPages <= 6) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage <= 3) {
        pages.push(1, 2, 3, 4, "...", totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(
          1,
          "...",
          totalPages - 3,
          totalPages - 2,
          totalPages - 1,
          totalPages
        );
      } else {
        pages.push(
          1,
          "...",
          currentPage - 1,
          currentPage,
          currentPage + 1,
          "...",
          totalPages
        );
      }
    }
    return pages;
  };

  return (
    <div
      className={`flex flex-wrap items-center text-base justify-center my-5 gap-1 select-none ${
        data.length === 0 ? "hidden" : ""
      }`}
    >
      <button
        className={`py-1.5 px-3 flex cursor-pointer rounded-md transition-all ${
          theme === "light"
            ? "hover:bg-gray-200"
            : "hover:bg-gray-100 hover:text-black"
        } ${currentPage === 1 ? "hidden" : ""}`}
        onClick={() => handlePageChange(Math.max(currentPage - 1, 1))}
        disabled={currentPage === 1}
      >
        <GrFormNext className="h-6 mr-1 rotate-180" />
        Trước
      </button>
      {generatePagination().map((page, index) =>
        page === "..." ? (
          <span key={index}>...</span>
        ) : (
          <button
            key={index}
            onClick={() => handlePageChange(page)}
            className={`py-1.5 px-3 cursor-pointer rounded-md transition-all ${
              theme === "light"
                ? "hover:bg-gray-200"
                : "hover:bg-gray-100 hover:text-black"
            } ${
              currentPage === page
                ? theme === "light"
                  ? "bg-gray-100"
                  : "bg-[#444]"
                : ""
            }`}
          >
            {page}
          </button>
        )
      )}
      <button
        className={`flex py-1.5 px-3 cursor-pointer rounded-md transition-all ${
          theme === "light"
            ? "hover:bg-gray-200"
            : "hover:bg-gray-100 hover:text-black"
        } ${currentPage === totalPages ? "hidden" : ""}`}
        onClick={() => handlePageChange(Math.min(currentPage + 1, totalPages))}
      >
        Tiếp
        <GrFormNext className="ml-1 h-6" />
      </button>
    </div>
  );
};

export default Pagination;
