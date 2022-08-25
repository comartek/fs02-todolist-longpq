import { useSelector } from "react-redux";
import instance from "../../services/services";
import { filterIsChooseSelector } from "../../store/selectors";
import useFilter from "../useFilter";
import useToast from "../useToast";
import useGetAllTask from "./useGetAllTask";

let useDeleteTask = () => {
  const getAllTask = useGetAllTask();
  const toast = useToast();
  const filter = useFilter();
  const filterIsChoose = useSelector(filterIsChooseSelector);
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
          filter(filterIsChoose);
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
