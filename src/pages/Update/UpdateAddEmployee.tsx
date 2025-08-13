import { useParams } from "react-router-dom";
import AddEmployeeForm from "../../Components/UpdateForms/AddEmployeeForm";
import React from "react";

const UpdateAddEmployee: React.FC = () => {
    const { id } = useParams<string>(); 

    return (
        <>
            <AddEmployeeForm id={id!}  />
        </>
    );
};

export default UpdateAddEmployee;