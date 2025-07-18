import { Button, Toolbar, Typography } from "@mui/material";
import React from "react";
import { Link as RouterLink } from "react-router-dom";
import style from "../scss/navigate.module.scss"
import { useGetCurrentUserQuery } from "../services/userService";
import { UserType } from "../types/User";

const NavigateButtons = () => {
    const {data: user} = useGetCurrentUserQuery(null); 

    let buttons = (
        <>
            <Button component={RouterLink} to="/" color="inherit">Home</Button>
        </>
    );

    switch (user?.userType) {
        case UserType.Admin:
            buttons = (
                <>
                    {buttons}
                    <Button component={RouterLink} to="/employees" color="inherit">Employees</Button>
                    <Button component={RouterLink} to="/managers" color="inherit">Managers</Button>
                    <Button component={RouterLink} to="/projects" color="inherit">Projects</Button>
                    <Button component={RouterLink} to="/leave-requests" color="inherit">Leave request</Button>
                    <Button component={RouterLink} to="/approval-requests" color="inherit">Approval requests</Button>
                </>
            );
            break;
        case UserType.HrManager:
            buttons = (
                <>
                    {buttons}
                    <Button component={RouterLink} to="/employees" color="inherit">Employees</Button>
                    <Button component={RouterLink} to="/projects" color="inherit">Projects</Button>
                    <Button component={RouterLink} to="/leave-requests" color="inherit">Leave request</Button>
                    <Button component={RouterLink} to="/approval-requests" color="inherit">Approval requests</Button>
                </>
            );
            break;
        case UserType.ProjectManager:
            buttons = (
                <>
                    {buttons}
                    <Button component={RouterLink} to="/employees" color="inherit">Employees</Button>
                    <Button component={RouterLink} to="/projects" color="inherit">Projects</Button>
                    <Button component={RouterLink} to="/leave-requests" color="inherit">Leave request</Button>
                    <Button component={RouterLink} to="/approval-requests" color="inherit">Approval requests</Button>
                </>
            );
            break;
        case UserType.Employee:
            buttons = (
                <>
                    {buttons}
                    <Button component={RouterLink} to="/leave-requests" color="inherit">Leave request</Button>
                    <Button component={RouterLink} to="/projects" color="inherit">Projects</Button>
                    <Button component={RouterLink} to="/approval-requests" color="inherit">Approval requests</Button>
                </>
            );
            break;
        default:
            break;
    }

    return (
        <Toolbar>
            <div className={style.container}>
                <Typography textAlign={"center"} variant="h6">
                    Navigation
                </Typography>
                <div className={style.buttons}>
                    {buttons}
                </div>
            </div>
        </Toolbar>
    );
};

export default NavigateButtons