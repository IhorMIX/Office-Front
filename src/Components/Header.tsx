import React from "react";
import NavigateButtons from "./Navigate";
import style from "../scss/layout.module.scss"
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { useLogOutMutation } from "../services/authService";

const Header = () => {
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuth);
  const [logout] = useLogOutMutation();
  const handleLogout = async () => {
    try {
      await logout(null); // Assuming logout mutation doesn't require any parameters
      console.log("Logout successful");

      localStorage.removeItem("accessKey"); 
      localStorage.removeItem("refreshToken"); 
      window.location.reload();
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <header>
      <div className={style.headerContent}>
        {isAuthenticated ? <NavigateButtons/> : null}
        {isAuthenticated && (
          <button className={style.logoutButton} onClick={handleLogout}>
            Logout
          </button>
        )}
      </div>
    </header>
  );
};
export default Header;