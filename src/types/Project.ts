import { ProjectManager } from "./Employee";
import { ProjectType } from "./Selection";

export interface Project {
    id: number,
    projectManager: ProjectManager,
    projectType: ProjectType,
    startDate: Date,
    endDate: Date,
    comment: string,
    status: boolean
}