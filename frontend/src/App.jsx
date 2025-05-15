import { useContext, useEffect } from "react";
import { Routes, Route, useLocation, useNavigate } from "react-router-dom";
import Home from "./pages/Home";
import Collection from "./pages/Collection";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Product from "./pages/Product";
import Cart from "./pages/Cart";
import Login from "./pages/Login";
import PlaceOrder from "./pages/PlaceOrder";
import Footer from "./components/Footer";
import SearchBar from "./components/SearchBar";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { ShopContext } from "./context/ShopContext";
import NavBar from "./components/Navbar";
import Verify from "./pages/Verify";
import Account from "./pages/Account";
import NotFound from "./pages/NotFound";

const App = () => {
  const { theme } = useContext(ShopContext);
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (token) {
      pathname === "/login" && navigate("/");
    } else {
      pathname.includes("/product") && navigate("/login");
    }
  }, [token, pathname]);

  return (
    <div>
      <div
        className={`fixed top-0 left-0 right-0 px-4 md:px-16 lg:px-24 z-50 bg-black text-white`}
      >
        <NavBar />
      </div>
      <div
        className={` min-h-[80vh]  ${
          theme === "dark" ? "text-white bg-[#181818]" : "bg-white text-black"
        }`}
      >
        <ToastContainer />
        <SearchBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/collection" element={<Collection />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/product/:productId" element={<Product />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/login" element={<Login />} />
          <Route path="/place-order" element={<PlaceOrder />} />
          <Route path="/verify" element={<Verify />} />
          <Route path="/account/:action" element={<Account />} />
          <Route path="/account" element={<Account />} />
          <Route path="/404" element={<NotFound />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
      <Footer />
    </div>
  );
};

export default App;
