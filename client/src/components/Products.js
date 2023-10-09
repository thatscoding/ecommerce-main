import React, { useEffect, useState } from "react";
import { AiTwotoneHome } from "react-icons/ai";
import { GetAllProducts } from "../services/productApi";
import {
  GetProductCategory,
  GetProductsByCategory,
} from "../services/productCategoryApi";
import { useCart } from "../CartContext";

function Products() {
  const [searchTerm, setSearchTerm] = useState("");

  const [productItems, setProductItems] = useState();
  const [productCategory, setProductCategory] = useState(null);

  const { cart, addToCart, updateCartItem } = useCart();

  useEffect(() => {
    async function fetchProducts() {
      const res = await GetAllProducts();
      if (res?.data) {
        setProductItems(res.data.products);
      }
      console.log(res?.data?.products);
    }

    fetchProducts();
  }, [setProductItems]);

  useEffect(() => {
    async function fetchProductCategory() {
      const res = await GetProductCategory();
      if (res?.data?.success === true) {
        setProductCategory(res?.data?.categorylist[0]?.categories);
      }
      // console.log(res?.data?.categorylist[0]?.categories);
    }

    fetchProductCategory();
  }, [setProductCategory]);

  async function prodByCategory(category) {
    console.log(category);
    const res = await GetProductsByCategory({ category: category });
    if (res?.data) {
      setProductItems(res.data.products);
    }
    console.log(res?.data?.products);
  }

  async function AllProductItems() {
    const res = await GetAllProducts();
    if (res?.data) {
      setProductItems(res.data.products);
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
    setSearchTerm(event.target.value);
    const res = await GetAllProducts();
    if (res?.data) {
      const filteredProducts = res.data.products.filter((product) =>
        product.productName.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setProductItems(filteredProducts);
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

        <div className="p-4 flex flex-wrap gap-4 h-[60vh] overflow-auto justify-center">
          {productItems?.map((product) => (
            <div
              className=" h-32 w-32 rounded-lg bg-orange-400  flex flex-col items-center justify-center text-white shadow-xl"
              onClick={() => AddItemToCart(product)}
            >
              <p className="text-base text-center ">{product.productName}</p>
              <p className="text-sm">{product.price}</p>
              <p className="text-sm text-center line-clamp-1">
                {product.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Products;
