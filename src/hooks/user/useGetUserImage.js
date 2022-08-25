import { useDispatch } from "react-redux";
import instance from "../../services/services";
import { setAvatar } from "../../store/actions";

let useGetUserImage = () => {
  let dispatchRedux = useDispatch();

  let dispatchAvatar = (data) => {
    dispatchRedux(setAvatar(data));
  };
  let getUserImage = (id) => {
    const options = {
      method: "GET",
      url: `user/${id}/avatar`,
    };

    instance
      .request(options)
      .then((res) => {
        dispatchAvatar(res.request.responseURL + `?${Date.now()}`);
      })
      .catch((err) => console.log(err.response.data.error));
  };

  return getUserImage;
};

export default useGetUserImage;
