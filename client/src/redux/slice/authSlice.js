import { configureStore, createSlice } from "@reduxjs/toolkit";

const initialState ={
    isLoggedIn:localStorage.getItem("isLoggedIn") || false,
    isLoading:false,
    error:null,
    user:JSON.parse(localStorage.getItem("user")) || null,
    accessToken:localStorage.getItem("accessToken") || null,
    role:localStorage.getItem("role") || null,
    isAdmin:localStorage.getItem("isAdmin") || false,
    isSuperAdmin:localStorage.getItem("isSuperAdmin") || false,
    isManager:localStorage.getItem("isManager") || false,
    isUser:localStorage.getItem("isUser") || false
}

const authSlice=createSlice({
    name:"auth",
    initialState ,
    reducer:{}
})

export default authSlice.reducer