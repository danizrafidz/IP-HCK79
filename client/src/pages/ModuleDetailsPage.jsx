import { useEffect, useState } from "react";
import api from "../helpers/axiosInstance";
import { useNavigate, useParams } from "react-router";

export default function ModuleDetailsPage() {
  let { id } = useParams();
  let [module, setModule] = useState({});
  const access_token = localStorage.getItem("access_token");

  const navigate = useNavigate();
  let teamColor = {
    Red: "bg-[#422834] text-[#ff3d3d]",
    Blue: "bg-[#153557] text-[#0088ff]",
    Purple: "bg-[#321d57] text-[#c466ff]",
  };

  let tierColor = {
    "Tier 0": "bg-[#3d4654] text-[#d8dde8]",
    "Tier I": "bg-[#314729] text-[#9ef007]",
    "Tier II": "bg-[#1d474a] text-[#2ee8a1]",
    "Tier III": "bg-[#153557] text-[#0088ff]",
    "Tier IV": "bg-[#321d57] text-[#c466ff]",
  };

  let difficultyColor = {
    Fundamental: "bg-[#3d4654] text-[#d8dde8]",
    Easy: "bg-[#314729] text-[#9ef007]",
    Medium: "bg-[#423c28] text-[#ffae00]",
    Hard: "bg-[#422834] text-[#ff3d3d]",
  };

  const fetchModuleById = async () => {
    try {
      const { data } = await api({
        method: "GET",
        url: `/modules/${id}`,
        headers: {
          authorization: `Bearer ${access_token}`,
        },
      });
      setModule(data);
    } catch (err) {
      console.log(err, "<<< err fetchModuleById");
    }
  };

  useEffect(() => {
    fetchModuleById();
  }, [id]);

  return (
    <div className="flex flex-col">
      <div className="flex justify-between mx-8">
        <h1 className="text-xl font-semibold">{module.title}</h1>
        <div className="breadcrumbs text-sm">
          <ul>
            <li>
              <a>Pages</a>
            </li>
            <li>
              <a>Modules</a>
            </li>
            <li>
              <a>Detail</a>
            </li>
            <li>{module.id}</li>
          </ul>
        </div>
      </div>
      <div className="divider"></div>
      <div className="divider"></div>
      <div className="divider"></div>
      <div className="flex flex-col md:flex-row bg-[#1b2333] mx-16 shadow-lg rounded-lg overflow-hidden p-4">
        <img
          className="w-auto h-32  md:h-48 object-cover"
          src={module.imageUrl}
          alt="Card image"
        />
        <div className="flex flex-col flex-1 p-4">
          <div className="flex justify-between items-center mb-2">
            <h5 className="text-lg font-semibold">{module.title}</h5>
            <div className="flex gap-1">
              <div className="card-actions justify-start">
                <div className={`badge ${tierColor[module.tier]}`}>
                  {module.tier}
                </div>
                <div className={`badge ${difficultyColor[module.difficulty]}`}>
                  {module.difficulty}
                </div>
                <div className={`badge ${teamColor[module.Team?.name]}`}>
                  {module.Team?.name}
                </div>
              </div>
            </div>
          </div>
          <p className="text-sm text-white">{module.description}</p>
        </div>
      </div>
      <div className="divider"></div>
      <div className="divider"></div>
      <div className="divider"></div>
    </div>
  );
}
