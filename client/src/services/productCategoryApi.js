import axios from "axios";

const API_URL = "http://localhost:8000/v1";

export const GetProductCategory = async () => {
  try {
    console.log(API_URL);
    return await axios.get(`${API_URL}/category`);
  } catch (error) {
    console.log(error);
  }
};

export const GetProductsByCategory = async (data) => {
  try {
    console.log(API_URL);
    return await axios.post(`${API_URL}/products/byCategory`, data);
  } catch (error) {
    console.log(error);
  }
};
