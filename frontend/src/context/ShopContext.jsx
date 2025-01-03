import { createContext, useCallback, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export const ShopContext = createContext();

const ShopContextProvider = (props) => {
  const currency = "₫";
  const delivery_fee = 10000;
  const url = import.meta.env.VITE_BACKEND_URL;
  const [theme, setTheme] = useState("light");
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const [cartItems, setCartItems] = useState({});
  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  const addToCart = async (itemId, size) => {
    if (!size) {
      toast.error("Hãy chọn kích thước sản phẩm");
      return;
    }
    let cartData = structuredClone(cartItems);

    if (cartItems[itemId]) {
      if (cartData[itemId][size]) {
        cartData[itemId][size] += 1;
      } else {
        cartData[itemId][size] = 1;
      }
    } else {
      cartData[itemId] = {};
      cartData[itemId][size] = 1;
    }

    setCartItems(cartData);

    if (token) {
      await axios.post(
        url + "/api/cart/add",
        {
          itemId,
          size,
        },
        {
          headers: { token },
        }
      );
    }
  };

  const updateQuantity = async (itemId, size, quantity) => {
    let cartData = structuredClone(cartItems);
    cartData[itemId][size] = quantity;
    setCartItems(cartData);
    if (token) {
      await axios.post(
        url + "/api/cart/update",
        { itemId, size, quantity },
        { headers: { token } }
      );
    }
  };

  const getCartAmount = () => {
    let totalAmount = 0;
    for (const items in cartItems) {
      let itemInfo = products.find((product) => product._id === items);
      for (const item in cartItems[items]) {
        try {
          if (cartItems[items][item] > 0) {
            totalAmount += itemInfo.price * cartItems[items][item];
          }
        } catch (error) {}
      }
    }
    return totalAmount;
  };

  const getCartCount = () => {
    let totalCount = 0;
    for (const items in cartItems) {
      for (const item in cartItems[items]) {
        try {
          if (cartItems[items][item] > 0) {
            totalCount += cartItems[items][item];
          }
        } catch (error) {}
      }
    }
    return totalCount;
  };

  const fetchProducts = async () => {
    const response = await axios.get(url + "/api/product/list");
    setProducts(response.data.data.products);
  };

  const getCartData = async (token) => {
    const response = await axios.post(
      url + "/api/cart/get",
      {},
      { headers: { token } }
    );
    setCartItems(response.data.cartData);
  };

  const getUserData = async (token) => {
    try {
      if (!token) {
        throw new Error("Token không hợp lệ hoặc không tồn tại");
      }
      const response = await axios.post(
        url + "/api/user/get",
        {},
        { headers: { token } }
      );

      setUser(response.data.data);
    } catch (error) {
      console.error("Lỗi khi lấy dữ liệu người dùng:", error);
      toast.error("Vui lòng đăng nhập lại");
      // navigate("/login");
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    setToken(null);
    setUser(null);
    setCartItems({});
    navigate("/login");
  };

  const convertTimestamp = useCallback((timestamp) => {
    let date = new Date(timestamp);

    const day = date.getDate();
    const month = date.toLocaleString("vn-VN", { month: "long" });
    const year = date.getFullYear();
    const hour = date.getHours();
    const minute = date.getMinutes();
    // if (hour > 12) {
    //   return hour - 12 + ":" + minute + " PM";
    // } else {
    //   return hour + ":" + minute + " AM";
    // }
    const formattedDate = `${day}, ${month}, ${year} ${hour}:${minute}`;

    return formattedDate;
  }, []);

  const handleScrollTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  useEffect(() => {
    async function loadData() {
      const storedToken = localStorage.getItem("token");
      setTheme(localStorage.getItem("theme"));
      if (storedToken) {
        setToken(storedToken);
        await getCartData(storedToken);
        await getUserData(storedToken);
      }

      await fetchProducts();
    }
    loadData();
  }, [token]);

  const value = {
    products,
    currency,
    delivery_fee,
    search,
    setSearch,
    showSearch,
    setShowSearch,
    addToCart,
    cartItems,
    getCartCount,
    updateQuantity,
    getCartAmount,
    navigate,
    url,
    token,
    setToken,
    user,
    setUser,
    getUserData,
    convertTimestamp,
    handleScrollTop,
    theme,
    setTheme,
    logout,
  };
  return (
    <ShopContext.Provider value={value}>{props.children}</ShopContext.Provider>
  );
};
export default ShopContextProvider;
