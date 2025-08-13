import { Employee, ProjectManager } from "./Employee";
import { Selection } from "./Selection";

export interface Project {
    id: number,
    projectManager: ProjectManager,
    projectType: Selection,
    startDate: Date,
    endDate: Date,
    comment: string,
    status: boolean
}

export interface CreateProject {
    projectTypeId: number
    startDate: string
    endDate: string
    comment: string
    status: boolean
}

export interface ProjectInfo {
    id: number
    projectManager: ProjectManager
    projectType: Selection
    startDate: Date
    endDate: Date
    comment: string
    status: boolean
    employees: Employee[]
}

export interface AddEmployees{
    projectId: number
    employeesIds: number[]
}