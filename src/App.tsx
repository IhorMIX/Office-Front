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
          path="/employee/:id"
          element={
            <ProtectedRoute allowedRoles={[UserType.Admin, UserType.HrManager, UserType.ProjectManager]}>
              <EmployeeInfoPage />
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

        <Route path="/managers" element={<ManagersPage />} />
        <Route
          path="/create-manager"
          element={
            <ProtectedRoute allowedRoles={[UserType.Admin, UserType.HrManager]}>
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

        <Route path="/leave-requests" element={<LeaveRequestPage />} />
        <Route path="/create-leave-request" element={<CreateLeaveRequestPage  />} />
        <Route path="/approval-requests" element={<ApprovalRequestsPage   />} />

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