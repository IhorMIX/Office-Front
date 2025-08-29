import React, { useState } from 'react';
import { Project } from '../../types/Project';
import { Table, TableHead, TableBody, TableRow, TableCell, TableContainer, TableSortLabel, Button, Box } from '@mui/material';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { UserType } from '../../types/User';
import { Link } from 'react-router-dom';

interface TableProps {
    projects: Project[];
    onDelete: (id: number) => void;
    onDeactivate: (id: number) => void;
}

enum SortField {
    ID = 'id',
    MANAGER = 'projectManager.fullName',
    TYPE = 'projectType.name',
    START_DATE = 'startDate',
    END_DATE = 'endDate',
    STATUS = 'status',
}

const EmployeeTable: React.FC<TableProps> = ({ projects, onDelete, onDeactivate }) => {
    const [sortBy, setSortBy] = useState<SortField>(SortField.ID);
    const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
    const role = useSelector((state: RootState) => state.auth.role);

    const getFieldByPath = (obj: any, path: string): any => {
        const keys = path.split('.');
        return keys.reduce((acc, key) => acc[key], obj);
    };

    const sortedProjects = [...projects].sort((a, b) => {
        const aValue = getFieldByPath(a, sortBy);
        const bValue = getFieldByPath(b, sortBy);

        if (sortDirection === 'asc') {
            return aValue > bValue ? 1 : aValue < bValue ? -1 : 0;
        } else {
            return aValue < bValue ? 1 : aValue > bValue ? -1 : 0;
        }
    });

    const handleSort = (field: SortField) => {
        if (field === sortBy) {
            setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
        } else {
            setSortBy(field);
            setSortDirection('asc');
        }
    };

    const canEditOrDelete = (role: string) => {
        return role === UserType.Admin || role === UserType.ProjectManager;
    };

    return (
        <TableContainer>
            <Table sx={{ backgroundColor: "white", borderRadius: "10px" }}>
                <TableHead>
                    <TableRow>
                        <TableCell sx={{ fontWeight: 'bold', color: "rgb(0, 80, 184)" }}>
                            <TableSortLabel
                                active={sortBy === SortField.ID}
                                direction={sortBy === SortField.ID ? sortDirection : 'asc'}
                                onClick={() => handleSort(SortField.ID)}
                            >
                                ID
                            </TableSortLabel>
                        </TableCell>
                        <TableCell sx={{ fontWeight: 'bold', color: "rgb(0, 80, 184)" }}>
                            <TableSortLabel
                                active={sortBy === SortField.MANAGER}
                                direction={sortBy === SortField.MANAGER ? sortDirection : 'asc'}
                                onClick={() => handleSort(SortField.MANAGER)}
                            >
                                Manager
                            </TableSortLabel>
                        </TableCell>
                        <TableCell sx={{ fontWeight: 'bold', color: "rgb(0, 80, 184)" }}>
                            <TableSortLabel
                                active={sortBy === SortField.TYPE}
                                direction={sortBy === SortField.TYPE ? sortDirection : 'asc'}
                                onClick={() => handleSort(SortField.TYPE)}
                            >
                                Project type
                            </TableSortLabel>
                        </TableCell>
                        <TableCell sx={{ fontWeight: 'bold', color: "rgb(0, 80, 184)" }}>
                            <TableSortLabel
                                active={sortBy === SortField.START_DATE}
                                direction={sortBy === SortField.START_DATE ? sortDirection : 'asc'}
                                onClick={() => handleSort(SortField.START_DATE)}
                            >
                                Start Date
                            </TableSortLabel>
                        </TableCell>
                        <TableCell sx={{ fontWeight: 'bold', color: "rgb(0, 80, 184)" }}>
                            <TableSortLabel
                                active={sortBy === SortField.END_DATE}
                                direction={sortBy === SortField.END_DATE ? sortDirection : 'asc'}
                                onClick={() => handleSort(SortField.END_DATE)}
                            >
                                End Date
                            </TableSortLabel>
                        </TableCell>
                        <TableCell sx={{ fontWeight: 'bold', color: "rgb(0, 80, 184)" }}>Comment</TableCell>
                        <TableCell sx={{ fontWeight: 'bold', color: "rgb(0, 80, 184)" }}>
                            <TableSortLabel
                                active={sortBy === SortField.STATUS}
                                direction={sortBy === SortField.STATUS ? sortDirection : 'asc'}
                                onClick={() => handleSort(SortField.STATUS)}
                            >
                                Status
                            </TableSortLabel>
                        </TableCell>
                        {canEditOrDelete(role) && <TableCell sx={{ fontWeight: 'bold', color: "rgb(0, 80, 184)" }}>Actions</TableCell>}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {sortedProjects.map((project) => (
                        <TableRow key={project.id}>
                            <TableCell>
                                <Link to={`/project/${project.id}`}>
                                    {project.id}
                                </Link>
                            </TableCell>
                            <TableCell>{project.projectManager.fullName}</TableCell>
                            <TableCell>{project.projectType.name}</TableCell>
                            <TableCell>{new Date(project.startDate).toLocaleDateString()}</TableCell>
                            <TableCell>{new Date(project.endDate).toLocaleDateString()}</TableCell>
                            <TableCell>{project.comment}</TableCell>
                            <TableCell>{project.status ? 'Active' : 'Inactive'}</TableCell>
                            {canEditOrDelete(role) && (
                                <TableCell>
                                    <Box sx={{ display: "flex", gap: 1 }}>
                                        <Button
                                            variant="outlined"
                                            size="small"
                                            sx={{ minWidth: 90, textAlign: "center", whiteSpace: "nowrap" }}
                                            component={Link}
                                            to={`/update-project/${project.id}`}
                                        >
                                            Edit
                                        </Button>
                                        {project.status ? (
                                            <Button
                                                variant="outlined"
                                                size="small"
                                                color="error"
                                                sx={{ minWidth: 90, textAlign: "center", whiteSpace: "nowrap" }}
                                                onClick={() => onDeactivate(project.id)}
                                            >
                                                Deactivate
                                            </Button>
                                        ) : (
                                            <Button
                                                variant="outlined"
                                                size="small"
                                                color="error"
                                                sx={{ minWidth: 90, textAlign: "center", whiteSpace: "nowrap" }}
                                                onClick={() => onDelete(project.id)}
                                            >
                                                Delete
                                            </Button>
                                        )}
                                        <Button
                                            variant="outlined"
                                            size="small"
                                            color="success"
                                            sx={{
                                                minWidth: 90,
                                                textAlign: "center",
                                                whiteSpace: "normal",
                                                lineHeight: 1.2,
                                                padding: "4px 8px"
                                            }}
                                            component={Link}
                                            to={`/project-add-employees/${project.id}`}
                                        >
                                            Edit employees
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

export default EmployeeTable;