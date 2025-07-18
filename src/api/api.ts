import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getValue } from "../Helpers/LocalStorageHelper";

// Define a service using a base URL and expected endpoints
export const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.REACT_APP_API_URL,
    prepareHeaders: (headers, { getState }) => {
      const token = getValue("accessKey");

      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }

      return headers;
    },
  }),
  endpoints: (builder) => ({}),
});

export const translationApi = createApi({
  reducerPath: "translationApi",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.REACT_APP_TRANSLATION_URL,    
  }),
  endpoints: (builder) => ({})
});