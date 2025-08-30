import React from "react";
import { useGetCurrentUserQuery } from "../../services/userService";
import { RootState } from "../../redux/store";
import { useSelector } from "react-redux";
import { Box, Button, Container, Paper, Stack, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { UserType } from "../../types/User";

const MainPage = () => {
  const { data: user } = useGetCurrentUserQuery(null);
  const role = useSelector((state: RootState) => state.auth.role);

  const buttonStyle = {
    backgroundColor: "#424242",
    color: "#fff",
    borderRadius: 2,
    textTransform: "none",
    "&:hover": { backgroundColor: "#555", color: "#fff" },
    "&:active": { transform: "scale(0.97)" },
  };

  return (
    <Container maxWidth="md">
      <Box my={4}>
        <Paper
          elevation={3}
          sx={{ padding: 4, borderRadius: 3, backgroundColor: "#2F2F2F" }}
        >
          <Typography variant="h4" component="h1" gutterBottom sx={{ color: "#eee" }}>
            {user?.fullName}
          </Typography>
          <Typography variant="subtitle1" color="#fff" gutterBottom>
            Role: {role}
          </Typography>

          <Stack spacing={2} mt={3}>
            {(role === UserType.Admin || role === UserType.HrManager) && (
              <>
                <Button
                  component={Link}
                  to="/create-absenceReason"
                  variant="contained"
                  fullWidth
                  sx={buttonStyle}
                >
                  Create Absence Reason
                </Button>
                <Button
                  component={Link}
                  to="/create-subdivision"
                  variant="contained"
                  fullWidth
                  sx={buttonStyle}
                >
                  Create Subdivision
                </Button>
                <Button
                  component={Link}
                  to="/create-position"
                  variant="contained"
                  fullWidth
                  sx={buttonStyle}
                >
                  Create Position
                </Button>
              </>
            )}

            {(role === UserType.Admin || role === UserType.ProjectManager) && (
              <Button
                component={Link}
                to="/create-projectType"
                variant="contained"
                fullWidth
                sx={buttonStyle}
              >
                Create Project Type
              </Button>
            )}
          </Stack>
        </Paper>
      </Box>
    </Container>
  );
};

export default MainPage;
