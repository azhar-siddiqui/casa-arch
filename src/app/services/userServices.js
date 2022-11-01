import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const userServicesApi = createApi({
   reducerPath: "postApi",
   baseQuery: fetchBaseQuery({
      baseUrl: "https://ad.casaarch.in/api/",
   }),
   endpoints: (builder) => ({

      joinUser: builder.mutation({
         query: (body) => ({
            url: `/user-signup`,
            method: "POST",
            body: body,
            headers: {
               "Content-type": "application/json; charset=UTF-8",
            },
         })
      }),
      loginUser: builder.mutation({
         query: (body) => ({
            url: `/user-login`,
            method: "POST",
            body: body,
            headers: {
               "Content-type": "application/json; charset=UTF-8",
            },
         })
      }),

      getProjectDetails: builder.query({
         query: () => ({
            url: `/customer-project-details/`,
            headers: {
               "Authorization": `Bearer ${sessionStorage.getItem('access')}`
            },
         }),
      }),

      getQuestions: builder.query({
         query: () => ({
            url: `/customer-query/`,
            headers: {
               "Authorization": `Bearer ${sessionStorage.getItem('access')}`
            },
         }),
      }),

      getUserId: builder.query({
         query: () => ({
            url: `/user-id`,
            headers: {
               "Authorization": `Bearer ${sessionStorage.getItem('access')}`
            },
            // prepareHeaders: (headers, { getState }) => {
            //    headers.set('Authorization', `Bearer ${sessionStorage.getItem('access')}`)
            //    return headers
            // }
         }),
      }),
      getUserType: builder.query({
         query: () => ({
            url: `/user-type`,
            headers: {
               "Authorization": `Bearer ${sessionStorage.getItem('access')}`
            },
         }),
      }),

      submitSteppers: builder.mutation({
         query: (body) => ({
            url: `/customer-query/`,
            method: "POST",
            body: body,
            headers: {
               "Authorization": `Bearer ${sessionStorage.getItem('access')}`
            },
         })
      }),

      postRequirements: builder.mutation({
         query: (body) => ({
            url: `/project-details/`,
            method: "POST",
            body: body,
            headers: {
               "Authorization": `Bearer ${sessionStorage.getItem('access')}`
            },
         })
      }),

      getArchitects: builder.query({
         query: () => ({
            url: `architects/`,
            headers: {
               "Authorization": `Bearer ${sessionStorage.getItem('access')}`
            },
         }),
      }),
      getInteriorDesigners: builder.query({
         query: () => ({
            url: `interior-designer/`,
            headers: {
               "Authorization": `Bearer ${sessionStorage.getItem('access')}`
            },
         }),
      }),
      sendOtp: builder.mutation({
         query: (body) => ({
            url: `/sendotp/`,
            method: "POST",
            body: body
         })
      }),
      verifyOtp: builder.mutation({
         query: (body) => ({
            url: `/otpverification/`,
            method: "POST",
            body: body
         })
      }),

   }),
});

export const {
   useJoinUserMutation,
   useLoginUserMutation,
   useSubmitSteppersMutation,
   usePostRequirementsMutation,
   useLazyGetQuestionsQuery,
   useGetUserIdQuery,
   useLazyGetUserTypeQuery,
   useLazyGetUserIdQuery,
   useGetProjectDetailsQuery,
   useGetArchitectsQuery,
   useGetInteriorDesignersQuery,
   useSendOtpMutation,
   useVerifyOtpMutation,
} = userServicesApi;
