
import { useCreateAbsenceReasonMutation, useCreatePositionMutation, useCreateProjectTypeMutation, useCreateSubdivisionMutation } from "../services/selectionService";
import { EntityType } from "../types/Selection";

export const useCreateEntityMutation = (entityType: EntityType) => {
    const mutationMap = {
        Subdivision: useCreateSubdivisionMutation,
        Position: useCreatePositionMutation,
        ProjectType: useCreateProjectTypeMutation,
        AbsenceReason: useCreateAbsenceReasonMutation,
    };

    return mutationMap[entityType]();
};