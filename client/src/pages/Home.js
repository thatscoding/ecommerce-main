import React from "react";
import { Link } from "react-router-dom";
import Carts from "../components/Carts";
import Products from "../components/Products";

function Home() {
  return (
    <div className="container  lg:max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row gap-1">
        <div className="flex-1">
          <Carts />
        </div>
        <div className="flex-1">
          <Products />
        </div>
      </div>
    </div>
  );
}

export default Home;
