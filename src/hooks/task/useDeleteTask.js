import { toast } from "react-toastify";
import instance from "../../services/services";
import useGetAllTask from "./useGetAllTask";
import useGetTaskByPaginition from "./useGetTaskByPagination";

let useDeleteTask = () => {
  const getAllTask = useGetAllTask();
  const getTaskByPagination = useGetTaskByPaginition();
  let deleteTask = (id, count, dispatchCurPage) => {
    const options = {
      method: "DELETE",
      url: `task/${id}`,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    };

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
      .then(() => toast.success("Delete task successful!!!"))
      .catch((err) => console.log(err.response.data));
  };
  return deleteTask;
};

export default useDeleteTask;
