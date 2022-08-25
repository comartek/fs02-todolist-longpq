import { toast } from "react-toastify";
import instance from "../../services/services";
import useGetTaskByPaginition from "./useGetTaskByPagination";

let useUpdateTask = () => {
  const getTaskByPagination = useGetTaskByPaginition();
  let updateTask = (id, completed, curPage) => {
    let data =
      completed === true || completed === false
        ? { completed: completed }
        : { description: completed };

    console.log({ id, completed });
    const options = {
      method: "PUT",
      url: `task/${id}`,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      data: data,
    };

    instance
      .request(options)
      .then((res) => {
        // setTask(res.data.data);
        getTaskByPagination(10, curPage * 10 - 10);
        console.log(res.data);
      })
      .then(() => toast.success("Update task successful!!!"))
      .catch((err) => console.log(err.response.data));
  };

  return updateTask;
};

export default useUpdateTask;
