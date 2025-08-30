import React from "react";
import { Link as RouterLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { UserType } from "../types/User";
import styles from "../scss/layout.module.scss";

const Sidebar = () => {
  const role = useSelector((state: RootState) => state.auth.role);

  let links: React.ReactNode = null;

  switch (role) {
    case UserType.Admin:
      links = (
        <>
          <h4>Work</h4>
          <RouterLink to="/projects">Projects</RouterLink>

          <h4>Employee</h4>
          <RouterLink to="/employees">Employees</RouterLink>
          <RouterLink to="/managers">Managers</RouterLink>

          <h4>Day off</h4>
          <RouterLink to="/leave-requests">Leave Requests</RouterLink>
          <RouterLink to="/approval-requests">Approval Requests</RouterLink>
        </>
      );
      break;

    case UserType.HrManager:
      links = (
        <>
          <h4>Employee</h4>
          <RouterLink to="/employees">Employees</RouterLink>
          <RouterLink to="/managers">Managers</RouterLink>

          <h4>Day off</h4>
          <RouterLink to="/leave-requests">Leave Requests</RouterLink>
          <RouterLink to="/approval-requests">Approval Requests</RouterLink>
        </>
      );
      break;

    case UserType.ProjectManager:
      links = (
        <>
          <h4>Work</h4>
          <RouterLink to="/projects">Projects</RouterLink>
          <RouterLink to="/employees">Employees</RouterLink>

          <h4>Day off</h4>
          <RouterLink to="/leave-requests">Leave Requests</RouterLink>
          <RouterLink to="/approval-requests">Approval Requests</RouterLink>
        </>
      );
      break;

    case UserType.Employee:
      links = (
        <>
          <h4>Work</h4>
          <RouterLink to="/projects">Projects</RouterLink>

          <h4>Day off</h4>
          <RouterLink to="/leave-requests">Leave Requests</RouterLink>
          <RouterLink to="/approval-requests">Approval Requests</RouterLink>
        </>
      );
      break;

    default:
      break;
  }

  return <nav className={styles.sidebar}>{links}</nav>;
};

export default Sidebar;
