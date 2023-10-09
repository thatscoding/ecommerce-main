import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Logout, UserProfile } from "../services/userApi";
import { useUserInfo } from "../UserContext";

function Hearder() {
  const { setUserInfo, userInfo } = useUserInfo();
  // JSON.parse(localStorage.getItem("useInfo"))

  const navigate = useNavigate();
  useEffect(() => {
    const fetchDetails = async () => {
      const res = await UserProfile();

      if (userInfo?.userType === "user") {
        navigate("/");
      }
    };
    fetchDetails();
  }, [userInfo, navigate]);

  const username = userInfo?.username || null;
  const userType = userInfo?.userType || null;

  const logout = async () => {
    await Logout();
    await setUserInfo({});
    localStorage.removeItem("useInfo");
    await navigate("/login");
    // console.log(data);
  };
  return (
    <div>
      <header className="container lg:max-w-7xl mx-auto text-gray-600 body-font">
        <div className=" flex flex-wrap p-5 flex-col md:flex-row items-center">
          <Link
            to={"/"}
            className="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              className="w-10 h-10 text-white p-2 bg-indigo-500 rounded-full"
              viewBox="0 0 24 24"
            >
              <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path>
            </svg>
            <span className="ml-3 hover:text-[#6366F1] font-bold duration-700 ease-in-out  text-2xl">
              Ecommerce
            </span>
          </Link>

          <nav className="md:mr-auto md:ml-4 md:py-1 md:pl-4 md:border-l md:border-gray-400	flex flex-wrap items-center text-base justify-center">
            <Link
              to={"/"}
              className="mr-5 hover:text-[#6366F1] font-bold duration-700 ease-in-out text-lg"
            >
              Home
            </Link>

            {userType === "admin" ? (
              <>
                <Link
                  to={"/dashboard"}
                  className="mr-5 hover:text-[#6366F1] font-bold duration-700 ease-in-out text-lg"
                >
                  Dashboard
                </Link>
              </>
            ) : null}
          </nav>

          {username ? (
            <div className="flex gap-6 items-end  ">
              <h1 className="text-[#6366F1] font-bold text-lg capitalize pb-1">
                {username}
              </h1>

              <button
                onClick={logout}
                className="inline-flex items-center bg-gray-100 text-red-500 border border-red-500  py-1 px-3 focus:outline-none  rounded text-base mt-4 md:mt-0 hover:text-red-300 hover:border-red-300 font-bold duration-700 ease-in-out "
              >
                Logout
              </button>
            </div>
          ) : (
            <div className="flex gap-6">
              <Link to={"/login"}>
                <button className="inline-flex items-center bg-gray-100 border-0 py-1 px-3 focus:outline-none hover:bg-gray-200 rounded text-base mt-4 md:mt-0">
                  Login
                </button>
              </Link>
              <Link to={"/register"}>
                <button className="inline-flex items-center bg-gray-100 border-0 py-1 px-3 focus:outline-none hover:bg-gray-200 rounded text-base mt-4 md:mt-0">
                  Register
                </button>
              </Link>
            </div>
          )}
        </div>
      </header>
    </div>
  );
}

export default Hearder;
