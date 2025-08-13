import { useParams } from "react-router-dom";
import LeaveRequestInfo from "../../Components/Info/LeaveRequestInfo";
import React from "react";

const LeaveRequestInfoPage: React.FC = () => {
    const { id } = useParams<string>(); 

    return (
        <>
            <LeaveRequestInfo id={id!}  />
        </>
    );
};

export default LeaveRequestInfoPage;