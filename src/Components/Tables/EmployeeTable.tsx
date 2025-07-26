import React, { useState } from 'react';
import { Table, TableHead, TableBody, TableRow, TableCell, TableContainer, TableSortLabel, Button } from '@mui/material';
import { Employee } from '../../types/Employee';

interface TableProps {
    employees: Employee[];
    onEdit: (id: number) => void;
    onDelete: (id: number) => void;
}

// Перечисление для полей, по которым можно сортировать
enum SortField {
    ID = 'id',
    FULL_NAME = 'fullName',
    SUBDIVISION = 'subdivision.name',
    POSITION = 'position.name',
    STATUS = 'status',
    OUT_OF_OFFICE_BALANCE = 'outOfOfficeBalance',
    HR_MANAGER = 'hrManager.fullName',
}

const EmployeeTable: React.FC<TableProps> = ({ employees, onEdit, onDelete }) => {
    const [sortBy, setSortBy] = useState<SortField>(SortField.ID);
    const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');

    // Вспомогательная функция для получения значения поля по пути
    const getFieldByPath = (obj: any, path: string): any => {
        const keys = path.split('.');
        return keys.reduce((acc, key) => acc[key], obj);
    };

    // Функция для сортировки сотрудников
    const sortedEmployees = [...employees].sort((a, b) => {
        const aValue = getFieldByPath(a, sortBy);
        const bValue = getFieldByPath(b, sortBy);

        // Определение направления сортировки
        if (sortDirection === 'asc') {
            return aValue > bValue ? 1 : aValue < bValue ? -1 : 0;
        } else {
            return aValue < bValue ? 1 : aValue > bValue ? -1 : 0;
        }
    });

    // Обработчик клика по заголовку столбца для сортировки
    const handleSort = (field: SortField) => {
        if (field === sortBy) {
            setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
        } else {
            setSortBy(field);
            setSortDirection('asc');
        }
    };

    return (
        <TableContainer>
            <Table sx={{backgroundColor:"white", borderRadius:"10px"}}>
                <TableHead>
                    <TableRow>
                        <TableCell  sx={{ fontWeight: 'bold', color: "rgb(0, 80, 184)" }}>
                            <TableSortLabel
                                active={sortBy === SortField.ID}
                                direction={sortBy === SortField.ID ? sortDirection : 'asc'}
                                onClick={() => handleSort(SortField.ID)}
                            >
                                ID
                            </TableSortLabel>
                        </TableCell>
                        <TableCell  sx={{ fontWeight: 'bold', color: "rgb(0, 80, 184)" }}>
                            <TableSortLabel
                                active={sortBy === SortField.FULL_NAME}
                                direction={sortBy === SortField.FULL_NAME ? sortDirection : 'asc'}
                                onClick={() => handleSort(SortField.FULL_NAME)}
                            >
                                Full Name
                            </TableSortLabel>
                        </TableCell>
                        <TableCell  sx={{ fontWeight: 'bold', color: "rgb(0, 80, 184)" }}>
                            <TableSortLabel
                                active={sortBy === SortField.SUBDIVISION}
                                direction={sortBy === SortField.SUBDIVISION ? sortDirection : 'asc'}
                                onClick={() => handleSort(SortField.SUBDIVISION)}
                            >
                                Subdivision
                            </TableSortLabel>
                        </TableCell>
                        <TableCell  sx={{ fontWeight: 'bold', color: "rgb(0, 80, 184)" }}>
                            <TableSortLabel
                                active={sortBy === SortField.POSITION}
                                direction={sortBy === SortField.POSITION ? sortDirection : 'asc'}
                                onClick={() => handleSort(SortField.POSITION)}
                            >
                                Position
                            </TableSortLabel>
                        </TableCell>
                        <TableCell  sx={{ fontWeight: 'bold', color: "rgb(0, 80, 184)" }}>
                            <TableSortLabel
                                active={sortBy === SortField.STATUS}
                                direction={sortBy === SortField.STATUS ? sortDirection : 'asc'}
                                onClick={() => handleSort(SortField.STATUS)}
                            >
                                Status
                            </TableSortLabel>
                        </TableCell>
                        <TableCell  sx={{ fontWeight: 'bold', color: "rgb(0, 80, 184)" }}>
                            <TableSortLabel
                                active={sortBy === SortField.OUT_OF_OFFICE_BALANCE}
                                direction={sortBy === SortField.OUT_OF_OFFICE_BALANCE ? sortDirection : 'asc'}
                                onClick={() => handleSort(SortField.OUT_OF_OFFICE_BALANCE)}
                            >
                                Out Of Office Balance
                            </TableSortLabel>
                        </TableCell>
                        <TableCell  sx={{ fontWeight: 'bold', color: "rgb(0, 80, 184)"}}>
                            <TableSortLabel
                                active={sortBy === SortField.HR_MANAGER}
                                direction={sortBy === SortField.HR_MANAGER ? sortDirection : 'asc'}
                                onClick={() => handleSort(SortField.HR_MANAGER)}
                            >
                                HR Manager
                            </TableSortLabel>
                        </TableCell>
                        <TableCell  sx={{ fontWeight: 'bold', color: "rgb(0, 80, 184)" }}>Actions</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {sortedEmployees.map((employee) => (
                        <TableRow key={employee.id}>
                            <TableCell>{employee.id}</TableCell>
                            <TableCell>{employee.fullName}</TableCell>
                            <TableCell>{employee.subdivision.name}</TableCell>
                            <TableCell>{employee.position.name}</TableCell>
                            <TableCell>{employee.status ? 'Active' : 'Inactive'}</TableCell>
                            <TableCell>{employee.outOfOfficeBalance}</TableCell>
                            <TableCell>{employee.hrManager?.fullName}</TableCell>
                            <TableCell>
                                <Button onClick={() => onEdit(employee.id)}>Edit</Button>
                                <Button sx={{color:"red"}} onClick={() => onDelete(employee.id)}>Delete</Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default EmployeeTable;