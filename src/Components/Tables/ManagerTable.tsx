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
import { BaseEmployee } from "../../types/Employee";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { UserType } from "../../types/User";
import { Link } from "react-router-dom";

interface TableProps {
  managers: BaseEmployee[];
  onDelete: (id: number) => void;
}

enum SortField {
  ID = "id",
  FULL_NAME = "fullName",
}

const ManagerTable: React.FC<TableProps> = ({ managers, onDelete }) => {
  const [sortBy, setSortBy] = useState<SortField>(SortField.ID);
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");
  const role = useSelector((state: RootState) => state.auth.role);

  const getFieldByPath = (obj: any, path: string): any => {
    return path.split(".").reduce((acc, key) => acc?.[key], obj);
  };

  const sortedManagers = [...managers].sort((a, b) => {
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
    role === UserType.Admin || role === UserType.HrManager;

  const cellStyle = {
    color: "#fff",
    fontWeight: "bold",
    fontSize: "0.95rem",
  };

  return (
    <TableContainer component={Paper} sx={{ borderRadius: 3, overflow: "hidden" }}>
      <Table>
        <TableHead>
          <TableRow sx={{ backgroundColor: "#424242", height: 48 }}>
            {[{ label: "ID", field: SortField.ID }, { label: "Full Name", field: SortField.FULL_NAME }].map(
              ({ label, field }) => (
                <TableCell
                  key={field}
                  sx={{
                    color: "#fff",
                    fontWeight: "bold",
                    fontSize: "0.95rem",
                    py: 1, // одинаковый vertical padding
                    height: 48, // фиксированная высота строки
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
              )
            )}
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
          </TableRow>
        </TableHead>

        <TableBody>
          {sortedManagers.map((manager, index) => (
            <TableRow
              key={manager.id}
              sx={{
                backgroundColor: index % 2 === 0 ? "#424242" : "#333333",
                "&:hover": { backgroundColor: "#555" },
                height: 48, // фикс высота строк body
              }}
            >
              <TableCell sx={{ color: "#fff", py: 1, height: 48 }}>
                <Link
                  to={`/manager/${manager.id}`}
                  style={{ color: "#fff", fontWeight: 500, textDecoration: "none" }}
                >
                  {manager.id}
                </Link>
              </TableCell>
              <TableCell sx={{ color: "#fff", py: 1, height: 48 }}>
                {manager.fullName}
              </TableCell>

              {canEditOrDelete(role) && (
                <TableCell sx={{ color: "#fff", py: 1, height: 48 }}>
                  <Box sx={{ display: "flex", gap: 1 }}>
                    <Button
                      variant="outlined"
                      size="small"
                      component={Link}
                      to={`/update-manager/${manager.id}`}
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
                    <Button
                      variant="outlined"
                      size="small"
                      color="error"
                      onClick={() => onDelete(manager.id)}
                      sx={{
                        minWidth: 90,
                        height: 36,
                        color: "#fff",
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

export default ManagerTable;
