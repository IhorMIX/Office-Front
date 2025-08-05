import React from "react";
import NavigateButtons from "./NavigateButtons";
import style from "../scss/layout.module.scss"
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { useActions } from "../Hooks/StoreHook";

const Header = () => {
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuth);
  const { userLogout } = useActions();
  
  const handleLogout = async () => {
    try {
      console.log("Logout successful");
      userLogout();
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