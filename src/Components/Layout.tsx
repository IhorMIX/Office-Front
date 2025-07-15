import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import Container from "@mui/material/Container";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import Header from "./Header";
import Footer from "./Footer";

const mainContent = (
  <>
    <Header />
    <Container disableGutters={true} >
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
