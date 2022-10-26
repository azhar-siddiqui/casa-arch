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
        console.log("professionalOauthApi body", body);
        return {
          // url: `${AppConstants.professional_signup}`,
          url: `${AppConstants.endPoints.professional_signup}`,
          method: "POST",
          body: body,
        };
      },
    }),
    professionalLogin: builder.mutation({
      query: (body) => {
        console.log("professionalOauthApi Login body", body);
        return {
          // url: `${AppConstants.professional_signup}`,
          url: `${AppConstants.endPoints.professional_signup}`,
          method: "POST",
          body: body,
        };
      },
    }),
  }),
});

export const { useProfessionalSignUpMutation } = professionalOauthApi;
