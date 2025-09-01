import React from "react";
import { Link as RouterLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { useActions } from "../Hooks/StoreHook";
import styles from "../scss/layout.module.scss";

const Header = () => {
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuth);
  const { userLogout } = useActions();

  const handleLogout = async () => {
    try {
      userLogout();
      window.location.reload();
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <header className={styles.header}>
      <div className={styles.headerLeft}>
        <RouterLink to="/" style={{ textDecoration: "none", color: "inherit", display: "flex", alignItems: "center", gap: "4px" }}>
          ⏱ <span>MTime</span>
        </RouterLink>

      </div>

      {isAuthenticated && (
        <div className={styles.headerRight}>
          <RouterLink to="/" className={styles.button}>
            Home
          </RouterLink>
          <button className={styles.button} onClick={handleLogout}>
            Logout
          </button>
        </div>
      )}
    </header>
  );
};

export default Header;
