import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { AppConstants } from "../constants/constants";

export const customerLeadsApi = createApi({
  reducerPath: "customerLeadsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${AppConstants.baseUrl}`,
  }),
  endpoints: (builder) => ({
    customerDetailsLeads: builder.mutation({
      query: () => {
        let Token = localStorage.getItem("Token");
        return {
          url: `${AppConstants.endPoints.customer_details_leads}`,
          method: "GET",
          headers: {
            Authorization: `Bearer ${Token}`,
          },
        };
      },
    }),
    customerDetailsLead: builder.mutation({
      query: (body) => {
        let Token = localStorage.getItem("Token");
        return {
          url: `${AppConstants.endPoints.customer_details_lead}/${body.id}`,
          method: "GET",
          headers: {
            Authorization: `Bearer ${Token}`,
          },
        };
      },
    }),
    DesignLeads: builder.mutation({
      query: () => {
        let Token = localStorage.getItem("Token");
        console.log("Token", Token);
        return {
          url: `${AppConstants.endPoints.design_leads_all}`,
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
  useCustomerDetailsLeadsMutation,
  useCustomerDetailsLeadMutation,
  useDesignLeadsMutation,
} = customerLeadsApi;
