import { api } from "../api/api";
import { HttpMethodType } from "../types/HttpInfo";
import { AbsenceReason,Selection } from "../types/Selection";


export const Api = api.injectEndpoints({
  endpoints: (builder) => ({
    //get
    getAbsenceReason: builder.query<AbsenceReason[], null>({
      query: () => ({
        url: "/api/absenceReason",
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
        url: "/api/projecttype",
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
        url: "/api/position",
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
    //create
    createSubdivision: builder.mutation<Selection, Partial<Selection>>({
            query: (data) => ({
                url: "/api/subdivision/create-subdivision",
                method: HttpMethodType.POST,
                body: data,
                responseHandler: async (response) => {
                    if (!response.ok) {
                        const errorText = await response.text();
                        throw new Error(`HTTP error! Status: ${response.status}, ${errorText}`);
                    }
                    return response.json();
                },
            }),
        }),
        createPosition: builder.mutation<Selection, Partial<Selection>>({
            query: (data) => ({
                url: "/api/position/create-position",
                method: HttpMethodType.POST,
                body: data,
                responseHandler: async (response) => {
                    if (!response.ok) {
                        const errorText = await response.text();
                        throw new Error(`HTTP error! Status: ${response.status}, ${errorText}`);
                    }
                    return response.json();
                },
            }),
        }),
        createProjectType: builder.mutation<Selection, Partial<Selection>>({
            query: (data) => ({
                url: "/api/projecttype/create-projectType",
                method: HttpMethodType.POST,
                body: data,
                responseHandler: async (response) => {
                    if (!response.ok) {
                        const errorText = await response.text();
                        throw new Error(`HTTP error! Status: ${response.status}, ${errorText}`);
                    }
                    return response.json();
                },
            }),
        }),
        createAbsenceReason: builder.mutation<AbsenceReason, Partial<AbsenceReason>>({
            query: (data) => ({
                url: "/api/absencereason/create-absenceReason",
                method: HttpMethodType.POST,
                body: data,
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

export const { useGetAbsenceReasonQuery, useGetProjectTypeQuery, useGetPositionsQuery, useGetSubdivisionsQuery,
  useCreateSubdivisionMutation, useCreatePositionMutation, useCreateProjectTypeMutation, useCreateAbsenceReasonMutation, } = Api;