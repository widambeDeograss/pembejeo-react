import { createSlice } from "@reduxjs/toolkit";

const token = localStorage.getItem('token') ?
    localStorage.getItem('token') : null


const station = localStorage.getItem('station_info') ?
    localStorage.getItem('station_info') : null

const authSlice = createSlice({
    name: "auth",
    initialState: { user: null, token: token, station: station },
    reducers: {
        loginAuth: (state, action) => {
            const { user, token, station_info } = action.payload
            state.user = user
            state.token = token
            state.station = station_info
        },
        logOut: (state, action) => {
            state.user = null
            state.token = null
        }
    }
});

const cartSlice = createSlice({
    name: "cart",
    initialState: {
        cart: [],
    },
    reducers: {
        addToCart: (state, action) => {
            const itemInCart = state.cart.find((item) => item.id === action.payload.id);
            if (itemInCart) {
                itemInCart.quantity++;
            } else {
                state.cart.push({...action.payload });
            }
        }
    }
});

export const {
    addToCart
} = cartSlice.actions;

export const cartReducer = cartSlice.reducer;

export const { logOut, loginAuth } = authSlice.actions;

export default authSlice.reducer;

export const selectCurrentUser = (state) => state.auth.user;

export const selectCurrentCart = (state) => state.cart.cart;

export const selectCurrentToken = (state) => state.auth.token;

export const selectCurrentStation = (state) => state.auth.station;