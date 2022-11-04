import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { AppConstants } from "../constants/constants";

export const checkPointsApi = createApi({
  reducerPath: "checkPointsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${AppConstants.baseUrl}`,
  }),
  endpoints: (builder) => ({
    professionalAreaCheckPoints: builder.mutation({
      query: (Token) => {
        return {
          url: `${AppConstants.endPoints.professional_area_check}`,
          method: "GET",
          headers: {
            Authorization: `Bearer ${Token}`,
          },
        };
      },
    }),
    professionalServiceCheckPoints: builder.mutation({
      query: (Token) => {
        return {
          url: `${AppConstants.endPoints.professional_service_check}`,
          method: "GET",
          headers: {
            Authorization: `Bearer ${Token}`,
          },
        };
      },
    }),
    professionalSubscriptionCheckPoints: builder.mutation({
      query: (Token) => {
        return {
          url: `${AppConstants.endPoints.professional_subscription_check}`,
          method: "GET",
          headers: {
            Authorization: `Bearer ${Token}`,
          },
        };
      },
    }),
  }),
});

export const {
  useProfessionalAreaCheckPointsMutation,
  useProfessionalServiceCheckPointsMutation,
  useProfessionalSubscriptionCheckPointsMutation,
} = checkPointsApi;
