import { api } from "../api/api";
import { HttpMethodType } from "../types/HttpInfo";
import { CreateProject, Project, ProjectInfo } from "../types/Project";

export const Api = api.injectEndpoints({
  endpoints: (builder) => ({
    getAllProjets: builder.query<Project[],null>({
        query: () => ({
          url: "/api/project",
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
    getProject: builder.query<ProjectInfo, number>({
      query: (projectId:number) => ({
        url: `/api/project/${projectId}`,
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
    CreateProject: builder.mutation({
      query: (project:CreateProject) => ({
        url: `/api/project/create-project`,
        body: project,
        method: HttpMethodType.POST,
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

export const { useGetAllProjetsQuery, useGetProjectQuery, useCreateProjectMutation} = Api;