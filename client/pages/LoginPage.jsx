import { useEffect, useState } from "react";
import AuthInput from "../components/AuthInput";
import HTGLogo from "../components/HTGLogo";
import { Link, useNavigate } from "react-router";
import Swal from "sweetalert2";
import api from "../helpers/axiosInstance";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  async function handleLogin(e) {
    try {
      e.preventDefault();

      const { data } = await api({
        method: "POST",
        url: "/login",
        data: { email, password },
      });
      localStorage.setItem("access_token", data.access_token);
      navigate("/");
    } catch (err) {
      console.log(err, "<<< err handleLogin");
      Swal.fire({
        icon: "error",
        title: "Error",
        text: err.response.data.message,
      });
    }
  }

  async function handleCredentialResponse(response) {
    try {
      console.log("Encoded JWT ID token: " + response.credential);
      const { data } = await api({
        method: "POST",
        url: "/login/google",
        data: {
          googleToken: response.credential,
        },
      });

      console.log(data, "<-- data");
      localStorage.setItem("access_token", data.access_token);
      navigate("/modules");
    } catch (err) {
      console.log(err, "<<< err handleCredentialResponse");
      Swal.fire({
        icon: "error",
        title: "Error",
        text: err.response.data.message,
      });
    }
  }

  useEffect(() => {
    google.accounts.id.initialize({
      client_id:
        "981560487094-9vbsa6vsghfkphtnk2kelpqei5fl1u8a.apps.googleusercontent.com",
      callback: handleCredentialResponse,
    });
    google.accounts.id.renderButton(
      document.getElementById("buttonDiv"),
      { theme: "outline", size: "large" } // customization attributes
    );
    google.accounts.id.prompt();
  }, []);

  return (
    <div className="flex justify-center items-center h-dvh">
      <div className="flex flex-col gap-4">
        <HTGLogo />

        <form onSubmit={handleLogin}>
          <fieldset className="fieldset w-xs bg-base-200 p-6 rounded gap-4">
            <h1 className="fieldset-legend text-white text-lg">
              Sign in to Hack The Grid
            </h1>

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

            <button className="btn btn-primary text-secondary mt-4 btn-sm">
              Sign in
            </button>
            <div className="divider text-neutral">or</div>

            <div className="w-full flex justify-center">
              <div id="buttonDiv"></div>
            </div>

            <p className="fieldset-label">
              New to Hack The Grid?{" "}
              <Link to="/register" className="text-primary">
                Create Account →
              </Link>
            </p>
          </fieldset>
        </form>
      </div>
    </div>
  );
}
