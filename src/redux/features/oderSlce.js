import { apiSlice } from "../app/apiSlice";

export const odersApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        farmerOders: builder.mutation({
            query: credentials => ({
                url: "",
                method: "POST",
                body: { ...credentials }
            })
        })
    })
});


export const {
    useFarmerOdersMutation
} = odersApiSlice;

export const getStationApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        station: builder.mutation({
            query: credentials => ({
                url: "/fertilizer_at_station",
                method: "POST",
                body: { ...credentials }
            })
        })
    })
});


export const {
    useStationMutation
} = getStationApiSlice;

export const getStationOdersApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        stationOders: builder.mutation({
            query: credentials => ({
                url: "/station_order",
                method: "POST",
                body: { ...credentials }
            })
        })
    })
});


export const {
    useStationOdersMutation
} = getStationOdersApiSlice;

export const createOderApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        createOder: builder.mutation({
            query: credentials => ({
                url: "/create_order",
                method: "POST",
                body: { ...credentials }
            })
        })
    })
});


export const {
    useCreateOderMutation
} = createOderApiSlice;