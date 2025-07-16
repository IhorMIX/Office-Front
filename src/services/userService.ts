import { api } from "../api/api";
import { HttpMethodType } from "../types/HttpInfo";
import { ICurrentUserModel } from "../types/User";

export const UserApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getCurrentUser: builder.query<ICurrentUserModel,null>({
      query: () => ({
        url: "/api/Auth",
        method: HttpMethodType.GET,
        responseHandler: async (response) => {
            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(`HTTP error! Status: ${response.status}, ${errorText}`);
            }
            return response.json();
        },
      }),
    }),
  }),
});

export const { useGetCurrentUserQuery } = UserApi;