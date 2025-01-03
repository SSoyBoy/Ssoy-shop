import React, { useContext, useEffect } from "react";
import { Routes, Route, useLocation, useNavigate } from "react-router-dom";
import Home from "./pages/Home";
import Collection from "./pages/Collection";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Product from "./pages/Product";
import Cart from "./pages/Cart";
import Login from "./pages/Login";
import PlaceOrder from "./pages/PlaceOrder";
import Orders from "./pages/Orders";
import Footer from "./components/Footer";
import SearchBar from "./components/SearchBar";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { ShopContext } from "./context/ShopContext";
import NavBar from "./components/Navbar";
import Profile from "./pages/Profile";
import Verify from "./pages/Verify";

const App = () => {
  const { token, theme } = useContext(ShopContext);
  const { pathname } = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (token) {
      pathname === "/login" && navigate("/");
    } else {
      pathname.includes("/product") && navigate("/login");
    }
  }, [pathname, token]);

  return (
    <div>
      <div
        className={`fixed top-0 left-0 right-0 px-4 md:px-16 lg:px-24 z-50 bg-black text-white`}
      >
        <NavBar />
      </div>
      <div
        className={` min-h-[80vh]  ${
          theme === "light" ? "bg-white text-black" : "text-white bg-[#181818]"
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
          <Route path="/orders" element={<Orders />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/verify" element={<Verify />} />
        </Routes>
      </div>
      <Footer />
    </div>
  );
};

export default App;
