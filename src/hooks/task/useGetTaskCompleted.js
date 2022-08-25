import { useDispatch } from "react-redux";
import instance from "../../services/services";
import { setPaginationVisible, setTodos } from "../../store/actions";
import useToast from "../useToast";

let useGetTaskCompleted = () => {
  const dispatchRedux = useDispatch();
  const dispatchSetTodos = (data) => {
    dispatchRedux(setTodos(data));
  };
  const dispatchPaginationVisible = (data) => {
    dispatchRedux(setPaginationVisible(data));
  };

  const toast = useToast();
  let getTaskCompleted = (completed) => {
    const options = {
      method: "GET",
      url: `task?completed=${completed}`,
      headers: {
        "Content-Type": "application/json",
        Authorization: `${localStorage.getItem("token")}`,
        params: {
          completed: completed,
        },
      },
    };

    toast(
      instance
        .request(options)
        .then((res) => {
          dispatchSetTodos(res.data.data);
          dispatchPaginationVisible(false);
        })
        .catch((err) => console.log(err.response.data)),
      "Loading...",
      "Load task successful!!!",
      "Load task failed"
    );
  };

  return getTaskCompleted;
};

export default useGetTaskCompleted;
