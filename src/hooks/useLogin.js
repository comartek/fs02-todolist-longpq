import { toast } from "react-toastify";
import instance from "../services/services";

let useLogin = () => {
  let login = (email, password, navigate) => {
    const options = {
      method: "POST",
      url: `user/login`,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      data: {
        email: email,
        password: password,
      },
    };

    instance
      .request(options)
      .then((res) => {
        console.log(res.data);
        localStorage.setItem("token", res.data.token);
        toast.success("Login successful!!!");
      })
      .then(() => {
        setTimeout(() => navigate("/App"), 3000);
      })
      .catch((err) => toast.error(err.response.data));
  };

  return login;
};

export default useLogin;
