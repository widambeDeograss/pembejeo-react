import { apiSlice } from "../app/apiSlice";

export const authApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        login: builder.mutation({
            query: credentials => ({
                url: "/auth/login",
                method: "POST",
                body: { ...credentials }
            })
        })
    })
});


export const authRegApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        register: builder.mutation({
            query: credentials => ({
                url: "/auth/register",
                method: "POST",
                body: { ...credentials }
            })
        })
    })
})


export const {
    useLoginMutation
} = authApiSlice;

export const {
    useRegisterMutation
} = authRegApiSlice;