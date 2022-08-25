import { useState } from "react";
import instance from "../../services/services";

let useGetAllTask = () => {
  let [taskList, setTaskList] = useState([]);
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
      setTaskList(res.data.data);
    })
    .catch((err) => console.log(err.response.data));

  return taskList;
};

export default useGetAllTask;
