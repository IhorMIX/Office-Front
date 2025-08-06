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
import CreateAbsenceReason from './pages/Create/CreateAbsenceReason';
import CreatePositionPage from './pages/Create/CreatePosition';
import CreateSubdivisionPage from './pages/Create/CreateSubdivision';
import CreateProjectTypePage from './pages/Create/CreateProjectType';
import CreateProjectPage from './pages/Create/CreateProjectPage';
import LeaveRequestPage from './pages/General/LeaveRequestPage';

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