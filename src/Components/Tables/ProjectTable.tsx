import React, { useState } from "react";
import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  TableContainer,
  TableSortLabel,
  Button,
  Box,
  Paper,
} from "@mui/material";
import { Project } from "../../types/Project";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { UserType } from "../../types/User";
import { Link } from "react-router-dom";

interface TableProps {
  projects: Project[];
  onDelete: (id: number) => void;
  onDeactivate: (id: number) => void;
}

enum SortField {
  ID = "id",
  MANAGER = "projectManager.fullName",
  TYPE = "projectType.name",
  START_DATE = "startDate",
  END_DATE = "endDate",
  STATUS = "status",
}

const ProjectTable: React.FC<TableProps> = ({ projects, onDelete, onDeactivate }) => {
  const [sortBy, setSortBy] = useState<SortField>(SortField.ID);
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");
  const role = useSelector((state: RootState) => state.auth.role);

  const getFieldByPath = (obj: any, path: string): any =>
    path.split(".").reduce((acc, key) => acc?.[key], obj);

  const sortedProjects = [...projects].sort((a, b) => {
    const aValue = getFieldByPath(a, sortBy);
    const bValue = getFieldByPath(b, sortBy);

    if (aValue === undefined || bValue === undefined) return 0;

    if (sortDirection === "asc") {
      return aValue > bValue ? 1 : aValue < bValue ? -1 : 0;
    } else {
      return aValue < bValue ? 1 : aValue > bValue ? -1 : 0;
    }
  });

  const handleSort = (field: SortField) => {
    if (field === sortBy) {
      setSortDirection((prev) => (prev === "asc" ? "desc" : "asc"));
    } else {
      setSortBy(field);
      setSortDirection("asc");
    }
  };

  const canEditOrDelete = (role: string) =>
    role === UserType.Admin || role === UserType.ProjectManager;

  return (
    <TableContainer component={Paper} sx={{ borderRadius: 3, overflow: "hidden" }}>
      <Table>
        <TableHead>
          <TableRow sx={{ backgroundColor: "#424242", height: 48 }}>
            {[
              { label: "ID", field: SortField.ID },
              { label: "Manager", field: SortField.MANAGER },
              { label: "Project Type", field: SortField.TYPE },
              { label: "Start Date", field: SortField.START_DATE },
              { label: "End Date", field: SortField.END_DATE },
              { label: "Status", field: SortField.STATUS },
            ].map(({ label, field }) => (
              <TableCell
                key={field}
                sx={{
                  color: "#fff",
                  fontWeight: "bold",
                  fontSize: "0.95rem",
                  py: 1,
                  height: 48,
                }}
              >
                <TableSortLabel
                  active={sortBy === field}
                  direction={sortBy === field ? sortDirection : "asc"}
                  onClick={() => handleSort(field)}
                  sx={{
                    color: "#fff",
                    "&.Mui-active": { color: "#fff" },
                    "& .MuiTableSortLabel-icon": { color: "#fff !important" },
                  }}
                >
                  {label}
                </TableSortLabel>
              </TableCell>
            ))}
            <TableCell
              sx={{
                color: "#fff",
                fontWeight: "bold",
                fontSize: "0.95rem",
                py: 1,
                height: 48,
              }}
            >
              Comment
            </TableCell>
            {canEditOrDelete(role) && (
              <TableCell
                sx={{
                  color: "#fff",
                  fontWeight: "bold",
                  fontSize: "0.95rem",
                  py: 1,
                  height: 48,
                }}
              >
                Actions
              </TableCell>
            )}
          </TableRow>
        </TableHead>

        <TableBody>
          {sortedProjects.map((project, index) => (
            <TableRow
              key={project.id}
              sx={{
                backgroundColor: index % 2 === 0 ? "#424242" : "#333333",
                "&:hover": { backgroundColor: "#555" },
                height: 48,
              }}
            >
              <TableCell sx={{ color: "#fff", py: 1, height: 48 }}>
                <Link
                  to={`/project/${project.id}`}
                  style={{ color: "#fff", fontWeight: 500, textDecoration: "none" }}
                >
                  {project.id}
                </Link>
              </TableCell>
              <TableCell sx={{ color: "#fff", py: 1, height: 48 }}>
                {project.projectManager.fullName}
              </TableCell>
              <TableCell sx={{ color: "#fff", py: 1, height: 48 }}>
                {project.projectType.name}
              </TableCell>
              <TableCell sx={{ color: "#fff", py: 1, height: 48 }}>
                {new Date(project.startDate).toLocaleDateString()}
              </TableCell>
              <TableCell sx={{ color: "#fff", py: 1, height: 48 }}>
                {new Date(project.endDate).toLocaleDateString()}
              </TableCell>
              <TableCell sx={{ color: "#fff", py: 1, height: 48 }}>
                {project.status ? "Active" : "Inactive"}
              </TableCell>
              <TableCell sx={{ color: "#fff", py: 1, height: 48 }}>
                {project.comment}
              </TableCell>

              {canEditOrDelete(role) && (
                <TableCell sx={{ color: "#fff", py: 1, height: 48 }}>
                  <Box sx={{ display: "flex", gap: 1 }}>
                    <Button
                      variant="outlined"
                      size="small"
                      component={Link}
                      to={`/update-project/${project.id}`}
                      sx={{
                        minWidth: 90,
                        height: 36,
                        color: "#fff",
                        borderColor: "#fff",
                        fontWeight: "bold",
                        "&:hover": {
                          borderColor: "#aaa",
                          backgroundColor: "rgba(255,255,255,0.08)",
                        },
                      }}
                    >
                      Edit
                    </Button>
                    {project.status ? (
                      <Button
                        variant="outlined"
                        size="small"
                        color="error"
                        onClick={() => onDeactivate(project.id)}
                        sx={{
                          minWidth: 90,
                          height: 36,
                          color: "error",
                          borderColor: "#f44336",
                          fontWeight: "bold",
                          "&:hover": {
                            borderColor: "#ff7961",
                            backgroundColor: "rgba(244,67,54,0.1)",
                          },
                        }}
                      >
                        Deactivate
                      </Button>
                    ) : (
                      <Button
                        variant="outlined"
                        size="small"
                        color="error"
                        onClick={() => onDelete(project.id)}
                        sx={{
                          minWidth: 90,
                          height: 36,
                          color: "error",
                          borderColor: "#f44336",
                          fontWeight: "bold",
                          "&:hover": {
                            borderColor: "#ff7961",
                            backgroundColor: "rgba(244,67,54,0.1)",
                          },
                        }}
                      >
                        Delete
                      </Button>
                    )}
                    <Button
                      variant="outlined"
                      size="small"
                      component={Link}
                      to={`/project-add-employees/${project.id}`}
                      sx={{
                        minWidth: 90,
                        height: 36,
                        color: "#fff",
                        borderColor: "#fff",
                        fontWeight: "bold",
                        "&:hover": {
                          borderColor: "#aaa",
                          backgroundColor: "rgba(255,255,255,0.08)",
                        },
                      }}
                    >
                      Employees
                    </Button>
                  </Box>
                </TableCell>
              )}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default ProjectTable;
