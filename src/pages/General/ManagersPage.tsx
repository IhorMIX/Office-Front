import React, { useEffect, useState } from "react";
import { useGetAllManagersQuery } from "../../services/managerService";
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

  useEffect(() => {
    if (managersList) {
      setManagers(managersList);
    }
  }, [managersList]);

  const handleEdit = (id: number) => {
    console.log(`Edit manager with id: ${id}`);
  };

  const handleDelete = (id: number) => {
    setManagers((prev) => prev.filter((manager) => manager.id !== id));
  };

  return (
    <Container maxWidth="lg">
      <Paper
        elevation={3}
        sx={{
          p: 4,
          mt: 5,
          borderRadius: 3,
          backgroundColor: "#f9fbfc",
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
            sx={{ fontWeight: "bold", color: "black" }}
          >
            Managers
          </Typography>

          {(role === UserType.Admin || role === UserType.HrManager) && (
            <Button
              component={Link}
              to="/create-manager"
              variant="contained"
              color="primary"
              sx={{ textTransform: "none", borderRadius: 2 }}
            >
              + Create Manager
            </Button>
          )}
        </Box>

        <ManagerTable
          managers={managers}
          onDelete={handleDelete}
        />
      </Paper>
    </Container>
  );
};

export default ManagersPage;
