import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const demoApi = createApi({
  reducerPath: 'demoApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://httpstat.us/' }), // API hỗ trợ giả lập status code
  endpoints: (builder) => ({
    // Endpoint test lỗi 404
    get404Error: builder.query({
      query: () => '404',
    }),
    // Endpoint test lỗi 500
    get500Error: builder.query({
      query: () => '500',
    }),
    // Endpoint test lỗi 401
    get401Error: builder.query({
      query: () => '401',
    }),
  }),
});

export const {
  useLazyGet404ErrorQuery,
  useLazyGet500ErrorQuery,
  useLazyGet401ErrorQuery,
} = demoApi;