export interface Selection {
    id: number
    name: string
}

export interface AbsenceReason {
    id: number,
    reasonDescription: string
}

export type EntityType = 'Subdivision' | 'Position' | 'ProjectType' | 'AbsenceReason';