import axios from "axios";

const API_URL = "http://localhost:8000/v1";

export const RegisterUser = async (data) => {
  try {
    console.log(API_URL);
    return await axios.post(`${API_URL}/users/register`, data);
  } catch (error) {
    console.log(error);
  }
};

export const LoginUser = async (data) => {
  try {
    console.log(`${API_URL}/user/login`);
    return await axios.post(`${API_URL}/users/login`, data, {
      withCredentials: true,
    });
  } catch (error) {
    console.log(error);
  }
};

export const UserProfile = async () => {
  try {
    return await axios.get(`${API_URL}/users/profile`);
  } catch (error) {
    console.log(error);
  }
};

export const Logout = async () => {
  try {
    return await axios.get(`${API_URL}/users/logout`, {
      withCredentials: true,
    });
  } catch (error) {
    console.log(error);
  }
};
