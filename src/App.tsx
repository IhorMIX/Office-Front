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
import CreateEmployeePage from './pages/Create/CreateEmployee';
import CreateManagerPage from './pages/Create/CreateManagerPage';

function App() {
  const isAuth = useSelector((state: RootState) => state.auth.isAuth);

  return (
    <Routes>
      <Route path="/" element={<AuthLayout />}>
        <Route index element={<MainPage />} />
        <Route path='/employees' index element={<EmployeesPage />} />
        <Route path="/create-employee" element={<ProtectedRoute allowedRoles={[UserType.Admin, UserType.HrManager]} />}>
          <Route index element={<CreateEmployeePage />} />
        </Route>
        <Route path='/managers' index element={<ManagersPage />} />
        <Route path="/create-manager" element={<ProtectedRoute allowedRoles={[UserType.Admin, UserType.HrManager]} />}>
          <Route index element={<CreateManagerPage />} />
        </Route>
        <Route path='/projects' index element={<ProjectsPage />} />
        
      </Route>
      <Route path="/auth" element={isAuth ? <Navigate to="/" replace /> : <AuthPage />} />
    </Routes>
  );
}
export default App;