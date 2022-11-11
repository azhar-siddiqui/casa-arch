import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { AppConstants } from "../constants/constants";

export const customerLeadsApi = createApi({
  reducerPath: "customerLeadsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${AppConstants.baseUrl}`,
  }),
  endpoints: (builder) => ({
    customerDetailsLeads: builder.query({
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
  }),
});

export const { useCustomerDetailsLeadsQuery } = customerLeadsApi;
