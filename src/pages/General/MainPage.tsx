import React from "react";
import { useGetCurrentUserQuery } from "../../services/userService";
import { RootState } from "../../redux/store";
import { useSelector } from "react-redux";
import {
  Box,
  Button,
  Container,
  Paper,
  Typography,
  Divider,
} from "@mui/material";
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
    fontWeight: "bold",
    py: 1.5,
    "&:hover": { backgroundColor: "#555", color: "#fff" },
    "&:active": { transform: "scale(0.97)" },
    "&.Mui-disabled": {
      backgroundColor: "rgba(255,255,255,0.12)",
      color: "rgba(255,255,255,0.3)",
    },
    textAlign: "center",
    lineHeight: 1.2,
  };

  return (
    <Container maxWidth="md">
      <Box my={4}>
        <Paper
          elevation={3}
          sx={{
            p: 4,
            borderRadius: 3,
            backgroundColor: "#2F2F2F",
            color: "#fff",
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              textAlign: "center",
              mb: 3,
              gap: 1,
            }}
          >
            <Typography
              variant="h4"
              sx={{
                fontWeight: "bold",
                color: "#eee",
                whiteSpace: "normal",
                overflowWrap: "break-word",
                wordBreak: "break-word",
              }}
            >
              {user?.fullName ?? "User"}
            </Typography>
            <Typography variant="subtitle1" sx={{ color: "#aaa" }}>
              Role: {role}
            </Typography>
          </Box>

          <Divider sx={{ my: 3, borderColor: "#444" }} />

          <Box
            sx={{
              display: "flex",
              flexWrap: "wrap",
              gap: 2,
              justifyContent: "center",
            }}
          >
            {(role === UserType.Admin || role === UserType.HrManager) && (
              <>
                <Button
                  component={Link}
                  to="/create-absenceReason"
                  variant="contained"
                  sx={buttonStyle}
                >
                  Create Absence Reason
                </Button>
                <Button
                  component={Link}
                  to="/create-subdivision"
                  variant="contained"
                  sx={buttonStyle}
                >
                  Create Subdivision
                </Button>
                <Button
                  component={Link}
                  to="/create-position"
                  variant="contained"
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
                sx={buttonStyle}
              >
                Create Project Type
              </Button>
            )}
          </Box>
        </Paper>
      </Box>
    </Container>
  );
};

export default MainPage;
