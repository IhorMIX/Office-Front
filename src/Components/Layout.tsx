import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import Container from "@mui/material/Container";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import Header from "./Header";
import Footer from "./Footer";
import styles from "../scss/layout.module.scss";
import { UserType } from "../types/User";

const mainContent = (
  <>
    <Header />
    <Container disableGutters={true} maxWidth={false} classes={{ root: styles.mainContainer }}>
      <Outlet />
    </Container>
    <Footer />
  </>
);

export const AuthLayout = () => {
  var isAuth = useSelector((selector: RootState) => selector.auth.isAuth);

  if (!isAuth) {
    return (<Navigate to='/auth' replace = {true}/>);
  }

  return (
    <>
      {mainContent}
    </>
  );
};

export const Layout = () => {
  var isAuth = useSelector((selector: RootState) => selector.auth.isAuth);

  if(isAuth) {
    return (<Navigate to='/' replace = {true}/>);
  }

  return(
    <>
    {mainContent}
    </>
  )
}

interface ProtectedRouteProps {
  allowedRoles: UserType[];
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ allowedRoles }) => {
  const isAuth = useSelector((state: RootState) => state.auth.isAuth);
  const role = useSelector((state: RootState) => state.auth.role);

  if (!isAuth) {
    return <Navigate to="/auth" replace = {true} />;
  }

  if (!allowedRoles.includes(role as UserType)) {
    return <Navigate to="/" replace = {true} />;
  }

  return <Outlet />;
};

export default ProtectedRoute;