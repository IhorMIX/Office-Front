import React from "react";
import {
  Button,
  Container,
  Paper,
  TextField,
  Typography,
  Box,
} from "@mui/material";
import { EntityType } from "../../types/Selection";
import { SubmitHandler, useForm } from "react-hook-form";
import { useCreateEntityMutation } from "../../Hooks/MutationMap";

interface FormModel {
  name: string;
  reasonDescription?: string;
}

interface CreateEntityFormProps {
  entityType: EntityType;
}

const CreateEntityForm: React.FC<CreateEntityFormProps> = ({ entityType }) => {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<FormModel>();
  const [createEntity] = useCreateEntityMutation(entityType);

  const onSubmit: SubmitHandler<FormModel> = async (data: FormModel) => {
    try {
      await createEntity(data).unwrap();
      console.log(`${entityType} created successfully`);
    } catch (error) {
      console.error(`Failed to create ${entityType}:`, error);
    }
  };

  const getTitle = () => {
    switch (entityType) {
      case "Subdivision":
        return "Create Subdivision";
      case "Position":
        return "Create Position";
      case "ProjectType":
        return "Create Project Type";
      case "AbsenceReason":
        return "Create Absence Reason";
      default:
        return "Create Entity";
    }
  };

  return (
    <Container maxWidth="sm">
      <Paper
        elevation={4}
        sx={{
          mt: 5,
          p: 4,
          borderRadius: 3,
          backgroundColor: "#f9fbfc",
        }}
      >
        <Typography variant="h5" sx={{ fontWeight: "bold", mb: 3 }}>
          {getTitle()}
        </Typography>

        <form onSubmit={handleSubmit(onSubmit)}>
          <Box display="flex" flexDirection="column" gap={3}>
            {entityType !== "AbsenceReason" && (
              <TextField
                {...register("name", { required: "Name is required" })}
                label="Name"
                fullWidth
                error={!!errors.name}
                helperText={errors.name?.message}
              />
            )}

            {entityType === "AbsenceReason" && (
              <TextField
                {...register("reasonDescription", {
                  required: "Reason Description is required",
                })}
                label="Reason Description"
                fullWidth
                error={!!errors.reasonDescription}
                helperText={errors.reasonDescription?.message}
              />
            )}

            <Button type="submit" variant="contained" size="large" fullWidth>
              {getTitle()}
            </Button>
          </Box>
        </form>
      </Paper>
    </Container>
  );
};

export default CreateEntityForm;
