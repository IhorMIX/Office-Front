import { api } from "../api/api";
import { HttpMethodType } from "../types/HttpInfo";
import { Project } from "../types/Project";

export const Api = api.injectEndpoints({
  endpoints: (builder) => ({
    getAllProjets: builder.query<Project[],null>({
        query: () => ({
          url: "/api/Project",
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

export const { useGetAllProjetsQuery } = Api;