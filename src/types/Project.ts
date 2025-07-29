import { ProjectManager } from "./Employee";
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