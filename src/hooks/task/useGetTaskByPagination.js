import { useDispatch } from "react-redux";
import instance from "../../services/services";
import { setTodos } from "../../store/actions";
import useToast from "../useToast";

let useGetTaskByPaginition = () => {
  let dispatchRedux = useDispatch();

  let dispatchSetTodos = (data) => {
    dispatchRedux(setTodos(data));
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

    // toast.promise(
    //   instance
    //     .request(options)
    //     .then((res) => {
    //       dispatchSetTodos(res.data.data);
    //     })
    //     .catch((err) => console.log(err.response.data)),
    //   {
    //     pending: "Loading task...",
    //     success: "Loading successful!!!",
    //     error: "Loading failed",
    //   }
    // );
    toast(
      instance
        .request(options)
        .then((res) => {
          dispatchSetTodos(res.data.data);
        })
        .catch((err) => console.log(err.response.data)),
      "Loading task...",
      "Loading task successful!!!",
      "Loading failed"
    );
  };
  return getTaskByPagination;
};

export default useGetTaskByPaginition;
