import React from "react";
import { useGetCurrentUserQuery } from "../services/userService";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { Box, Paper, Typography } from "@mui/material";

const MainPage = () => {

  const {data: user} = useGetCurrentUserQuery(null);
  const role = useSelector((state: RootState) => state.auth.role);
  return (
   <Box my={4}>
  <Paper elevation={3} sx={{ padding: 3 }}>
    <Typography variant="h4" component="h1" gutterBottom>
      {user?.fullName ?? "Имя не указано"}
    </Typography>
    <Typography variant="subtitle1" color="text.secondary">
      User Type: {role ?? "Неизвестно"}
    </Typography>
  </Paper>
</Box>
  );
};

export default MainPage;