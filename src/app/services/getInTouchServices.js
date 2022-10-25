import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { AppConstants } from "../constants/constants";

export const getInTouchApi = createApi({
  reducerPath: "getInTouchApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${AppConstants.baseUrl}`,
  }),
  endpoints: (builder) => ({
    getInTouch: builder.mutation({
      query: (body) => {
        console.log("body", body);
        return {
          url: `${AppConstants.endPoints.get_in_touch}`,
          method: "POST",
          body: body,
        };
      },
    }),
  }),
});

export const { useGetInTouchMutation } = getInTouchApi;
