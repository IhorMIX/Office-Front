import { useParams } from "react-router-dom";
import UpdateProjectForm from "../../Components/UpdateForms/UpdateProjectForm";
import React from "react";

const UpdateProjectPage: React.FC = () => {
    const { id } = useParams<string>();

    return (
        <>
            <UpdateProjectForm id={id!} />
        </>
    );
};

export default UpdateProjectPage;