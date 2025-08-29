import { useParams } from "react-router-dom";
import ManagerDetails from "../../Components/Info/ManagerInfo";
import React from "react";

const ManagerInfoPage: React.FC = () => {
    const { id } = useParams<string>();

    return (
        <>
            <ManagerDetails id={id!} />
        </>
    );
};

export default ManagerInfoPage;