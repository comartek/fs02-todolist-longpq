import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import instance from "../../services/services";
import { setUser } from "../../store/actions";
import { userSelector } from "../../store/selectors";

let useUpdateInfo = () => {
  let dispatchRedux = useDispatch();
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

    instance
      .request(options)
      .then((res) => {
        console.log(res.data);
        dispatchUser(res.data.data);
      })
      .then(() => toast.success("Update information successful!!!"))
      .catch((err) => toast.error(err.response.data));
  };
  return updateInfo;
};

export default useUpdateInfo;
