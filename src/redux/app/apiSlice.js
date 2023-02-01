import {fetchBaseQuery, createApi} from "@reduxjs/toolkit/query/react";
import {logOut, loginAuth} from "../features/authSlice";

const  baseQuery = fetchBaseQuery({
    baseUrl:"http://192.168.1.79:8000",
    credentials:'include',
    prepareHeaders:(headers, {getState}) => {
        const token = getState().auth.token
        if (token) {
            headers.set("authorization", `Bearer ${token}`)
        }
        return headers
    }
});

const baseQueryReauth = async (args, api, extraOptions) => {
    const results = await baseQuery(args, api, extraOptions)

    if (results?.error?.originalStatus === 401) {
        console.log("send a refresh tocen to the server");
       const refreshResult = await baseQuery({url:'/auth/refresh_log',method:'POST'}, api, extraOptions)

       if (refreshResult?.data) {
        const user = api.getState().auth.user

        api.dispatch(loginAuth({...refreshResult.data, user}))

        const results = await baseQuery(args, api, extraOptions)
       }else{
        api.dispatch(logOut());
       }
    }

    return results 
}

export const apiSlice = createApi({
    baseQuery:baseQueryReauth,
    endpoints: builder => ({})
}) 