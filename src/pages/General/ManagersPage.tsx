import React, { useEffect, useState } from "react";
import { useDelManagerMutation, useGetAllManagersQuery } from "../../services/managerService";
import { BaseManager } from "../../types/Employee";
import ManagerTable from "../../Components/Tables/ManagerTable";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { UserType } from "../../types/User";
import {
  Box,
  Button,
  Container,
  Typography,
  Paper,
} from "@mui/material";
import { Link } from "react-router-dom";

const ManagersPage: React.FC = () => {
  const { data: managersList } = useGetAllManagersQuery(null);
  const [managers, setManagers] = useState<BaseManager[]>([]);
  const role = useSelector((state: RootState) => state.auth.role);
  const [deleteManager] = useDelManagerMutation();

  useEffect(() => {
    if (managersList) {
      setManagers(managersList);
    }
  }, [managersList]);

  const handleDelete = async (id: number) => {
    try {
      await deleteManager(id).unwrap();
      setManagers((prev) => prev.filter((manager) => manager.id !== id));
      console.log(`Manager deleted successfully`);
    } catch (error: any) {
      console.error("Delete failed:", error.data || error.message);
    }
  };

  const buttonStyle = {
    backgroundColor: "#424242",
    color: "#fff",
    borderRadius: 2,
    textTransform: "none",
    "&:hover": { backgroundColor: "#555", color: "#fff" },
    "&:active": { transform: "scale(0.97)" },
  };

  return (
    <Container maxWidth="lg">
      <Paper
        elevation={3}
        sx={{
          p: 4,
          mt: 5,
          borderRadius: 3,
          backgroundColor: "#2F2F2F",
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: 2,
            mb: 3,
          }}
        >
          <Typography
            variant="h4"
            sx={{ fontWeight: "bold", color: "#fff" }}
          >
            Managers
          </Typography>

          {(role === UserType.Admin || role === UserType.HrManager) && (
            <Button
              component={Link}
              to="/create-manager"
              variant="contained"
              sx={buttonStyle}
            >
              + Create Manager
            </Button>
          )}
        </Box>

        <ManagerTable managers={managers} onDelete={handleDelete} />
      </Paper>
    </Container>
  );
};

export default ManagersPage;
