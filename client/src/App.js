import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./pages/Layout";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Register from "./pages/Register";
import CreateProduct from "./components/CreateProduct";
import EditProduct from "./components/EditProduct";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/editProduct/:id" element={<EditProduct />} />
          <Route path="/addProduct" element={<CreateProduct />} />

          <Route path="*" element={<h1>No page found</h1>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
