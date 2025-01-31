import { useEffect, useState } from "react";
// import api from "../helpers/axiosInstance";
import ModuleCard from "../components/ModuleCard";

import { useSelector, useDispatch } from "react-redux";
import { fetchModulesUnlocked } from "../features/myModules/myModuleSlice";

export default function ModulesUnlockedPage() {
  // const [myModules, setMyModules] = useState([]);
  // const access_token = localStorage.getItem("access_token");

  const myModules = useSelector((state) => state.myModules);
  const dispatch = useDispatch();

  // async function fetchModulesUnlocked() {
  //   try {
  //     const { data } = await api({
  //       method: "GET",
  //       url: "/mymodules",
  //       headers: {
  //         authorization: `Bearer ${access_token}`,
  //       },
  //     });
  //     setMyModules(data);
  //   } catch (err) {
  //     console.log(err, "<<< err fetchModulesUnlocked");
  //   }
  // }
  useEffect(() => {
    dispatch(fetchModulesUnlocked());
  }, []);

  if (myModules.length === 0) {
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
        <h1 className="text-xl font-semibold">UNLOCKED MODULES</h1>
        <div className="breadcrumbs text-sm">
          <ul>
            <li>
              <a>Pages</a>
            </li>
            <li>
              <a>Modules</a>
            </li>
            <li>Unlocked</li>
          </ul>
        </div>
      </div>
      <div className="container w-full flex flex-wrap justify-center">
        {myModules.map((myModule) => (
          <ModuleCard
            key={myModule.id}
            module={myModule.Module}
            cardType="MyModule"
            fetchModulesUnlocked={fetchModulesUnlocked}
            myModuleId={myModule.id}
            isCompleted={myModule.isCompleted}
          />
        ))}
      </div>
    </div>
  );
}
