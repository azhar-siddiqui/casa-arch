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
        console.log("professionalServicesApi body", body);
        return {
          url: `${AppConstants.endPoints.professional_signup}`,
          method: "PATCH",
          body: body,
        };
      },
    }),
  }),
});

export const { useProfessionalServiceMutation } = professionalServicesApi;
