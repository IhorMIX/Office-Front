import { BaseManager, Employee } from "./Employee"
import { AbsenceReason } from "./Selection"

export interface CreateLeaveRequest {
    absenceReasonId: number
    approverId : number
    startDate: string
    endDate: string
    comment: string | null
}

export interface LeaveRequest {
    id: number
    employee: Employee
    approvalRequest: ApprovalRequest
    absenceReason : AbsenceReason
    startDate: Date
    endDate: Date
    status: LeaveRequestStatus
    comment: string
}

export enum LeaveRequestStatus{
    Submit = "Submit",
    Cancel = "Cancel"
}

export interface ApprovalRequest {
    id: number
    approver: BaseManager
    leaveRequest : LeaveRequest
    approvalRequestStatus: Status
    comment: string | null
}

export enum Status {
    New = "New",
    Approved = "Approved",
    Rejected = "Rejected"
} 