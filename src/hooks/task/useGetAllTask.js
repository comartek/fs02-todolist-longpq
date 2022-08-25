import { useState } from "react";
import { useDispatch } from "react-redux";
import instance from "../../services/services";
import { setAllTask } from "../../store/actions";

let useGetAllTask = () => {
  const dispatchRedux = useDispatch();
  const dispatchAllTask = (data) => {
    dispatchRedux(setAllTask(data));
  };
  let getAllTask = () => {
    const options = {
      method: "GET",
      url: `task`,
      headers: {
        "Content-Type": "application/json",
        Authorization: `${localStorage.getItem("token")}`,
      },
    };

    instance
      .request(options)
      .then((res) => {
        dispatchAllTask(res.data.data);
      })
      .catch((err) => console.log(err.response.data));
  };

  return getAllTask;
};

export default useGetAllTask;
