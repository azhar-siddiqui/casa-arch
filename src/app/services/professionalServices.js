import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const postApi = createApi({
  reducerPath: "postApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://ad.casaarch.in/api/",
  }),
  endpoints: (builder) => ({
    joinProfessional: builder.mutation({
      query: (body) => {
        console.log("body", body);
        return {
          url: `posts`,
          method: "POST",
          body: body,
          //   headers: {
          //     "Content-type": "application/json; charset=UTF-8",
          //   },
        };
      },
    }),
    getProfessionals: builder.query({
      query: () => ({
        url: `professional-profile-details/`,
        headers: {
          "Authorization": `Bearer ${sessionStorage.getItem('access')}`
        },
      }),
    }),
  }),
});

export const { useJoinProfessionalMutation, useGetProfessionalsQuery } = postApi;