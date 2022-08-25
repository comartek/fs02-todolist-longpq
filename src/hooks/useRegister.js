import { toast } from "react-toastify";
import instance from "../services/services";

let useRegister = () => {
  let register = (name, email, password, age, navigate) => {
    const options = {
      method: "POST",
      url: `user/register`,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      data: {
        name: name,
        email: email,
        password: password,
        age: age,
      },
    };

    instance
      .request(options)
      .then((res) => {
        console.log(res.data);
        localStorage.setItem("token", res.token);
      })
      .then(() =>
        setTimeout(() => toast.success("Create account successful!!!"), 2000)
      )
      .then(() => navigate("/"))
      .catch((err) => toast.error(err.response.data));
  };

  return register;
};

export default useRegister;
