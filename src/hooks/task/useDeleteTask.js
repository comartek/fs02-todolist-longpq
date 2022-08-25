import instance from "../../services/services";
import useToast from "../useToast";
import useGetAllTask from "./useGetAllTask";
import useGetTaskByPaginition from "./useGetTaskByPagination";

let useDeleteTask = () => {
  const getAllTask = useGetAllTask();
  const getTaskByPagination = useGetTaskByPaginition();
  const toast = useToast();
  let deleteTask = (id, count, dispatchCurPage) => {
    const options = {
      method: "DELETE",
      url: `task/${id}`,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    };

    toast(
      instance
        .request(options)
        .then((res) => {
          console.log(res.data);
          getTaskByPagination(10, count * 10 - 10);
        })
        .then(() => {
          getAllTask();
          dispatchCurPage(count);
          console.log(count);
        })
        .catch((err) => console.log(err.response.data)),
      "Deleting task...",
      "Delete task successful!!!",
      "Deleting task failed"
    );
  };
  return deleteTask;
};

export default useDeleteTask;
