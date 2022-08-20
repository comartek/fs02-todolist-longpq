import { useState } from "react";
import { useNavigate } from "react-router-dom";
import InputItem from "./components/InputItem";
import { login } from "./Data";
import { validate, validatePassword } from "./validate";

let Login = (props) => {
  let navigate = useNavigate();
  let [email, setEmail] = useState("");
  let [password, setPassword] = useState("");

  return (
    <div className="bg-red-400 h-screen items-center justify-center flex">
      <div className="bg-white text-red-400 w-fit items-center flex flex-col p-5 rounded-md">
        <div className="font-bold text-xl uppercase">Login</div>
        <InputItem
          placeholder="email"
          value={email}
          setValue={setEmail}
          validate={validate}
        />
        <InputItem
          validate={validatePassword}
          type="password"
          placeholder="password"
          value={password}
          setValue={setPassword}
        />
        <button
          className="bg-red-400 w-full p-3 mt-3"
          onClick={() => login(email, password, navigate)}
        >
          <div className="text-white">Login</div>
        </button>
        <div>
          <div className="text-gray-600 mt-3">
            Have no account?{" "}
            <button
              className="text-red-400"
              onClick={() => navigate("/Register")}
            >
              Register
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
