import React from "react";
import CreateEntityForm from "../../Components/CreateForms/CreateSelectionForm";

const CreateSubdivisionPage: React.FC = () => {
    return (
        <>
            <CreateEntityForm entityType="Subdivision" />
        </>
    );
};

export default CreateSubdivisionPage;