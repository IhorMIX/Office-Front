import { api } from "../api/api";
import { HttpMethodType } from "../types/HttpInfo";
import { AddEmployees, CreateProject, Project, ProjectInfo } from "../types/Project";

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
    AddEmployees: builder.mutation({
      query: (employees: AddEmployees) => ({
        url: `/api/project/employees`,
        body: employees,
        method: HttpMethodType.PUT,
        responseHandler: async (response) => {
          if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`HTTP error! Status: ${response.status}, ${errorText}`);
          }
          const text = await response.text();
          return text ? JSON.parse(text) : null;
        },
      }),
    }),
  }),
});

export const { useGetAllProjetsQuery, useGetProjectQuery, useCreateProjectMutation, useAddEmployeesMutation} = Api;