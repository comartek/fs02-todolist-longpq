import { useSelector } from "react-redux";
import { currentPageSelector } from "../store/selectors";
import useGetTaskByPaginition from "./task/useGetTaskByPagination";
import useGetTaskCompleted from "./task/useGetTaskCompleted";

let useFilter = () => {
  const curPage = useSelector(currentPageSelector);
  const getTaskByPagination = useGetTaskByPaginition();
  const getTaskCompleted = useGetTaskCompleted();

  let filter = (title) => {
    switch (title) {
      case "All Task":
        return getTaskByPagination(10, curPage * 10 - 10);
      case "Completed":
        return getTaskCompleted(true);
      case "Processing":
        return getTaskCompleted(false);
      default:
        break;
    }
  };

  return filter;
};

export default useFilter;
