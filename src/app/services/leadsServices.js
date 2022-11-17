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
    SearchLeads: builder.mutation({
      query: (body) => {
        return {
          url: `${AppConstants.endPoints.search_leads_all}`,
          method: "GET",
          headers: {
            Authorization: `Bearer ${body.token}`,
          },
        };
      },
    }),
    DesignLeads: builder.mutation({
      query: (body) => {
        return {
          url: `${AppConstants.endPoints.design_leads_all}`,
          method: "GET",
          headers: {
            Authorization: `Bearer ${body.token}`,
          },
        };
      },
    }),
    OnGoingProjectLeads: builder.mutation({
      query: (body) => {
        return {
          url: `${AppConstants.endPoints.project_leads_all}`,
          method: "GET",
          headers: {
            Authorization: `Bearer ${body.token}`,
          },
        };
      },
    }),
    SearchLeadAddOrRemFav: builder.mutation({
      query: (body) => {
        return {
          url: `${AppConstants.endPoints.search_lead_add_or_remove}`,
          method: "PATCH",
          body: body,
          headers: {
            Authorization: `Bearer ${body.token}`,
          },
        };
      },
    }),
    designLeadAddOrRemFav: builder.mutation({
      query: (body) => {
        return {
          url: `${AppConstants.endPoints.design_lead_add_or_remove}`,
          method: "PATCH",
          body: body,
          headers: {
            Authorization: `Bearer ${body.token}`,
          },
        };
      },
    }),
    ongoingProjectLeadAddOrRemFav: builder.mutation({
      query: (body) => {
        return {
          url: `${AppConstants.endPoints.ongoingProject_lead_add_or_remove}`,
          method: "PATCH",
          body: body,
          headers: {
            Authorization: `Bearer ${body.token}`,
          },
        };
      },
    }),
    SearchLeadFvt: builder.mutation({
      query: (body) => {
        return {
          url: `${AppConstants.endPoints.search_lead_fvt}`,
          method: "GET",
          headers: {
            Authorization: `Bearer ${body.token}`,
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
  useSearchLeadsMutation,
  useOnGoingProjectLeadsMutation,
  useSearchLeadAddOrRemFavMutation,
  useDesignLeadAddOrRemFavMutation,
  useOngoingProjectLeadAddOrRemFavMutation,
  useSearchLeadFvtMutation,
} = customerLeadsApi;
