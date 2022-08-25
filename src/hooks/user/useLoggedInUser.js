import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import instance from "../../services/services";
import { setUser } from "../../store/actions";
import { userSelector } from "../../store/selectors";
import useToast from "../useToast";

let useGetLoggedInUser = () => {
  let user = useSelector(userSelector);

  let dispatchRedux = useDispatch();
  let dispatchUser = (data) => {
    dispatchRedux(setUser(data));
  };

  let toast = useToast();
  let getLoggedInUser = () => {
    const options = {
      method: "GET",
      url: `/user/me`,
      headers: { Authorization: `${localStorage.getItem("token")}` },
    };

    instance
      .request(options)
      .then((res) => {
        dispatchUser(res.data);
      })
      .catch((err) => console.log(err.response.data));
  };

  useEffect(() => {
    getLoggedInUser();
  }, []);

  return user;
};

export default useGetLoggedInUser;
