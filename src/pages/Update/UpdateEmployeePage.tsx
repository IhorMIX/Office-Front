import { useParams } from "react-router-dom";
import UpdateEmployeeForm from "../../Components/UpdateForms/UpdateEmployeeForm";
import React from "react";

const UpdateEmployeePage: React.FC = () => {
    const { id } = useParams<string>();

    return (
        <>
            <UpdateEmployeeForm id={id!} />
        </>
    );
};

export default UpdateEmployeePage;