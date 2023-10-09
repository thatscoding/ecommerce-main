import React, { useEffect, useState } from "react";
import { GetProductCategory } from "../services/productCategoryApi";
import { Link, useNavigate } from "react-router-dom";

function EditCategory() {
  const [productCategory, setProductCategory] = useState(null);
  const navigate = useNavigate();

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
  return (
    <div>
      <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" class="px-6 py-3">
                Category
              </th>

              <th scope="col" class="px-6 py-3">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {productCategory?.map((item, index) => (
              <tr
                key={index}
                class="bg-white border-b dark:bg-gray-900 dark:border-gray-700"
              >
                <th
                  scope="row"
                  class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  {item}
                </th>

                <td class="px-6 py-4" onClick={() => navigate(`/edit/:`)}>
                  <Link
                    to="#"
                    class="font-medium text-blue-600 dark:text-blue-500 hover:underline"
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

export default EditCategory;
