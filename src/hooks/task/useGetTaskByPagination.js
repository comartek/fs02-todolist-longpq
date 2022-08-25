import { useDispatch } from "react-redux";
import instance from "../../services/services";
import { setPaginationVisible, setTodos } from "../../store/actions";
import useToast from "../useToast";

let useGetTaskByPaginition = () => {
  let dispatchRedux = useDispatch();

  let dispatchSetTodos = (data) => {
    dispatchRedux(setTodos(data));
  };

  const dispatchPaginationVisible = (data) => {
    dispatchRedux(setPaginationVisible(data));
  };

  const toast = useToast();

  let getTaskByPagination = (limit, skip) => {
    const options = {
      method: "GET",
      url: `task?limit=${limit}&skip=${skip}`,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        params: {
          limit: limit,
          skip: skip,
        },
      },
    };

    toast(
      instance
        .request(options)
        .then((res) => {
          dispatchSetTodos(res.data.data);
          dispatchPaginationVisible(true);
        })
        .catch((err) => console.log(err.response.data)),
      "Loading task...",
      "Load task successful!!!",
      "Loading failed"
    );
  };
  return getTaskByPagination;
};

export default useGetTaskByPaginition;
