import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BtnUI, InputItem } from "../components";
import { validate, validatePassword } from "../hooks/validate";
import useLogin from "../hooks/useLogin";

window.history.pushState(null, null, window.location.href);
window.onpopstate = function (event) {
  window.history.go(1);
};

let Login = (props) => {
  let navigate = useNavigate();
  let [email, setEmail] = useState("");
  let [password, setPassword] = useState("");

  const login = useLogin();

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
        <BtnUI text="Login" action={() => login(email, password, navigate)} />
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

      <ToastContainer
        position="bottom-center"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss={false}
        draggable
        pauseOnHover={false}
      />
    </div>
  );
};

export default Login;
