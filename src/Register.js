import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import BtnUI from "./components/BtnUI";
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
        <BtnUI
          text="Register"
          action={() => register(name, email, password, age, navigate)}
        />
        <div>
          <div className="text-gray-600 mt-3">
            Already have account?{" "}
            <button className="text-red-400" onClick={() => navigate("/")}>
              Login
            </button>
          </div>
        </div>
      </div>

      <ToastContainer
        position="bottom-center"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  );
};

export default Register;
