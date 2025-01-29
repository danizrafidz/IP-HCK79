import AuthInput from "../components/AuthInput";
import GoogleButton from "../components/Buttons/GoogleButton";
import HTGLogo from "../components/HTGLogo";
import { Link } from "react-router";

export default function LoginPage() {
  return (
    <div className="flex justify-center items-center h-dvh">
      <div className="flex flex-col gap-4">
        <HTGLogo />

        <fieldset className="fieldset w-xs bg-base-200 p-6 rounded gap-4">
          <h1 className="fieldset-legend text-white text-lg">
            Sign in to Hack The Grid
          </h1>

          <AuthInput label="Email" type="email" />
          <AuthInput label="Password" type="password" />

          <button className="btn btn-primary text-secondary mt-4 btn-sm">
            Sign in
          </button>
          <div className="divider text-neutral">or</div>
          <GoogleButton />
          <p className="fieldset-label">
            New to Hack The Grid?{" "}
            <Link to="/register" className="text-primary">
              Create Account →
            </Link>
          </p>
        </fieldset>
      </div>
    </div>
  );
}
