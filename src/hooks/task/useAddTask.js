import { toast } from "react-toastify";
import instance from "../../services/services";
import useGetTaskByPaginition from "./useGetTaskByPagination";

let useAddTask = () => {
  const getTaskByPagination = useGetTaskByPaginition();
  let addTask = (
    content,
    dispatchSetTodos,
    updateCount,
    count,
    dispatchCurPage
  ) => {
    const options = {
      method: "POST",
      url: `task`,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      data: {
        description: content,
      },
    };

    instance
      .request(options)
      .then((res) => {
        console.log(res.data);
        getTaskByPagination(10, count * 10 - 10);
        updateCount();
        dispatchCurPage(count);
      })
      .then(() => {
        console.log(count);
      })
      .then(() => toast.success("Add task successful!!!"))
      .catch((err) => console.log(err.response.data));
  };

  return addTask;
};

export default useAddTask;
