import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../config/axiosInstance";
import { toast } from "react-toastify";

const storedUser = localStorage.getItem("user");
const parsedUser = storedUser ? JSON.parse(storedUser) : null;

const initialState = {
  isLoggedIn: localStorage.getItem("isLoggedIn") || false,
  isLoading: false,
  error: null,
  user: parsedUser,
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

export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (loginData, thunkAPI) => {
    try {
      const response = await axiosInstance.post("/users/login", loginData);
      const responseData = response.data.data;
      console.log(responseData);
      localStorage.setItem("user", JSON.stringify(responseData.loggedInUser));
      localStorage.setItem("accessToken", responseData.accessToken);
      localStorage.setItem("isLoggedIn", true);

      toast.success("Logged in successfully");

      return responseData;
    } catch (error) {
      toast.error(error?.response?.data?.message);
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);


const authSlice = createSlice({
  name: "auth",
  initialState,
  reducer: {},
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isLoggedIn = true;
        state.user = action.payload.loggedInUser;
        state.accessToken = action.payload.accessToken;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export default authSlice.reducer;
