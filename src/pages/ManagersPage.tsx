import React, { useEffect, useState } from "react";
import { useGetAllManagersQuery } from "../services/managerService";
import { BaseManager } from "../types/Employee";
import ManagerTable from "../Components/Tables/ManagerTable";


const ManagersPage = () => {

  const {data: managersList } = useGetAllManagersQuery(null);
  const [managers, setManagers] = useState<BaseManager[]>([])

  useEffect(() => {
    if (managersList) {
      setManagers(managersList);
    }
  }, [managersList]);


  const handleEdit = (id: number) => {
    // Реализация редактирования

  };

  const handleDelete = (id: number) => {
    // Реализация удаления
    setManagers(managers.filter((manager) => manager.id !== id));
  };

  return (
    <>
      <div>
        <h1>Managers Page</h1>
      </div>     
      <ManagerTable managers={managers} onEdit={handleEdit} onDelete={handleDelete}/>
    </>
  );
};
export default ManagersPage;