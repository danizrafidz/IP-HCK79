import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import api from "../helpers/axiosInstance";
import ModuleCard from "../components/ModuleCard";

export default function ModulesPage() {
  const [modules, setModules] = useState([]);
  const access_token = localStorage.getItem("access_token");

  async function fetchModules() {
    try {
      const { data } = await api({
        method: "GET",
        url: "/modules",
        headers: {
          authorization: `Bearer ${access_token}`,
        },
      });
      setModules(data);
    } catch (err) {
      console.log(err, "<<< err fetchModules");
    }
  }
  useEffect(() => {
    fetchModules();
  }, []);

  if (modules.length === 0) {
    return (
      <div className="flex justify-center items-center h-[80dvh] gap-4">
        <span className="loading loading-spinner loading-lg"></span>
        <p className="text-2xl font-bold">Fetching data...</p>
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-xl font-semibold ml-8">MODULES</h1>
      <div className="container w-full flex flex-wrap justify-center">
        {modules.map((module) => (
          <ModuleCard key={module.id} module={module} />
        ))}
      </div>
    </div>
  );
}
