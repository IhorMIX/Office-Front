import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import Container from "@mui/material/Container";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import Header from "./Header";
import styles from "../scss/layout.module.scss";
import { UserType } from "../types/User";
import Sidebar from "./Sidebar";

const MainContent = () => (
  <div className={styles.appLayout}>
    <Header />
    <div className={styles.main}>
      <Sidebar />
      <main className={styles.content}>
        <Outlet />
      </main>
    </div>
  </div>
);

export const AuthLayout: React.FC = () => {
  const isAuth = useSelector((state: RootState) => state.auth.isAuth);

  if (!isAuth) {
    return <Navigate to="/auth" replace />;
  }

  return <MainContent />;
};

interface ProtectedRouteProps {
  allowedRoles: UserType[];
  children: React.ReactNode;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ allowedRoles, children }) => {
  const isAuth = useSelector((state: RootState) => state.auth.isAuth);
  const role = useSelector((state: RootState) => state.auth.role) as UserType | undefined;

  if (!isAuth) {
    return <Navigate to="/auth" replace />;
  }

  if (!role || !allowedRoles.includes(role)) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
