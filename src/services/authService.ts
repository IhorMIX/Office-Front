import { api } from "../api/api";
import { HttpMethodType } from "../types/HttpInfo";
import { ILoginData } from "../types/User";

export const authApi = api.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (data: ILoginData) => ({
        body: data,
        url: "/api/Auth/login",
        method: HttpMethodType.POST,
        responseHandler: (response) => response.json(),
      }),
    }),
    logOut: builder.mutation({
      query: (data: null) => ({
        url: "/api/Auth/logout",
        method: HttpMethodType.POST,
        responseHandler: (response) => response.json(),
      }),
    }),
  }),
});

export const { useLoginMutation, useLogOutMutation } = authApi;
