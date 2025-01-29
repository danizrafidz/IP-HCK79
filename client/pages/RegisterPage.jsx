import AuthInput from "../components/AuthInput";
import GoogleButton from "../components/Buttons/GoogleButton";
import HTGLogo from "../components/HTGLogo";
import { Link } from "react-router";

export default function RegisterPage() {
  return (
    <div className="flex justify-center items-center h-dvh">
      <div className="flex flex-col gap-4">
        <HTGLogo />

        <fieldset className="fieldset w-xs bg-base-200 p-6 rounded gap-4">
          <h1 className="fieldset-legend text-white text-lg">
            Create a Hack The Grid account
          </h1>

          <AuthInput label="Username" type="text" />
          <AuthInput label="Email" type="email" />
          <AuthInput label="Password" type="password" />

          
          <div className="divider text-neutral">or</div>
          <GoogleButton />
          <p className="fieldset-label">
            Already have a Hack The Grid account?{" "}
            <Link to="/login" className="text-primary">
              Sign In →
            </Link>
          </p>
        </fieldset>
      </div>
    </div>
  );
}
