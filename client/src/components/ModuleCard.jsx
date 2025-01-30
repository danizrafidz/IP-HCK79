import { SiSendgrid } from "react-icons/si";

export default function ModuleCard({ module }) {
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

  return (
    <div className="card bg-[#1b2333] w-96 shadow-sm m-3">
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

          <div>
            <button className="btn btn-sm btn-outline btn-primary">
              <SiSendgrid />
              Unlock
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
