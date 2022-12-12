import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const blogsServicesApi = createApi({
  reducerPath: "postApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://ad.casaarch.in/api/",
  }),
  endpoints: (builder) => ({
    getBlogs: builder.query({
      query: () => ({
        url: `/blog/`,
        method: "GET",
      }),
    }),
    getServices: builder.query({
      query: () => ({
        url: `/services/`,
        method: "GET",
      }),
    }),
    getSingleBlog: builder.query({
      query: (id) => ({
        url: `/blog/${id}`,
        method: "GET",
      }),
    }),
    getSingleService: builder.query({
      query: (id) => ({
        url: `/services/${id}`,
        method: "GET",
      }),
    }),
    subscribeNewsletter: builder.mutation({
      query: (body) => ({
        url: `/newsletter/`,
        method: "POST",
        body: body,
      }),
    }),
  }),
});

export const {
  useLazyGetBlogsQuery,
  useLazyGetSingleBlogQuery,
  useLazyGetServicesQuery,
  useLazyGetSingleServiceQuery,
  useSubscribeNewsletterMutation,
} = blogsServicesApi;
