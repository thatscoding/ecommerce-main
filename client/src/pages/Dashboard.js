import React, { useEffect, useState } from "react";
import { UserProfile } from "../services/userApi";
import { useNavigate } from "react-router-dom";
import { HashLoader } from "react-spinners";

function Dashboard() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [visits, setVisits] = useState(0);

  useEffect(() => {
    const auth = async () => {
      const res = await UserProfile();
      await setLoading(false);
      console.log(res);
      if (res?.data.status === "failed") {
        navigate("/login");
      } else {
        setVisits(res?.data?.user?.generatedUrl);
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
              <p className="lg:w-2/3 mx-auto leading-relaxed text-base">
                Whatever cardigan tote bag tumblr hexagon brooklyn asymmetrical
                gentrify, subway tile poke farm-to-table. Franzen you probably
                haven't heard of them man bun deep jianbing selfies heirloom
                prism food truck ugh squid celiac humblebrag.
              </p>
            </div>
            <div className="flex flex-wrap -m-4 text-center justify-center">
              <div className="p-4 md:w-1/3 sm:w-1/2 w-full">
                <div className="border-2 border-gray-200 px-4 py-6 rounded-lg">
                  <svg
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    className="text-indigo-500 w-12 h-12 mb-3 inline-block"
                    viewBox="0 0 24 24"
                  >
                    <path d="M8 17l4 4 4-4m-4-5v9"></path>
                    <path d="M20.88 18.09A5 5 0 0018 9h-1.26A8 8 0 103 16.29"></path>
                  </svg>
                  <h2 className="title-font font-medium text-3xl text-gray-900">
                    {visits}
                  </h2>
                  <p className="leading-relaxed">No. Generated URLs</p>
                </div>
              </div>
              <div className="p-4 md:w-1/3 sm:w-1/2 w-full">
                <div className="border-2 border-gray-200 px-4 py-6 rounded-lg">
                  <svg
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    className="text-indigo-500 w-12 h-12 mb-3 inline-block"
                    viewBox="0 0 24 24"
                  >
                    <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"></path>
                    <circle cx="9" cy="7" r="4"></circle>
                    <path d="M23 21v-2a4 4 0 00-3-3.87m-4-12a4 4 0 010 7.75"></path>
                  </svg>
                  <h2 className="title-font font-medium text-3xl text-gray-900">
                    2.7K
                  </h2>
                  <p className="leading-relaxed">Users</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}
    </div>
  );
}

export default Dashboard;
