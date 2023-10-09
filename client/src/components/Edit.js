import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { RegisterUser } from "../services/userApi";
import { AddProduct, GetProductById } from "../services/productApi";

function Edit() {
  const { register, handleSubmit, reset } = useForm();
  const [product, setProduct] = useState({
    productName: "",
    price: 0,
    category: "",
    description: "",
  });
  const navigate = useNavigate();
  const { id } = useParams();

  const handleChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  // const [selectedOption, setSelectedOption] = useState("");

  // const handleSelectChange = (event) => {
  //   setSelectedOption(event.target.value);
  // };

  useEffect(() => {
    const getProdById = async () => {
      const res = await GetProductById(id);
      console.log(res);
      setProduct(res.data.product);
    };
    getProdById();
  }, []);

  const SubmitForm = async () => {
    console.log(product);
    const res = await AddProduct(product);

    alert(res?.data.message);

    console.log(res?.data.message);

    if (res?.data.success === true) {
      reset();
      navigate("/");
    }
  };
  return (
    <div>
      <section className="text-gray-600 body-font relative">
        <div className="container px-5 py-24 mx-auto">
          <div className="flex flex-col text-center w-full mb-12">
            <h1 className="sm:text-3xl text-2xl font-medium title-font mb-4 text-gray-900">
              Create/Edit Product
            </h1>
            <p className="lg:w-2/3 mx-auto leading-relaxed text-base">
              Whatever cardigan tote bag tumblr hexagon brooklyn asymmetrical
              gentrify.
            </p>
          </div>
          <div className="lg:w-1/2 md:w-2/3 mx-auto">
            <div className="flex flex-wrap -m-2">
              <div className="p-2 w-full sm:w-full">
                <div className="relative">
                  <label
                    htmlFor="name"
                    className="leading-7 text-sm text-gray-600"
                  >
                    ProductName
                  </label>
                  <input
                    type="text"
                    value={product?.productName}
                    onChange={(e) => handleChange(e)}
                    id="productName"
                    name="productName"
                    required
                    className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                  />
                </div>
              </div>
              <div className="p-2 w-full sm:w-full">
                <div className="relative">
                  <label
                    htmlFor="email"
                    className="leading-7 text-sm text-gray-600"
                  >
                    Price
                  </label>
                  <input
                    type="number"
                    id="price"
                    name="price"
                    value={product?.price}
                    onChange={(e) => handleChange(e)}
                    required
                    className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                  />
                </div>
              </div>

              <div className="p-2 w-full sm:w-full">
                <div className="relative">
                  <label
                    htmlFor="name"
                    className="leading-7 text-sm text-gray-600"
                  >
                    Category
                  </label>

                  <select
                    className="w-full border p-1"
                    name="category"
                    onChange={(e) => handleChange(e)}

                    // value={selectedOption}
                    // onChange={handleSelectChange}
                  >
                    <option value={product?.category}>
                      {product?.category}
                    </option>
                    <option value="Computers">Computers</option>
                    <option value="Fruits">Fruits</option>
                    <option value="Clothings">Clothings</option>
                    <option value="Services">Services</option>
                    <option value="Burger">Burger</option>
                    <option value="Pizza">Pizza</option>
                    <option value="Electronics">Electronics</option>
                  </select>
                </div>
              </div>
              <div className="p-2 w-full sm:w-full">
                <div className="relative">
                  <label
                    htmlFor="email"
                    className="leading-7 text-sm text-gray-600"
                  >
                    Discription
                  </label>
                  <input
                    type="text"
                    id="description"
                    name="description"
                    value={product?.description}
                    onChange={(e) => handleChange(e)}
                    required
                    className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                  />
                </div>
              </div>

              <div className="p-2 w-full mt-4">
                <button
                  onClick={() => SubmitForm()}
                  className="flex  w-full  justify-center items-center text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg"
                >
                  Submit
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Edit;
