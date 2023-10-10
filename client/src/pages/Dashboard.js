import React, { useEffect, useState } from "react";
import { UserProfile } from "../services/userApi";
import { useNavigate } from "react-router-dom";
import { HashLoader } from "react-spinners";
import ManageProduct from "../components/ManageProduct";

function Dashboard() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

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

  // useEffect(() => {
  //   async function fetchUrlDetails() {
  //     const res = await urlAnalytics();
  //     console.log(res);
  //   }
  //   fetchUrlDetails();
  // }, []);

  return (
    <div>
      {loading ? (
        <div className="flex w-full h-screen justify-center items-center">
          <HashLoader color="#36d7b7" />
        </div>
      ) : (
        <section className="text-gray-600 body-font">
          <div className="container xl:max-w-7xl px-5 py-24 mx-auto">
            <div className="flex flex-col text-center w-full mb-20">
              <h1 className="sm:text-3xl text-2xl font-medium title-font mb-4 text-gray-900">
                Dashboard
              </h1>
              <ul className="flex gap-4 font-bold bg-gray-400 py-2 px-4 text-white mb-8">
                <li className="hover:text-red-600 ease-in-out duration-500">
                  Products
                </li>
                <li>
                  <h2
                    onClick={() => navigate("/addProduct")}
                    className="cursor-pointer hover:text-red-400 font-bold"
                  >
                    Create New Product
                  </h2>
                </li>
              </ul>

              <ManageProduct />
            </div>
          </div>
        </section>
      )}
    </div>
  );
}

export default Dashboard;
