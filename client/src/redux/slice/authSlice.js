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

export const logoutUser = createAsyncThunk(
  "auth/logoutUser",
  async (_, thunkAPI) => {
    try {
      await axiosInstance.post("/users/logout");
      localStorage.clear();
      return true;
    } catch (error) {
      toast.error("Failed to logout");
      return false;
    }
  }
);

// export const verifyEmail = createAsyncThunk(
//   'auth/verifyEmail',
//   async (verificationToken, thunkAPI) => {
//     try {
//       const response = await axiosInstance.get(`/users/verify-email/${verificationToken}`);
//       const responseData = response.data;
//       toast.success(responseData.message);
//       return responseData;
//     } catch (error) {
//       toast.error(error?.response?.data?.message);
//       return thunkAPI.rejectWithValue(error.response.data);
//     }
//   }
// );

export const forgotPassword = createAsyncThunk(
  "auth/fogorPassword",
  async (forgotPasswordData, thunkAPI) => {
    try {
      const response = await axiosInstance.post("/users/forgot-password", forgotPasswordData);
      const responseData = response.data.data;
      console.log(responseData);

      toast.success("Password reset link sent successfully!");

      return responseData;
    } catch (error) {
      toast.error(error?.response?.data?.message);
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);
export const resetPassword = createAsyncThunk(
  "auth/fogorPassword",
  async (resetPasswordData, thunkAPI) => {
    try {
      const response = await axiosInstance.post(`/users/reset-password/${resetPasswordData.resetPasswordToken}`, resetPasswordData);
      const responseData = response.data.data;
      console.log(responseData);

      toast.success("Reset Password successfully!");

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
      })
      .addCase(logoutUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.isLoading = false;
        state.isLoggedIn = false;
        state.user = null;
        state.accessToken = null;
        localStorage.clear();
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      // .addCase(verifyEmail.pending, (state) => {
      //   state.isLoading = true;
      //   state.error = null;
      // })
      // .addCase(verifyEmail.fulfilled, (state, action) => {
      //   state.isLoading = false;
      //   // Update state based on the response if needed
      // })
      // .addCase(verifyEmail.rejected, (state, action) => {
      //   state.isLoading = false;
      //   state.error = action.payload;
      // });
  },
});

export default authSlice.reducer;
