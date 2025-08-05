import React from "react";
import CreateEntityForm from "../../Components/CreateComponents/CreateSelectionForm";

const CreateSubdivisionPage: React.FC = () => {
    return (
        <>
            <CreateEntityForm entityType="Subdivision" />
        </>
    );
};

export default CreateSubdivisionPage;