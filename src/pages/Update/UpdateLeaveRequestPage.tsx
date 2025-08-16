import { useParams } from "react-router-dom";
import UpdateLeaveRequestForm from "../../Components/UpdateForms/UpdateLeaveRequestForm";
import React from "react";

const UpdateLeaveRequestPage: React.FC = () => {
    const { id } = useParams<string>(); 

    return (
        <>
            <UpdateLeaveRequestForm id={id!}  />
        </>
    );
};

export default UpdateLeaveRequestPage;