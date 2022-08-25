import { useDispatch } from "react-redux";
import instance from "../../services/services";
import { setTodos } from "../../store/actions";

let useGetTaskByPaginition = () => {
  let dispatchRedux = useDispatch();

  let dispatchSetTodos = (data) => {
    dispatchRedux(setTodos(data));
  };

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

    instance
      .request(options)
      .then((res) => {
        dispatchSetTodos(res.data.data);
      })
      .catch((err) => console.log(err.response.data));
  };
  return getTaskByPagination;
};

export default useGetTaskByPaginition;
