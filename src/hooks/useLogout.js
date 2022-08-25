import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import instance from "../services/services";

let useLogout = () => {
  const navigate = useNavigate();
  let logout = () => {
    const options = {
      method: "POST",
      url: `/user/logout`,
      headers: { Authorization: `${localStorage.getItem("token")}` },
    };

    instance
      .request(options)
      .then((res) => {
        console.log(res.data);
      })
      .then(() => navigate("/"))
      .catch((err) => toast.error(err.response.data));
  };

  return logout;
};

export default useLogout;
