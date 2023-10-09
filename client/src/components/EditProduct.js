import React, { useEffect, useState } from "react";
import { GetAllProducts } from "../services/productApi";
import { Link, useNavigate } from "react-router-dom";

function EditProduct() {
  const [productItems, setProductItems] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    async function AllProductItems() {
      const res = await GetAllProducts();
      if (res?.data) {
        setProductItems(res.data.products);
      }
      console.log(productItems);
    }
    AllProductItems();
  }, [setProductItems]);

  return (
    <div>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Product name
              </th>

              <th scope="col" className="px-6 py-3">
                Category
              </th>
              <th scope="col" className="px-6 py-3">
                Price
              </th>
              <th scope="col" className="px-6 py-3">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {productItems?.map((item, index) => (
              <tr
                key={index}
                className="bg-white border-b dark:bg-gray-900 dark:border-gray-700"
              >
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  {item.productName}
                </th>
                <td className="px-6 py-4"> {item.category}</td>
                <td className="px-6 py-4">{item.price}</td>
                <td
                  onClick={() => navigate(`/edit/${item._id}`)}
                  className="px-6 py-4"
                >
                  <Link
                    href="#"
                    className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                  >
                    Edit
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default EditProduct;
