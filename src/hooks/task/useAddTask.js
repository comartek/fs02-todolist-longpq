import { toast } from "react-toastify";
import instance from "../../services/services";
import useToast from "../useToast";
import useGetTaskByPaginition from "./useGetTaskByPagination";

let useAddTask = () => {
  const getTaskByPagination = useGetTaskByPaginition();
  const toast = useToast();
  let addTask = (content, updateCount, count, dispatchCurPage) => {
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

    toast(
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
        .catch((err) => console.log(err.response.data)),
      "Adding task...",
      "Add task successful!!!",
      "Add task failed"
    );
  };

  return addTask;
};

export default useAddTask;
