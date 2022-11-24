import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { AppConstants } from "../constants/constants";

export const professionalServicesApi = createApi({
  reducerPath: "professionalServicesApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${AppConstants.baseUrl}`,
  }),
  endpoints: (builder) => ({
    professionalService: builder.mutation({
      query: (body) => {
        const data = {
          area: body.loc,
          pin_code: body.pincode,
          is_meeting_remotely: body.preference,
        };
        console.log("professionalServicesApi body", data);
        return {
          url: `${AppConstants.endPoints.professional_signup}`,
          method: "PATCH",
          body: data,
          headers: {
            Authorization: `Bearer ${localStorage.getItem("Token")}`,
          },
        };
      },
    }),
    professionalAreaCheckService: builder.mutation({
      query: () => {
        return {
          url: `${AppConstants.endPoints.professional_area_check}`,
          method: "GET",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("Token")}`,
          },
        };
      },
    }),
    professionalSubscribe: builder.mutation({
      query: (body) => ({
        url: `${AppConstants.endPoints.professional_payment}`,
        method: "POST",
        body: body.body,
        headers: {
          Authorization: `Bearer ${body.token}`,
        },
      }),
    }),
    subscribe: builder.mutation({
      query: (body) => ({
        url: `${AppConstants.endPoints.professional_payment}`,
        method: "POST",
        body: body,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("Token")}`,
        },
      }),
    }),

  }),
});

export const {
  useProfessionalServiceMutation,
  useProfessionalAreaCheckServiceMutation,
  useProfessionalSubscribeMutation,
  useSubscribeMutation
} = professionalServicesApi;
