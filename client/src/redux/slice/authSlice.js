import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../config/axiosInstance";
import { toast } from "react-toastify";

const setUserLocalStorage = (userData) => {
  localStorage.setItem("user", JSON.stringify(userData));
  localStorage.setItem("role", userData.role);
  localStorage.setItem("isAdmin", userData.role === "ADMIN");
  localStorage.setItem("isSuperAdmin", userData.role === "SUPERADMIN");
  localStorage.setItem("isManager", userData.role === "MANAGER");
  localStorage.setItem("isUser", userData.role === "USER");
};

const initialState = {
  isLoggedIn: localStorage.getItem("isLoggedIn") || false,
  isLoading: false,
  error: null,
  user: localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : null,
  accessToken: localStorage.getItem("accessToken") || null,
  role: localStorage.getItem("role") || null,
  isAdmin: localStorage.getItem("isAdmin") || false,
  isSuperAdmin: localStorage.getItem("isSuperAdmin") || false,
  isManager: localStorage.getItem("isManager") || false,
  isUser: localStorage.getItem("isUser") || false,
};

// Thunks
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
      setUserLocalStorage(responseData.loggedInUser);
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

export const verifyEmail = createAsyncThunk(
  'auth/verifyEmail',
  async (verificationToken, thunkAPI) => {
    try {
      const response = await axiosInstance.get(`/users/verify-email/${verificationToken}`);
      const responseData = response.data;
      toast.success(responseData.message);
      return responseData;
    } catch (error) {
      toast.error(error?.response?.data?.message);
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const forgotPassword = createAsyncThunk(
  "auth/forgotPassword",
  async (forgotPasswordData, thunkAPI) => {
    try {
      const response = await axiosInstance.post("/users/forgot-password", forgotPasswordData);
      const responseData = response.data.data;
      toast.success("Password reset link sent successfully!");
      return responseData;
    } catch (error) {
      toast.error(error?.response?.data?.message);
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const resetPassword = createAsyncThunk(
  "auth/resetPassword",
  async (resetPasswordData, thunkAPI) => {
    try {
      const response = await axiosInstance.post(`/users/reset-password/${resetPasswordData.resetPasswordToken}`, resetPasswordData);
      const responseData = response.data.data;
      toast.success("Reset Password successfully!");
      return responseData;
    } catch (error) {
      toast.error(error?.response?.data?.message);
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);



export const getCurrentUser = createAsyncThunk(
  "auth/getCurrentUser",
  async (_, thunkAPI) => {
    try {
      const response = await axiosInstance.get("/users/current-user");
      const responseData = response.data.data;
      setUserLocalStorage(responseData);
      return responseData;
    } catch (error) {
      toast.error("Failed to get current user data");
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const updateAvatar=createAsyncThunk("auth/updateAvatar",async (avatar,thunkAPI)=>{
  try {
    const response=await axiosInstance("/users/avatar",avatar);
    const responseData=response.data.data;
    setUserLocalStorage(responseData.loggedInUser);
    toast.success("Update Profile Image Successfully");
    return responseData;
  } catch (error) {
    toast.error(error?.response?.data?.message);
      return thunkAPI.rejectWithValue(error.response.data);
  }
})

export const updateProfile=createAsyncThunk("auth/updateProfile",async (data,thunkAPI)=>{
  try {
    const response=await axiosInstance("/users/update-profile",data);
    const responseData=response.data.data;
    setUserLocalStorage(responseData.loggedInUser);
    toast.success("Update Profile Successfully");
    return responseData;
  } catch (error) {
    toast.error(error?.response?.data?.message);
      return thunkAPI.rejectWithValue(error.response.data);
  }
})

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
        const userRole = action.payload.loggedInUser.role;
        state.role = userRole;
        state.isAdmin = userRole === "ADMIN";
        state.isSuperAdmin = userRole === "SUPERADMIN";
        state.isManager = userRole === "MANAGER";
        state.isUser = userRole === "USER";
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
      .addCase(verifyEmail.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(verifyEmail.fulfilled, (state, action) => {
        state.isLoading = false;
      })
      .addCase(verifyEmail.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(getCurrentUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getCurrentUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
        state.role = action.payload.role;
        state.isAdmin = action.payload.role === "ADMIN";
        state.isSuperAdmin = action.payload.role === "SUPERADMIN";
        state.isManager = action.payload.role === "MANAGER";
        state.isUser = action.payload.role === "USER";
      })
      .addCase(getCurrentUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(updateAvatar.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updateAvatar.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.loggedInUser;
        // If needed, update other state properties based on the response
      })
      .addCase(updateAvatar.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(updateProfile.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updateProfile.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.loggedInUser;
        // If needed, update other state properties based on the response
      })
      .addCase(updateProfile.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
  },
});

export default authSlice.reducer;