import React from 'react';
import './App.css';
import { Route, Routes, Navigate } from 'react-router-dom';
import MainPage from './pages/General/MainPage';
import AuthPage from './pages/General/AuthPage';
import { useSelector } from 'react-redux';
import { AuthLayout, ProtectedRoute } from './Components/Layout';
import { RootState } from './redux/store';
import EmployeesPage from './pages/General/EmployeesPage';
import ManagersPage from './pages/General/ManagersPage';
import ProjectsPage from './pages/General/ProjectsPage';
import { UserType } from './types/User';
import CreateEmployeePage from './pages/Create/CreateEmployeePage';
import CreateManagerPage from './pages/Create/CreateManagerPage';
import CreateAbsenceReason from './pages/Create/CreateAbsenceReasonPage';
import CreatePositionPage from './pages/Create/CreatePositionPage';
import CreateSubdivisionPage from './pages/Create/CreateSubdivisionPage';
import CreateProjectTypePage from './pages/Create/CreateProjectTypePage';
import CreateProjectPage from './pages/Create/CreateProjectPage';
import LeaveRequestPage from './pages/General/LeaveRequestPage';
import CreateLeaveRequestPage from './pages/Create/CreateLeaveRequestPage';
import ApprovalRequestsPage from './pages/General/ApprovalRequestPage';
import EmployeeInfoPage from './pages/Info/EmployeeInfoPage';
import ManagerInfoPage from './pages/Info/ManagerInfoPage';
import ProjectInfoPage from './pages/Info/ProjectInfoPage';
import LeaveRequestInfoPage from './pages/Info/LeaveRequestInfoPage';
import UpdateAddEmployeePage from './pages/Update/UpdateAddEmployeePage';
import UpdateEmployeePage from './pages/Update/UpdateEmployeePage';
import UpdateManagerPage from './pages/Update/UpdateManagerPage';
import UpdateProjectPage from './pages/Update/UpdateProjectPage';
import UpdateLeaveRequestPage from './pages/Update/UpdateLeaveRequestPage';

function App() {
  const isAuth = useSelector((state: RootState) => state.auth.isAuth);

  return (
    <Routes>
      <Route path="/" element={<AuthLayout />}>
        <Route index element={<MainPage />} />

        <Route path="/employees" element={<EmployeesPage />} />
        <Route
          path="/create-employee"
          element={
            <ProtectedRoute allowedRoles={[UserType.Admin, UserType.HrManager]}>
              <CreateEmployeePage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/update-employee/:id"
          element={
            <ProtectedRoute allowedRoles={[UserType.Admin, UserType.HrManager]}>
              <UpdateEmployeePage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/employee/:id"
          element={
            <ProtectedRoute allowedRoles={[UserType.Admin, UserType.HrManager, UserType.ProjectManager]}>
              <EmployeeInfoPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/update-manager/:id"
          element={
            <ProtectedRoute allowedRoles={[UserType.Admin]}>
              <UpdateManagerPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/manager/:id"
          element={
            <ProtectedRoute allowedRoles={[UserType.Admin, UserType.HrManager]}>
              <ManagerInfoPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/update-project/:id"
          element={
            <ProtectedRoute allowedRoles={[UserType.Admin, UserType.ProjectManager]}>
              <UpdateProjectPage />
            </ProtectedRoute>
          }
        />

        <Route path="/managers" element={<ManagersPage />} />
        <Route
          path="/create-manager"
          element={
            <ProtectedRoute allowedRoles={[UserType.Admin]}>
              <CreateManagerPage />
            </ProtectedRoute>
          }
        />

        <Route path="/projects" element={<ProjectsPage />} />
        <Route
          path="/create-project"
          element={
            <ProtectedRoute allowedRoles={[UserType.Admin, UserType.ProjectManager]}>
              <CreateProjectPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/project-add-employees/:id"
          element={
            <ProtectedRoute allowedRoles={[UserType.Admin, UserType.ProjectManager]}>
              <UpdateAddEmployeePage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/project/:id"
          element={
            <ProtectedRoute allowedRoles={[UserType.Admin, UserType.HrManager, UserType.Employee, UserType.ProjectManager]}>
              <ProjectInfoPage />
            </ProtectedRoute>
          }
        />

        <Route path="/leave-requests" element={<LeaveRequestPage />} />
        <Route
          path="/leaverequest/:id"
          element={
            <ProtectedRoute allowedRoles={[UserType.Admin, UserType.HrManager, UserType.Employee, UserType.ProjectManager]}>
              <LeaveRequestInfoPage />
            </ProtectedRoute>
          }
        />

        <Route path="/update-leave-request/:id" element={
          <ProtectedRoute allowedRoles={[UserType.Admin, UserType.Employee]}>
            <UpdateLeaveRequestPage />
          </ProtectedRoute>
        } />


        <Route path="/create-leave-request" element={
          <ProtectedRoute allowedRoles={[UserType.Admin, UserType.Employee]}>
            <CreateLeaveRequestPage />
          </ProtectedRoute>
        } />

        <Route path="/approval-requests" element={
          <ProtectedRoute allowedRoles={[UserType.Admin, UserType.Employee]}>
            <ApprovalRequestsPage />
          </ProtectedRoute>
        } />

        <Route
          path="/create-absenceReason"
          element={
            <ProtectedRoute allowedRoles={[UserType.Admin, UserType.HrManager]}>
              <CreateAbsenceReason />
            </ProtectedRoute>
          }
        />
        <Route
          path="/create-position"
          element={
            <ProtectedRoute allowedRoles={[UserType.Admin, UserType.HrManager]}>
              <CreatePositionPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/create-subdivision"
          element={
            <ProtectedRoute allowedRoles={[UserType.Admin, UserType.HrManager]}>
              <CreateSubdivisionPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/create-projectType"
          element={
            <ProtectedRoute allowedRoles={[UserType.Admin, UserType.ProjectManager]}>
              <CreateProjectTypePage />
            </ProtectedRoute>
          }
        />
      </Route>

      <Route path="/auth" element={isAuth ? <Navigate to="/" replace /> : <AuthPage />} />
    </Routes>
  );
}

export default App;