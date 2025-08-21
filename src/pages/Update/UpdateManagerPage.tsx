import { useParams } from "react-router-dom";
import UpdateManagerForm from "../../Components/UpdateForms/UpdateManagerForm";
import React from "react";

const UpdateManagerPage: React.FC = () => {
    const { id } = useParams<string>();

    return (
        <>
            <UpdateManagerForm id={id!} />
        </>
    );
};

export default UpdateManagerPage;