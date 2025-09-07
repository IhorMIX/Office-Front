import React from "react";
import {
  Paper,
  Typography,
  Card,
  CardContent,
  Box,
  Divider,
  Container,
} from "@mui/material";
import { Link } from "react-router-dom";
import { useGetManagerInfoQuery } from "../../services/managerService";

interface Props {
  id: string;
}

const ManagerDetails: React.FC<Props> = ({ id }) => {
  const { data: manager, isLoading } = useGetManagerInfoQuery(Number(id));

  if (isLoading) return <Typography>Loading...</Typography>;
  if (!manager) return <Typography>Manager data not found</Typography>;

  return (
    <Container maxWidth="sm">
      <Paper
        elevation={4}
        sx={{
          mt: 5,
          p: 4,
          borderRadius: 3,
          backgroundColor: "#424242",
          color: "#fff",
        }}
      >
        <Typography
          variant="h5"
          sx={{
            fontWeight: "bold",
            mb: 3,
            color: "#fff",
            textAlign: "normal",
            wordBreak: "break-word",
            lineHeight: 1.3,
          }}
        >
          Manager Details — ID: {manager.id}
        </Typography>

        <Box mb={3}>
          <Typography variant="body1" sx={{ mb: 1 }}>
            <strong>Full name:</strong> {manager.fullName}
          </Typography>
          <Typography variant="body1">
            <strong>Role:</strong> {manager.role ?? "—"}
          </Typography>
        </Box>

        <Divider sx={{ my: 3, borderColor: "#555" }} />

        <Typography
          variant="h6"
          sx={{
            fontWeight: "bold",
            mb: 2,
            color: "#fff",
            wordBreak: "break-word",
            textAlign: "center",
          }}
        >
          Workers
        </Typography>

        {manager.workers && manager.workers.length > 0 ? (
          <Box
            display="flex"
            flexWrap="wrap"
            gap={2}
            justifyContent="center"
            mb={3}
          >
            {manager.workers.map((worker) => (
              <Card
                key={worker.id}
                sx={{
                  width: 230,
                  backgroundColor: "#3a3a3a",
                  color: "#fff",
                  borderRadius: 2,
                  boxShadow: 3,
                  "&:hover": {
                    boxShadow: 6,
                    backgroundColor: "#444",
                  },
                }}
              >
                <CardContent>
                  <Typography
                    variant="h6"
                    component={Link}
                    to={`/employee/${worker.id}`}
                    sx={{
                      color: "#fff",
                      fontWeight: "bold",
                      textDecoration: "none",
                      "&:hover": { textDecoration: "underline", color: "#aaa" },
                    }}
                    gutterBottom
                  >
                    {worker.fullName}
                  </Typography>
                  <Typography variant="body2" gutterBottom>
                    Position: {worker.position?.name ?? "—"}
                  </Typography>
                  <Typography variant="body2" gutterBottom>
                    Status: {worker.status ? "Active" : "Inactive"}
                  </Typography>
                  <Typography variant="body2">
                    Out Of Office Balance: {worker.outOfOfficeBalance}
                  </Typography>
                </CardContent>
              </Card>
            ))}
          </Box>
        ) : (
          <Typography
            variant="body2"
            sx={{ textAlign: "center", color: "#fff", wordBreak: "break-word", mt: 2 }}
          >
            No Workers assigned to this Manager.
          </Typography>
        )}
      </Paper>
    </Container>
  );
};

export default ManagerDetails;
