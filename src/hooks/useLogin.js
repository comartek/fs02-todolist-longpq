import instance from "../services/services";
import useToast from "./useToast";

let useLogin = () => {
  const toast = useToast();
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

    toast(
      instance
        .request(options)
        .then((res) => {
          console.log(res.data);
          localStorage.setItem("token", res.data.token);
        })
        .then(() => {
          setTimeout(() => navigate("/App"), 3000);
        })
        .catch((err) => toast.error(err.response.data)),
      "Logging in...",
      "Login successful!!!",
      "Login failed"
    );
  };

  return login;
};

export default useLogin;
