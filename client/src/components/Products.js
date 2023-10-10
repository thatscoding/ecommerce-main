import React, { useEffect, useState } from "react";
import { AiTwotoneHome } from "react-icons/ai";
import { GetAllProducts } from "../services/productApi";
import {
  GetProductCategory,
  GetProductsByCategory,
} from "../services/productCategoryApi";
import { useCart } from "../CartContext";
import CardComponent from "./CardComponent";
import { HashLoader } from "react-spinners";

function Products() {
  const [searchTerm, setSearchTerm] = useState("");

  const [productItems, setProductItems] = useState();
  const [productCategory, setProductCategory] = useState(null);
  const [loading, setLoading] = useState(true);

  const { cart, addToCart, updateCartItem } = useCart();

  useEffect(() => {
    async function fetchProducts() {
      const res = await GetAllProducts();
      if (res?.data) {
        setProductItems(res.data.products);
        setLoading(false);
      }
      console.log(res?.data?.products);
    }

    fetchProducts();
  }, [setProductItems]);

  useEffect(() => {
    async function fetchProductCategory() {
      setLoading(true);
      const res = await GetProductCategory();
      if (res?.data?.success === true) {
        setProductCategory(res?.data?.categorylist[0]?.categories);
        setLoading(false);
      }
      // console.log(res?.data?.categorylist[0]?.categories);
    }

    fetchProductCategory();
  }, [setProductCategory]);

  async function prodByCategory(category) {
    setLoading(true);
    console.log(category);
    const res = await GetProductsByCategory({ category: category });
    if (res?.data) {
      setProductItems(res.data.products);
      setLoading(false);
    }
    console.log(res?.data?.products);
  }

  async function AllProductItems() {
    setLoading(true);
    const res = await GetAllProducts();
    if (res?.data) {
      setProductItems(res.data.products);
      setLoading(false);
    }
  }

  const AddItemToCart = async (product) => {
    console.log(product);
    const itmIndex = cart.items.findIndex((item) => item._id === product._id);

    if (itmIndex === -1) {
      const newProduct = { ...product, quantity: 1, total: product.price };
      console.log("Adding new product to cart");
      addToCart(newProduct);
      // await localStorage.setItem("cart", JSON.stringify(cart.items));
    } else {
      console.log("Updating existing product in cart");
      const updatedCart = [...cart.items];
      updatedCart[itmIndex].quantity += 1;
      updatedCart[itmIndex].total =
        updatedCart[itmIndex].quantity * updatedCart[itmIndex].price;

      updateCartItem(updatedCart);
      // await localStorage.setItem("cart", JSON.stringify(cart.items));
    }
  };

  const handleSearchChange = async (event) => {
    setLoading(true);
    setSearchTerm(event.target.value);
    const res = await GetAllProducts();
    if (res?.data) {
      const filteredProducts = res.data.products.filter((product) =>
        product.productName.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setProductItems(filteredProducts);
      setLoading(false);
    }
  };

  return (
    <section className="bg-gray-100 mt-8 py-8 h-[80vh] ">
      <div className="">
        <div className="px-4">
          <ul className="flex gap-x-1 py-2 px-1 overflow-x-auto  text-white">
            <li
              onClick={() => AllProductItems()}
              className="bg-gray-600 py-1 px-2 border-4 border-b-red-500 text-white flex justify-center items-center cursor-pointer"
            >
              <AiTwotoneHome className="text-white" />
            </li>

            {productCategory?.map((item) => (
              <li
                onClick={() => prodByCategory(item)}
                className="bg-gray-400 py-1 px-2 border-4 border-b-green-500 cursor-pointer"
              >
                {item}
              </li>
            ))}
          </ul>
        </div>

        <div className="w-full px-4 mt-4">
          <input
            type="text"
            className="w-full p-1 pl-3 border"
            placeholder="Search products..."
            value={searchTerm}
            onChange={handleSearchChange}
            border
          />
        </div>

        {loading ? (
          <div className="flex w-full h-[60vh] justify-center items-center">
            <HashLoader color="#36d7b7" />
          </div>
        ) : (
          <div className="p-4 flex flex-wrap gap-4 h-[60vh] overflow-auto justify-center">
            {productItems.length === 0 && <h1>No items found</h1>}
            {productItems?.map((product) => (
              <CardComponent product={product} AddItemToCart={AddItemToCart} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

export default Products;
