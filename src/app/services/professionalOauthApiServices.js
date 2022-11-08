import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { AppConstants } from "../constants/constants";

export const professionalOauthApi = createApi({
  reducerPath: "professionalOauthApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${AppConstants.baseUrl}`,
  }),
  endpoints: (builder) => ({
    professionalSignUp: builder.mutation({
      query: (body) => {
        const data = {
          name: body.name,
          company_name: body.company_name,
          company_website: body.company_website,
          email: body.email,
          password: body.password,
        };
        return {
          // url: `${AppConstants.professional_signup}`,
          url: `${AppConstants.endPoints.professional_signup}`,
          method: "POST",
          body: data,
          // headers: {
          //   Authorization: `Bearer ${body.token}`,
          // },
        };
      },
    }),
    professionalLogin: builder.mutation({
      query: (body) => {
        console.log("professionalOauthApi Login body", body);
        return {
          // url: `${AppConstants.professional_signup}`,
          url: `${AppConstants.endPoints.professional_Login}`,
          method: "POST",
          body: body,
        };
      },
    }),
    professionalType: builder.mutation({
      query: (Token) => {
        return {
          url: `${AppConstants.endPoints.user_Type}`,
          method: "GET",
          headers: {
            Authorization: `Bearer ${Token}`,
          },
        };
      },
    }),
    professionalSignUpPatch: builder.mutation({
      query: (payload) => {
        return {
          url: `${AppConstants.endPoints.professional_signup_patch}`,
          method: "PATCH",
          body: payload.body,
          headers: {
            Authorization: `Bearer ${payload.Token}`,
          },
        };
      },
    }),
  }),
});

export const {
  useProfessionalSignUpMutation,
  useProfessionalLoginMutation,
  useProfessionalTypeMutation,
  useProfessionalSignUpPatchMutation,
} = professionalOauthApi;
