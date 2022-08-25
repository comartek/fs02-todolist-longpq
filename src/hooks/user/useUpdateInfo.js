import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import instance from "../../services/services";
import { setUser } from "../../store/actions";
import { userSelector } from "../../store/selectors";
import useToast from "../useToast";

let useUpdateInfo = () => {
  let dispatchRedux = useDispatch();
  const toast = useToast();
  let dispatchUser = (data) => {
    dispatchRedux(setUser(data));
  };
  let updateInfo = (name, email, age) => {
    const options = {
      method: "PUT",
      url: `/user/me`,
      headers: {
        "Content-Type": "application/json",
        Authorization: `${localStorage.getItem("token")}`,
      },
      data: {
        name: name,
        email: email,
        age: age,
      },
    };

    toast(
      instance
        .request(options)
        .then((res) => {
          console.log(res.data);
          dispatchUser(res.data.data);
        })
        // .then(() => toast.success(""))
        .catch((err) => toast.error(err.response.data)),
      "Updating information...",
      "Update information successful!!!",
      "Update information failed"
    );
  };
  return updateInfo;
};

export default useUpdateInfo;
