import { useNavigate } from "react-router-dom";
import instance from "../services/services";
import useToast from "./useToast";

let useLogout = () => {
  const toast = useToast();
  const navigate = useNavigate();
  let logout = () => {
    const options = {
      method: "POST",
      url: `/user/logout`,
      headers: { Authorization: `${localStorage.getItem("token")}` },
    };

    toast(
      instance
        .request(options)
        .then((res) => {
          console.log(res.data);
        })
        .then(() => navigate("/"))
        .catch((err) => toast.error(err.response.data)),
      "Logging out...",
      "Logout successful!!!",
      "Logout failed"
    );
  };

  return logout;
};

export default useLogout;
