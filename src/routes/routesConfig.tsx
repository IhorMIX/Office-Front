import { UserType } from "../types/User";

import CreateEmployeePage from "../pages/Create/CreateEmployeePage";
import CreateManagerPage from "../pages/Create/CreateManagerPage";
import CreateAbsenceReason from "../pages/Create/CreateAbsenceReasonPage";
import CreatePositionPage from "../pages/Create/CreatePositionPage";
import CreateSubdivisionPage from "../pages/Create/CreateSubdivisionPage";
import CreateProjectTypePage from "../pages/Create/CreateProjectTypePage";
import CreateProjectPage from "../pages/Create/CreateProjectPage";
import CreateLeaveRequestPage from "../pages/Create/CreateLeaveRequestPage";
import ApprovalRequestsPage from "../pages/General/ApprovalRequestPage";
import EmployeeInfoPage from "../pages/Info/EmployeeInfoPage";
import ManagerInfoPage from "../pages/Info/ManagerInfoPage";
import ProjectInfoPage from "../pages/Info/ProjectInfoPage";
import LeaveRequestInfoPage from "../pages/Info/LeaveRequestInfoPage";
import UpdateAddEmployeePage from "../pages/Update/UpdateAddEmployeePage";
import UpdateEmployeePage from "../pages/Update/UpdateEmployeePage";
import UpdateManagerPage from "../pages/Update/UpdateManagerPage";
import UpdateProjectPage from "../pages/Update/UpdateProjectPage";
import UpdateLeaveRequestPage from "../pages/Update/UpdateLeaveRequestPage";
import React from "react";

export const protectedRoutes = [
  { path: "/create-employee", element: <CreateEmployeePage />, roles: [UserType.Admin, UserType.HrManager] },
  { path: "/update-employee/:id", element: <UpdateEmployeePage />, roles: [UserType.Admin, UserType.HrManager] },
  { path: "/employee/:id", element: <EmployeeInfoPage />, roles: [UserType.Admin, UserType.HrManager, UserType.ProjectManager] },
  { path: "/update-manager/:id", element: <UpdateManagerPage />, roles: [UserType.Admin] },
  { path: "/manager/:id", element: <ManagerInfoPage />, roles: [UserType.Admin, UserType.HrManager] },
  { path: "/update-project/:id", element: <UpdateProjectPage />, roles: [UserType.Admin, UserType.ProjectManager] },
  { path: "/create-manager", element: <CreateManagerPage />, roles: [UserType.Admin] },
  { path: "/create-project", element: <CreateProjectPage />, roles: [UserType.Admin, UserType.ProjectManager] },
  { path: "/project-add-employees/:id", element: <UpdateAddEmployeePage />, roles: [UserType.Admin, UserType.ProjectManager] },
  { path: "/project/:id", element: <ProjectInfoPage />, roles: [UserType.Admin, UserType.HrManager, UserType.Employee, UserType.ProjectManager] },
  { path: "/leaverequest/:id", element: <LeaveRequestInfoPage />, roles: [UserType.Admin, UserType.HrManager, UserType.Employee, UserType.ProjectManager] },
  { path: "/update-leave-request/:id", element: <UpdateLeaveRequestPage />, roles: [UserType.Admin, UserType.Employee] },
  { path: "/create-leave-request", element: <CreateLeaveRequestPage />, roles: [UserType.Admin, UserType.Employee] },
  { path: "/approval-requests", element: <ApprovalRequestsPage />, roles: [UserType.Admin, UserType.Employee, UserType.HrManager, UserType.ProjectManager] },
  { path: "/create-absenceReason", element: <CreateAbsenceReason />, roles: [UserType.Admin, UserType.HrManager] },
  { path: "/create-position", element: <CreatePositionPage />, roles: [UserType.Admin, UserType.HrManager] },
  { path: "/create-subdivision", element: <CreateSubdivisionPage />, roles: [UserType.Admin, UserType.HrManager] },
  { path: "/create-projectType", element: <CreateProjectTypePage />, roles: [UserType.Admin, UserType.ProjectManager] },
];
