import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../config/axiosInstance"
import { toast } from "react-toastify";

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

export const createAccount=createAsyncThunk("/users/signup",async (data)=>{
    try {
        const response=axiosInstance.post("users/register",data)

        console.log(response);
        toast.promise(response,{
            loading:"wait ! creating your account",
            success:(data)=>{
                return data?.data?.message
            },
            error:"Faild to create your account"
        })

        return await response;
    } catch (error) {
        
    }
})

const authSlice=createSlice({
    name:"auth",
    initialState ,
    reducer:{}
})

export default authSlice.reducer