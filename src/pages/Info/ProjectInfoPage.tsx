import { useParams } from "react-router-dom";
import ProjectDetails from "../../Components/Info/ProjectInfo";
import React from "react";

const ProjectInfoPage: React.FC = () => {
    const { id } = useParams<string>();

    return (
        <>
            <ProjectDetails id={id!}  />
        </>
    );
};

export default ProjectInfoPage;