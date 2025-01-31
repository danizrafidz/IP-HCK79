import { useEffect, useState } from "react";
import api from "../helpers/axiosInstance";
import ModuleCard from "../components/ModuleCard";
import Toast from "../helpers/toast";

export default function ModulesPage() {
  const [modules, setModules] = useState([]);
  const [recModules, setRecModules] = useState([]);
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
      Toast.fire({
        title: "Error",
        icon: "error",
        text: err.response.data.message,
      });
    }
  }
  useEffect(() => {
    fetchModules();
  }, []);

  async function fetchRecommendedModules() {
    try {
      const { data } = await api({
        method: "GET",
        url: "/modules/recommended",
        headers: {
          authorization: `Bearer ${access_token}`,
        },
      });
      setRecModules(data);
    } catch (err) {
      console.log(err, "<<< err fetchRecommendedModules");
      Toast.fire({
        title: "Error",
        icon: "error",
        text: err.response.data.message,
      });
    }
  }
  useEffect(() => {
    fetchRecommendedModules();
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
      <div className="flex justify-between mx-8">
        <h1 className="text-xl font-semibold">MODULES</h1>
        <div className="breadcrumbs text-sm">
          <ul>
            <li>
              <a>Pages</a>
            </li>
            <li>Modules</li>
          </ul>
        </div>
      </div>
      <div className="container w-full flex flex-wrap justify-center">
        {recModules.map((recModule) => (
          <ModuleCard key={recModule.id} module={recModule} cardType="RecModule" />
        ))}
        {modules.map((module) => (
          <ModuleCard key={module.id} module={module} cardType="Module" />
        ))}
      </div>
    </div>
  );
}
