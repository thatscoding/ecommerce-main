import axios from "axios";

const API_URL = "http://localhost:8000/v1";

export const GetAllProducts = async (data) => {
  try {
    console.log(API_URL);
    return await axios.get(`${API_URL}/products`);
  } catch (error) {
    console.log(error);
  }
};

export const GetProductById = async (id) => {
  try {
    console.log(API_URL);
    return await axios.get(`${API_URL}/products/${id}`);
  } catch (error) {
    console.log(error);
  }
};

export const AddProduct = async (data) => {
  try {
    console.log(API_URL);
    return await axios.post(`${API_URL}/products`, data, {
      withCredentials: true,
    });
  } catch (error) {
    console.log(error);
  }
};

export const UpdateProduct = async (data, id) => {
  try {
    console.log(API_URL);
    return await axios.put(`${API_URL}/products/${id}`, data, {
      withCredentials: true,
    });
  } catch (error) {
    console.log(error);
  }
};

export const DeleteProductById = async (id) => {
  try {
    console.log(API_URL);
    return await axios.delete(`${API_URL}/products/${id}`, {
      withCredentials: true,
    });
  } catch (error) {
    console.log(error);
  }
};
