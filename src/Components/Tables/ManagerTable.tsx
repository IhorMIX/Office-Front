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
} from "@mui/material";
import { BaseEmployee } from "../../types/Employee";
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

  const cellStyle = {
    fontWeight: "bold",
    color: "rgb(0, 80, 184)",
  };

  return (
    <TableContainer>
      <Table sx={{ backgroundColor: "white", borderRadius: "10px" }}>
        <TableHead>
          <TableRow>
            {[
              { label: "ID", field: SortField.ID },
              { label: "Full Name", field: SortField.FULL_NAME },
            ].map(({ label, field }) => (
              <TableCell key={field} sx={cellStyle}>
                <TableSortLabel
                  active={sortBy === field}
                  direction={sortBy === field ? sortDirection : "asc"}
                  onClick={() => handleSort(field)}
                >
                  {label}
                </TableSortLabel>
              </TableCell>
            ))}
            <TableCell sx={cellStyle}>Actions</TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {sortedManagers.map((manager) => (
            <TableRow key={manager.id} >
              <TableCell>
                <Link to={`/manager/${manager.id}`}>
                    {manager.id}
                </Link>
              </TableCell>
              <TableCell>{manager.fullName}</TableCell>
                  <TableCell>
                    <Box sx={{ display: "flex", gap: 1 }}>
                      <Button
                        variant="outlined"
                        size="small"
                        component={Link}
                        to={`/update-manager/${manager.id}`}
                        sx={{
                          minWidth: 90,
                          height: 36,
                          textAlign: "center",
                          whiteSpace: "nowrap"
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
                          textAlign: "center",
                          whiteSpace: "nowrap"
                        }}
                      >
                        Delete
                      </Button>
                    </Box>
                  </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default ManagerTable;
