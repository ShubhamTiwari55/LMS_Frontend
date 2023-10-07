import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";

import axiosInstance from '../../Helpers/axiosInstance'
const initialState = {
    isLoggedIn: localStorage.getItem('isLoggedIn') || false,
    role: localStorage.getItem('role') || "",
    data: localStorage.getItem('data') != "undefined" ? JSON.parse(localStorage.getItem('data')) : {}
};

// export const createAccount = async (data)=>{
//     try{
//         const res = axiosInstance.post("/user/register", data);
//         toast.promise(res, {
//             loading: "Wait! Creating your account",
//             success: (data)=>{
//                 return data?.data?.message;
//             },
//             error: "Failed to create account"
//         });

//         return (await res).data;
//     }catch(error){
//         toast.error(error?.response?.data?.message);
//     }
// }
export const createAccount = createAsyncThunk("/auth/signup", async (data)=>{
    try{
        const res = axiosInstance.post("/user/register", data);
        toast.promise(res, {
            loading: "Wait! Creating your account",
            success: (data)=>{
                return data?.data?.message;
            },
            error: "Failed to create account"
        });

        return (await res).data;
    }catch(error){
        toast.error(error?.response?.data?.message);
    }
})

export const login = createAsyncThunk("/auth/login", async (data)=>{
    try{
        const res = axiosInstance.post("/user/login", data);
        toast.promise(res, {
            loading: "Wait! authentication in progress",
            success: (data)=>{
                return data?.data?.message;
            },
            error: "Failed to login"
        });

        return (await res).data;
    }catch(error){
        toast.error(error?.response?.data?.message);
    }
});

export const logout = createAsyncThunk("/auth/logout", async ()=>{
    try{
        const res = axiosInstance.post("/user/logout");
        toast.promise(res, {
            loading: "Wait! logout in progress",
            success: (data)=>{
                return data?.data?.message;
            },
            error: "Failed to log out"
        });

        return (await res).data;
    }catch(error){
        toast.error(error?.response?.data?.message);
    }
})
//we cannot pass two parameters i.e id and data in thunk as the second parameter is thunkAPI by defualt so we need to pass the arguments as arrays
export const updateprofile = createAsyncThunk("/user/update/profile", async (data)=>{
    try{
        const res = axiosInstance.put(`/user/update/${data[0]}`, data[1]);
        toast.promise(res, {
            loading: "Wait! profile updation in progress",
            success: (data)=>{
                return data?.data?.message;
            },
            error: "Failed to update profile"
        });

        return (await res).data;
    }catch(error){
        toast.error(error?.response?.data?.message);
    }
})

export const getUserData = createAsyncThunk("/user/details", async (id, data)=>{
    try{
        const res = axiosInstance.get("/user/me", data);
        return (await res).data;
    }catch(error){
        toast.error(error.messages);
    }
})

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
        .addCase(login.fulfilled, (state, action)=>{
            if(!action?.payload?.user) return;
            localStorage.setItem("data", JSON.stringify(action?.payload?.user));
            localStorage.setItem("isLoggedIn", true);
            localStorage.setItem("role", action?.payload?.user?.role);
            state.isLoggedIn = true;
            state.data = action?.payload?.user;
            state.role = action?.payload?.user?.role
        })
        .addCase(logout.fulfilled, (state)=>{
            localStorage.clear();
            state.data = {};
            state.isLoggedIn = false;
            state.role = "";
        })
        .addCase(getUserData.fulfilled, (state, action)=>{
            localStorage.setItem("data", JSON.stringify(action?.payload?.user));
            localStorage.setItem("isLoggedIn", true);
            localStorage.setItem("role", action?.payload?.user?.role);
            state.isLoggedIn = true;
            state.data = action?.payload?.user;
            state.role = action?.payload?.user?.role
        })
    }
}); 

// export const {} = authslice.actions;
export default authSlice.reducer