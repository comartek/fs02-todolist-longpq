import instance from "../../services/services";
import useToast from "../useToast";
import useGetTaskByPaginition from "./useGetTaskByPagination";

let useUpdateTask = () => {
  const getTaskByPagination = useGetTaskByPaginition();
  const toast = useToast();
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

    toast(
      instance
        .request(options)
        .then((res) => {
          // setTask(res.data.data);
          getTaskByPagination(10, curPage * 10 - 10);
          console.log(res.data);
        })
        // .then(() => toast.success("Update task successful!!!"))
        .catch((err) => console.log(err.response.data)),
      "Updating task...",
      "Update task successful!!!",
      "Update task failed"
    );
  };

  return updateTask;
};

export default useUpdateTask;
