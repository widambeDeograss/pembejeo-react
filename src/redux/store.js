import { apiSlice } from "./app/apiSlice";
import authReducer from "./features/authSlice";
import {cartReducer} from "./features/authSlice";
import { configureStore } from "@reduxjs/toolkit";



export const store = configureStore({
    reducer:{
        [apiSlice.reducerPath]: apiSlice.reducer,
        auth: authReducer,
        cart:cartReducer
    },
    middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(apiSlice.middleware),
    devTools:true
})