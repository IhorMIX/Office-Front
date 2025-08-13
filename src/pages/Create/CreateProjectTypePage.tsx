import React from "react";
import CreateEntityForm from "../../Components/CreateForms/CreateSelectionForm";

const CreateProjectTypePage: React.FC = () => {
    return (
        <>
            <CreateEntityForm entityType="ProjectType" />
        </>
    );
};

export default CreateProjectTypePage;