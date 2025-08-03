import React from "react";
import CreateEntityForm from "../../Components/CreateComponents/CreateSelectionForm";

const CreateProjectTypePage: React.FC = () => {
    return (
        <>
            <CreateEntityForm entityType="ProjectType" />
        </>
    );
};

export default CreateProjectTypePage;