import React, { useState } from "react";
import "./Add.css";
import { assets, url } from "../../assets/assets";
import axios from "axios";
import { toast } from "react-toastify";
import { useContext } from "react";
import { StoreContext } from "../../context/storeContext";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const initialFormData = {
  name: "",
  description:
    "A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.",
  price: "",
  category: "Women",
  subCategory: "Topwear",
  sizes: [],
  bestseller: false,
  outOfStock: false,
};
const sizes = ["S", "M", "L", "XL"];

const Add = () => {
  const [image, setImage] = useState([]);
  const [data, setData] = useState(initialFormData);
  const navigate = useNavigate();
  const { currentUpdatedProduct, setCurrentUpdatedProduct } =
    useContext(StoreContext);

  const onChangeHandler = (event) => {
    // const name = event.target.name;
    // const value = event.target.value;
    const { name, value } = event.target;
    setData((data) => ({ ...data, [name]: value }));
  };

  const onSizeChange = (size) => {
    setData((prevData) => {
      if (prevData.sizes.includes(size)) {
        return {
          ...prevData,
          sizes: prevData.sizes.filter((s) => s !== size),
        };
      } else {
        return {
          ...prevData,
          sizes: [...prevData.sizes, size],
        };
      }
    });
  };

  // const handleImageChange = (event) => {
  //   console.log("event", event.target.files);

  //   setImage((img) => [...img, event.target.files[0]]);
  // };
  const handleImageChange = (event, index) => {
    const newImages = [...image];
    console.log("inewImages", newImages);

    newImages[index] = event.target.files[0];
    setImage(newImages);
  };

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    if (currentUpdatedProduct !== null) {
      formData.append("id", data._id);
    }
    formData.append("name", data.name);
    formData.append("description", data.description);
    formData.append("price", Number(data.price));
    formData.append("category", data.category);

    // Append new images or retain old ones if not replaced
    image.forEach((img, index) => {
      console.log("img", img);

      if (img) {
        formData.append("image[]", img);
      }
    });

    // Append existing images if no new image was added
    // if (data.image && data.image.length > 0) {
    //   data.image.forEach((img) => {
    //     formData.append("image[]", img);
    //   });
    // }

    formData.append("subCategory", data.subCategory);
    data.sizes.forEach((size) => {
      formData.append("sizes[]", size);
    });
    formData.append("bestseller", data.bestseller);
    formData.append("outOfStock", data.outOfStock);
    const response =
      currentUpdatedProduct !== null
        ? await axios.put(url + "/api/product/edit", formData)
        : await axios.post(`${url}/api/product/add`, formData);
    if (response.data.success) {
      setCurrentUpdatedProduct(null);
      setData(initialFormData);
      setImage([]);
      toast.success(response.data.message);
      if (response.data.message === "Product Updated") navigate("/list");
    } else {
      setData(initialFormData);
      toast.error(response.data.message);
    }
  };

  useEffect(() => {
    if (currentUpdatedProduct !== null) {
      setData(currentUpdatedProduct);
      setImage(currentUpdatedProduct.image || []);
    }
  }, [currentUpdatedProduct]);

  return (
    <div className="add">
      <form onSubmit={onSubmitHandler} className="flex-col">
        <div className="add-img-upload flex-col">
          <p>Upload Image</p>
          <div style={{ display: "flex", gap: "10px" }}>
            {Array(4)
              .fill(null)
              .map((_, index) => (
                <div key={index}>
                  <label htmlFor={`image${index}`}>
                    <img
                      src={
                        image && image[index] instanceof File
                          ? URL.createObjectURL(image[index])
                          : data.image && data.image[index]
                          ? `${url}/images/${data.image[index]}`
                          : assets.upload_area
                      }
                      alt=""
                    />
                  </label>
                  <input
                    onChange={(e) => handleImageChange(e, index)}
                    type="file"
                    id={`image${index}`}
                    hidden
                    multiple
                    accept="image/*"
                  />
                </div>
              ))}
          </div>
        </div>
        <div className="add-product-name flex-col">
          <p>Product name</p>
          <input
            onChange={onChangeHandler}
            value={data.name}
            required
            type="text"
            name="name"
            placeholder="Type here"
          />
        </div>
        <div className="add-product-description flex-col">
          <p>Product description</p>
          <textarea
            onChange={onChangeHandler}
            value={data.description}
            name="description"
            id=""
            cols="30"
            rows="6"
            placeholder="Write content here"
            required
          ></textarea>
        </div>
        <div className="add-category-price">
          <div className="add-category flex-col">
            <p>Product category</p>
            <select onChange={onChangeHandler} name="category" id="">
              <option value="Women">Women</option>
              <option value="Men">Men</option>
              <option value="Kids">Kids</option>
            </select>
          </div>
          <div className="add-category flex-col">
            <p>Product subcategory</p>
            <select onChange={onChangeHandler} name="subCategory" id="">
              <option value="Topwear">Topwear</option>
              <option value="Bottomwear">Bottomwear</option>
              <option value="Winterwear">Winterwear</option>
            </select>
          </div>
          <div className="add-price flex-col">
            <p>Product price</p>
            <input
              onChange={onChangeHandler}
              required
              value={data.price}
              type="number"
              name="price"
              placeholder="$0.00"
            />
          </div>
        </div>
        <div className="add-category-price">
          <div className="add-category flex-col">
            <p>Product sizes</p>
            <div className="flex gap-4">
              {sizes.map((item, index) => (
                <div
                  key={index}
                  onClick={() => onSizeChange(item)}
                  className={`sizes ${
                    data.sizes.includes(item) ? "selected" : ""
                  }`}
                >
                  {item}
                </div>
              ))}
            </div>
          </div>
          <div className="add-category flex-col">
            <p>Product bestseller</p>
            <select
              onChange={onChangeHandler}
              value={data.bestseller}
              name="bestseller"
              id=""
            >
              <option value="false">False</option>
              <option value="true">True</option>
            </select>
          </div>
          <div className="add-category flex-col">
            <p>Out Of Stock</p>
            <select
              onChange={onChangeHandler}
              value={data.outOfStock}
              name="outOfStock"
              id=""
            >
              <option value="false">False</option>
              <option value="true">True</option>
            </select>
          </div>
        </div>
        <button className="add-btn" type="submit">
          {currentUpdatedProduct ? "Edit" : "Add"}
        </button>
      </form>
    </div>
  );
};

export default Add;
