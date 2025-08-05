import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import Container from "@mui/material/Container";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import Header from "./Header";
import Footer from "./Footer";
import styles from "../scss/layout.module.scss";
import { UserType } from "../types/User";

// Универсальный контент с хедером, футером и контейнером
const MainContent = () => (
  <>
    <Header />
    <Container
      disableGutters
      maxWidth={false}
      classes={{ root: styles.mainContainer }}
    >
      <Outlet />
    </Container>
    <Footer />
  </>
);

// Лейаут для авторизованных пользователей
export const AuthLayout: React.FC = () => {
  const isAuth = useSelector((state: RootState) => state.auth.isAuth);

  if (!isAuth) {
    return <Navigate to="/auth" replace />;
  }

  return <MainContent />;
};

// Лейаут для НЕавторизованных (напр. страница логина)
export const Layout: React.FC = () => {
  const isAuth = useSelector((state: RootState) => state.auth.isAuth);

  if (isAuth) {
    return <Navigate to="/" replace />;
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
