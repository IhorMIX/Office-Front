import React from 'react';
import './App.css';
import { Route, Routes, Navigate } from 'react-router-dom';
import MainPage from './pages/General/MainPage';
import AuthPage from './pages/General/AuthPage';
import { useSelector } from 'react-redux';
import Layout from './Components/Layout';
import { RootState } from './redux/store';
import EmployeesPage from './pages/General/EmployeesPage';
import ManagersPage from './pages/General/ManagersPage';
import ProjectsPage from './pages/General/ProjectsPage';

function App() {
  const isAuth = useSelector((state: RootState) => state.auth.isAuth);

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<MainPage />} />
        <Route path='/employees' index element={<EmployeesPage />} />
        <Route path='/managers' index element={<ManagersPage />} />
        <Route path='/projects' index element={<ProjectsPage />} />
      </Route>
      <Route path="/auth" element={isAuth ? <Navigate to="/" replace /> : <AuthPage />} />
    </Routes>
  );
}
export default App;