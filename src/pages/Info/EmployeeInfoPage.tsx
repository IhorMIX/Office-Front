import { useParams } from "react-router-dom";
import EmployeeInfo from "../../Components/Info/EmployeeInfo";
import React from "react";

const EmployeeInfoPage: React.FC = () => {
    const { id } = useParams<string>();

    return (
        <>
            <EmployeeInfo id={id!} />
        </>
    );
};

export default EmployeeInfoPage;