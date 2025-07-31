import { api } from "../api/api";
import { HttpMethodType } from "../types/HttpInfo";
import { AbsenceReason,Selection } from "../types/Selection";


export const Api = api.injectEndpoints({
  endpoints: (builder) => ({
    getAbsenceReason: builder.query<AbsenceReason[], null>({
      query: () => ({
        url: "/api/AbsenceReason",
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
    getProjectType: builder.query<Selection[], null>({
      query: () => ({
        url: "/api/ProjectType",
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
    getSubdivisions: builder.query<Selection[], null>({
      query: () => ({
        url: "/api/Subdivision",
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
    getPositions: builder.query<Selection[], null>({
      query: () => ({
        url: "/api/Position",
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

export const { useGetAbsenceReasonQuery, useGetProjectTypeQuery, useGetPositionsQuery, useGetSubdivisionsQuery } = Api;