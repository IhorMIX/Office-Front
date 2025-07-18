import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import Container from "@mui/material/Container";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import Header from "./Header";
import Footer from "./Footer";
import styles from "../scss/layout.module.scss";

const Layout = () => {
  const isAuth = useSelector((state: RootState) => state.auth.isAuth);

  return (
    <>
      {isAuth ? (
        <>
          <Header />
          <Container disableGutters={true} classes={{ root: styles.mainContainer }}>
            <Outlet />
          </Container>
          <Footer />
        </>
      ) : (
        <Navigate to="/auth" replace />
      )}
    </>
  );
};

export default Layout;