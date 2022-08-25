import { useDispatch, useSelector } from "react-redux";
import { setTodos } from "../store/actions";
import { currentPageSelector } from "../store/selectors";
import useGetAllTask from "./task/useGetAllTask";
import useGetTaskByPaginition from "./task/useGetTaskByPagination";

let useFilter = (title) => {
  // const dispatchRedux = useDispatch()
  // const dispatchSetTodos = (data) => {
  //     dispatchRedux(setTodos(data))
  // }
  const curPage = useSelector(currentPageSelector);
  const getTaskByPagination = useGetTaskByPaginition();
  const getTaskCompleted = useGetTaskCompleted();
  const getAllTask = useGetAllTask();

  switch (title) {
    case "All Task":
      getTaskByPagination(10, curPage * 10 - 10);
    case "Completed":
      getTaskCompleted;
    case "Processing":
      getAllTask.filter((item) => getTaskCompleted);
    default:
      break;
  }
};
