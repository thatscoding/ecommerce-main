import React, { useEffect, useState } from "react";
import { DeleteProductById, GetAllProducts } from "../services/productApi";
import { Link, useNavigate } from "react-router-dom";
import { UserProfile } from "../services/userApi";
import { HashLoader } from "react-spinners";

function ManageProduct() {
  const [productItems, setProductItems] = useState();
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const auth = async () => {
      const res = await UserProfile();
      await setLoading(false);

      console.log(res);
      if (res?.data.success === false) {
        navigate("/login");
      }
    };
    auth();
  });

  useEffect(() => {
    async function AllProductItems() {
      const res = await GetAllProducts();
      if (res?.data) {
        setProductItems(res.data.products);
      }
      // console.log(productItems);
    }
    AllProductItems();
  }, [setProductItems]);

  const DeleteProduct = async (id) => {
    const res = await DeleteProductById(id);
    console.log(res);
    if (res?.data?.success === true) {
      alert(res?.data.message);
    }
    const res2 = await GetAllProducts();
    if (res2?.data) {
      setProductItems(res2.data.products);
    }
  };

  return (
    <div>
      {loading ? (
        <div className="flex w-full h-screen justify-center items-center">
          <HashLoader color="#36d7b7" />
        </div>
      ) : (
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
                  Stocks
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
                  <td className="px-6 py-4">{item.stocks}</td>
                  <td className="px-6 py-4">{item.price}</td>
                  <td className="px-6 py-4 flex gap-1">
                    <Link
                      // onClick={() => navigate(`/edit/${item._id}`)}
                      to={`/editProduct/${item._id}`}
                      className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                    >
                      Edit
                    </Link>
                    |
                    <Link
                      onClick={() => {
                        DeleteProduct(item._id);
                      }}
                      className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                    >
                      Delete
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default ManageProduct;
