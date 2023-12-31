import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { AppConstants } from "../constants/constants";

export const proQuestionApi = createApi({
  reducerPath: "proQuestionApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${AppConstants.baseUrl}`,
  }),
  endpoints: (builder) => ({
    proQuestion: builder.mutation({
      query: (payload) => {
        return {
          url: `${AppConstants.endPoints.professional_work_profile}`,
          method: "POST",
          body: payload.completeFormData,
          headers: {
            Authorization: `Bearer ${payload.Token}`,
            // "Content-type": "multipart/form-data",
          },
        };
      },
    }),
    ProjectChoice: builder.mutation({
      query: (payload) => {
        return {
          url: `professional-popup/`,
          method: "PATCH",
          body: payload.modalFields,
          headers: {
            Authorization: `Bearer ${payload.Token}`,
          },
        };
      },
    }),

  }),
});

export const { useProQuestionMutation, useProjectChoiceMutation } =
  proQuestionApi;
