import { useState } from "react";
import { useNavigate } from "react-router-dom";
import InputItem from "./components/InputItem";
import { register } from "./Data";
import { validate, validatePassword } from "./validate";

let Register = (props) => {
  let navigate = useNavigate();
  let [name, setName] = useState("");
  let [email, setEmail] = useState("");
  let [password, setPassword] = useState("");
  let [age, setAge] = useState("");

  return (
    <div className="bg-red-400 h-screen items-center justify-center flex">
      <div className="bg-white text-red-400 w-fit items-center flex flex-col p-5 rounded-md">
        <div className="font-bold text-xl uppercase">Register</div>
        <InputItem placeholder="name" value={name} setValue={setName} />
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
        <InputItem placeholder="age" value={age} setValue={setAge} />
        <button
          className="bg-red-400 w-full p-3 mt-3"
          onClick={() => register(name, email, password, age, navigate)}
        >
          <div className="text-white">Register</div>
        </button>
        <div>
          <div className="text-gray-600 mt-3">
            Already have account?{" "}
            <button className="text-red-400" onClick={() => navigate("/")}>
              Login
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
