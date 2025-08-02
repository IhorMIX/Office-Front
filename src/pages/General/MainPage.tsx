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

  return (
    <Container maxWidth="md">
      <Box my={4}>
        <Paper elevation={3} sx={{ padding: 4, borderRadius: 3 }}>
          <Typography variant="h4" component="h1" gutterBottom>
            {user?.fullName}
          </Typography>
          <Typography variant="subtitle1" color="text.secondary" gutterBottom>
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
                >
                  Create Absence Reason
                </Button>
                <Button
                  component={Link}
                  to="/create-subdivision"
                  variant="contained"
                  fullWidth
                >
                  Create Subdivision
                </Button>
                <Button
                  component={Link}
                  to="/create-position"
                  variant="contained"
                  fullWidth
                >
                  Create Position
                </Button>
              </>
            )}

            {(role === UserType.Admin || role === UserType.ProjectManager) && (
              <Button
                component={Link}
                to="/create-project-type"
                variant="contained"
                fullWidth
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
