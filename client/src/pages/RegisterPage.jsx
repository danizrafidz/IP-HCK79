import { useEffect, useState } from "react";
import AuthInput from "../components/AuthInput";
import HTGLogo from "../components/HTGLogo";
import { Link, useNavigate } from "react-router";
import api from "../helpers/axiosInstance";
import Toast from "../helpers/toast";

export default function RegisterPage() {
  const navigate = useNavigate();

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [team, setTeam] = useState(0);

  async function handleRegister(e) {
    try {
      e.preventDefault();

      await api({
        method: "POST",
        url: "/register",
        data: { fullName, email, password, TeamId: team },
      });
      Toast.fire({
        icon: "success",
        title: "Success",
        text: "Successful register",
      });
      navigate("/");
    } catch (err) {
      console.log(err, "<<< err handleRegister");
      Toast.fire({
        icon: "error",
        title: "Error",
        text: err.response.data.message,
      });
    }
  }

  return (
    <div className="flex justify-center items-center h-dvh">
      <div className="flex flex-col gap-4 scale-125">
        <HTGLogo />

        <form onSubmit={handleRegister}>
          <fieldset className="fieldset w-xs bg-base-200 p-6 rounded gap-4">
            <h1 className="fieldset-legend text-white text-lg">
              Create a Hack The Grid account
            </h1>

            <AuthInput
              label="Full Name"
              type="text"
              value={fullName}
              setValue={setFullName}
            />
            <AuthInput
              label="Email"
              type="email"
              value={email}
              setValue={setEmail}
            />
            <AuthInput
              label="Password"
              type="password"
              value={password}
              setValue={setPassword}
            />

            <label className="fieldset-label text-neutral">Team</label>
            <div className="flex justify-between">
              <div>
                <label className="text-red-300 font-extrabold mr-2">Red</label>
                <input
                  type="radio"
                  name="team-radio"
                  value="1"
                  onClick={(e) => setTeam(e.target.value)}
                  className="radio bg-red-100 border-red-300 checked:bg-red-200 checked:text-red-600 checked:border-red-600"
                />
              </div>
              <div>
                <label className="text-blue-300 font-extrabold mr-2">
                  Blue
                </label>
                <input
                  type="radio"
                  name="team-radio"
                  value="2"
                  onClick={(e) => setTeam(e.target.value)}
                  className="radio bg-blue-100 border-blue-300 checked:bg-blue-200 checked:text-blue-600 checked:border-blue-600"
                />
              </div>
              <div>
                <label className="text-purple-300 font-extrabold mr-2">
                  Purple
                </label>
                <input
                  type="radio"
                  name="team-radio"
                  value="3"
                  onClick={(e) => setTeam(e.target.value)}
                  className="radio bg-purple-100 border-purple-300 checked:bg-purple-200 checked:text-purple-600 checked:border-purple-600"
                />
              </div>
            </div>

            <button className="btn btn-primary text-secondary mt-4 btn-sm">
              Sign up
            </button>

            <p className="fieldset-label">
              Already have a Hack The Grid account?{" "}
              <Link to="/" className="text-primary">
                Sign In →
              </Link>
            </p>
          </fieldset>
        </form>
      </div>
    </div>
  );
}
