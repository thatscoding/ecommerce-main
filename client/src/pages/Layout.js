import React from "react";
import Hearder from "../components/Hearder";
import { Outlet } from "react-router-dom";

function Layout() {
  return (
    <div>
      <Hearder />
      <div className="">
        <Outlet />
      </div>
    </div>
  );
}

export default Layout;
