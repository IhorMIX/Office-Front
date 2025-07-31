import { api } from "../api/api";
import { CreateEmployee, Employee, UpdateEmployee } from "../types/Employee";
import { HttpMethodType } from "../types/HttpInfo";

export const Api = api.injectEndpoints({
  endpoints: (builder) => ({
    getAllEmployees: builder.query<Employee[],null>({
        query: () => ({
          url: "/api/employee/get-all-employees",
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
    CreateEmployee: builder.mutation({
      query: (employee:CreateEmployee) => ({
        url: `/api/employee`,
        body: employee,
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
    UpdateEmployee: builder.mutation({
      query: (employee:UpdateEmployee) => ({
        url: `/api/employee`,
        body: employee,
        method: HttpMethodType.PUT,
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

export const { useGetAllEmployeesQuery, useCreateEmployeeMutation, useUpdateEmployeeMutation} = Api;