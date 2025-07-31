import { api } from "../api/api";
import { BaseManager, CreateManager, HrManager, ProjectManager, UpdateManager } from "../types/Employee";
import { HttpMethodType } from "../types/HttpInfo";

export const Api = api.injectEndpoints({
  endpoints: (builder) => ({
    getAllManagers: builder.query<BaseManager[], null>({
      query: () => ({
        url: "/api/manager",
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
    getProjectManagers: builder.query<ProjectManager[], null>({
      query: () => ({
        url: "/api/manager/project-managers",
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
    getHrManagers: builder.query<HrManager[], null>({
      query: () => ({
        url: "/api/manager/hr-managers",
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
    delManager: builder.mutation({
      query: (requestId:number) => ({
        url: `/api/manager/${requestId}`,
        method: HttpMethodType.DELETE,
        responseHandler: async (response) => {
          if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`HTTP error! Status: ${response.status}, ${errorText}`);
          }
          return response.json();
        },
      }),
    }),
    createProjectManager: builder.mutation({
      query: (manager:CreateManager) => ({
        url: `/api/manager/project-manager`,
        method: HttpMethodType.POST,
        body:manager,
        responseHandler: async (response) => {
          if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`HTTP error! Status: ${response.status}, ${errorText}`);
          }
          return response.json();
        },
      }),
    }),
    createHrManager: builder.mutation({
      query: (manager:CreateManager) => ({
        url: `/api/manager/hr-manager`,
        method: HttpMethodType.POST,
        body: manager,
        responseHandler: async (response) => {
          if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`HTTP error! Status: ${response.status}, ${errorText}`);
          }
          return response.json();
        },
      }),
    }),
    UpdateManager: builder.mutation({
      query: (manager:UpdateManager) => ({
        url: `/api/manager`,
        method: HttpMethodType.PUT,
        body: manager,
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

export const { useGetAllManagersQuery, useDelManagerMutation, useGetProjectManagersQuery, useGetHrManagersQuery,
  useCreateHrManagerMutation, useCreateProjectManagerMutation, useUpdateManagerMutation
} = Api;