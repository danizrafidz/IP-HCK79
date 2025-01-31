import { SiSendgrid } from "react-icons/si";
import { MdFactCheck } from "react-icons/md";
import { ImBoxRemove } from "react-icons/im";
import { useNavigate } from "react-router";
import { FaCheck } from "react-icons/fa";
import Toast from "../helpers/toast";
import api from "../helpers/axiosInstance";
import { useDispatch } from "react-redux";

export default function ModuleCard({
  module,
  cardType,
  fetchModulesUnlocked,
  myModuleId,
  isCompleted,
}) {
  const dispatch = useDispatch();
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

  const access_token = localStorage.getItem("access_token");
  async function handleUnlockModule() {
    try {
      await api({
        method: "POST",
        url: `/mymodules/${module.id}`,
        headers: {
          authorization: `Bearer ${access_token}`,
        },
      });
      Toast.fire({
        icon: "success",
        title: "Success",
        text: "You have unlocked a module",
      });
      navigate("/modules/unlocked");
    } catch (err) {
      console.log(err, "<<< err handleUnlockModule");
      Toast.fire({
        icon: "error",
        title: "Error",
        text: err.response.data.message,
      });
    }
  }

  async function handleRemoveModule(e) {
    try {
      e.stopPropagation(e);
      await api({
        method: "DELETE",
        url: `/mymodules/${myModuleId}`,
        headers: {
          authorization: `Bearer ${access_token}`,
        },
      });
      Toast.fire({
        icon: "success",
        title: "Success",
        text: "You have removed a module",
      });
      dispatch(fetchModulesUnlocked());
    } catch (err) {
      console.log(err, "<<< err handleRemoveModule");
      Toast.fire({
        icon: "error",
        title: "Error",
        text: err.response.data.message,
      });
    }
  }

  async function handleCompleteModule(e) {
    try {
      e.stopPropagation();
      await api({
        method: "PATCH",
        url: `/mymodules/${myModuleId}/complete`,
        headers: {
          authorization: `Bearer ${access_token}`,
        },
      });
      Toast.fire({
        icon: "success",
        title: "Success",
        text: "You have completed a module",
      });
      dispatch(fetchModulesUnlocked());
    } catch (err) {
      console.log(err, "<<< err handleCompleteModule");
      Toast.fire({
        icon: "error",
        title: "Error",
        text: err.response.data.message,
      });
    }
  }

  return (
    <div
      onClick={() => navigate(`/module/details/${module.id}`)}
      className={`card bg-[#1b2333] w-96 shadow-sm m-3 cursor-pointer hover:opacity-75 hover:scale-110 ${
        cardType === "RecModule" ? "border-2 border-primary" : ""
      }`}
    >
      <figure>
        <img src={module.imageUrl} alt={module.title} />
      </figure>
      <div className="card-body">
        <h2 className="card-title flex justify-between items-start">
          {module.title}
          <div className={`badge ${teamColor[module.Team.name]}`}>
            {module.Team.name}
          </div>
        </h2>
        <div className="flex justify-between">
          <div className="card-actions justify-start">
            <div className={`badge ${tierColor[module.tier]}`}>
              {module.tier}
            </div>
            <div className={`badge ${difficultyColor[module.difficulty]}`}>
              {module.difficulty}
            </div>
          </div>

          {cardType === "Module" || cardType === "RecModule" ? (
            <div>
              <button
                className="btn btn-sm btn-outline btn-primary"
                onClick={handleUnlockModule}
              >
                <SiSendgrid />
                Unlock
              </button>
            </div>
          ) : (
            <div className="flex items-end gap-2">
              <button
                className="btn btn-sm btn-outline btn-error"
                onClick={handleRemoveModule}
              >
                <ImBoxRemove />
                Remove
              </button>
              {isCompleted ? (
                <button
                  className="btn btn-sm btn-outline btn-primary"
                  onClick={handleCompleteModule}
                >
                  <FaCheck />
                </button>
              ) : (
                <button
                  className="btn btn-sm btn-outline btn-info"
                  onClick={handleCompleteModule}
                >
                  <MdFactCheck />
                  Complete
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
