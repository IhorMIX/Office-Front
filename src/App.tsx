import { Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "./redux/store";
import { AuthLayout, ProtectedRoute } from "./Components/Layout";
import MainPage from "./pages/General/MainPage";
import AuthPage from "./pages/General/AuthPage";
import EmployeesPage from "./pages/General/EmployeesPage";
import ManagersPage from "./pages/General/ManagersPage";
import ProjectsPage from "./pages/General/ProjectsPage";
import LeaveRequestPage from "./pages/General/LeaveRequestPage";
import React from "react";
import { protectedRoutes} from "./routes/routesConfig";

function App() {
  const isAuth = useSelector((state: RootState) => state.auth.isAuth);

  return (
    <Routes>
      <Route path="/" element={<AuthLayout />}>
        <Route index element={<MainPage />} />
        <Route path="/employees" element={<EmployeesPage />} />
        <Route path="/managers" element={<ManagersPage />} />
        <Route path="/projects" element={<ProjectsPage />} />
        <Route path="/leave-requests" element={<LeaveRequestPage />} />

        {protectedRoutes.map(({ path, element, roles }) => (
          <Route
            key={path}
            path={path}
            element={
              <ProtectedRoute allowedRoles={roles}>
                {element}
              </ProtectedRoute>
            }
          />
        ))}
      </Route>

      <Route
        path="/auth"
        element={isAuth ? <Navigate to="/" replace /> : <AuthPage />}
      />
    </Routes>
  );
}

export default App;