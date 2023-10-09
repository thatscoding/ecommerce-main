import React, { useEffect, useState } from "react";
import { AiTwotoneHome } from "react-icons/ai";
import Naure from "./../assets/nature.jpeg";
import { GetAllProducts } from "../services/productApi";
import { GetProductCategory } from "../services/productCategoryApi";

function Products() {
  const [productItems, setProductItems] = useState(null);
  const [productCategory, setProductCategory] = useState(null);
  useEffect(() => {
    async function fetchProducts() {
      const res = await GetAllProducts();
      if (res?.data) {
        setProductItems(res.data.products);
      }
      console.log(res?.data?.products);
      console.log(productItems);
    }

    fetchProducts();
  }, [setProductItems]);

  useEffect(() => {
    async function fetchProductCategory() {
      const res = await GetProductCategory();
      if (res?.data?.success == true) {
        setProductCategory(res?.data?.categorylist[0]?.categories);
      }
      // console.log(res?.data?.categorylist[0]?.categories);
      console.log(productCategory);
    }

    fetchProductCategory();
  }, [setProductCategory]);

  return (
    <section className="bg-gray-100 mt-8 py-8 h-[80vh] ">
      <div className="">
        <div className="px-4">
          <ul className="flex gap-x-1 py-2 px-1 overflow-x-auto  text-white">
            <li className="bg-gray-600 py-1 px-2 border-4 border-b-red-500 text-white flex justify-center items-center cursor-pointer">
              <AiTwotoneHome className="text-white" />
            </li>

            {productCategory?.map((item) => (
              <li className="bg-gray-400 py-1 px-2 border-4 border-b-green-500 cursor-pointer">
                {item}
              </li>
            ))}
          </ul>
        </div>

        <div className="w-full px-4 mt-4">
          <input
            type="text"
            className="w-full p-1 pl-3 border"
            placeholder="Product Search.."
            border
          />
        </div>

        <div className="p-4 flex flex-wrap gap-4 h-[60vh] overflow-auto justify-center">
          {productItems?.map((product) => (
            <div className=" h-32 w-32 rounded-lg bg-orange-400  flex flex-col items-center justify-center text-white">
              <p className="text-base text-center">{product.productName}</p>
              <p className="text-sm">{product.price}</p>
              <p className="text-sm text-center line-clamp-2	">
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
