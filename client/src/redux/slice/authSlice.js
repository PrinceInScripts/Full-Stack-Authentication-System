import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../config/axiosInstance";
import { toast } from "react-toastify";

const initialState = {
  isLoggedIn: localStorage.getItem("isLoggedIn") || false,
  isLoading: false,
  error: null,
  user: JSON.parse(localStorage.getItem("user")) || null,
  accessToken: localStorage.getItem("accessToken") || null,
  role: localStorage.getItem("role") || null,
  isAdmin: localStorage.getItem("isAdmin") || false,
  isSuperAdmin: localStorage.getItem("isSuperAdmin") || false,
  isManager: localStorage.getItem("isManager") || false,
  isUser: localStorage.getItem("isUser") || false,
};

export const createAccount = createAsyncThunk("/users/signup", async (data) => {
  try {
    const response = await axiosInstance.post("users/register", data);
    const responseData = response.data;
    toast.success(responseData.message);
    return responseData;
  } catch (error) {
    toast.error(error?.response?.data?.message);
    throw error;
  }
});


const authSlice = createSlice({
  name: "auth",
  initialState,
  reducer: {},
});

export default authSlice.reducer;
