import { useEffect } from "react";

import { useSelector } from "react-redux";
import useGetTaskByPaginition from "../hooks/task/useGetTaskByPagination";
import { currentPageSelector, todosSelector } from "../store/selectors";
import TableItem from "./TableItem";

let Table = (props) => {
  let todos = useSelector(todosSelector);
  let curPage = useSelector(currentPageSelector);

  const getTaskByPagination = useGetTaskByPaginition();

  useEffect(() => {
    getTaskByPagination(10, curPage * 10 - 10);
  }, []);

  return (
    <div className="h-3/4">
      {todos.length !== 0 ? (
        todos.map((item, index) => <TableItem item={item} id={index + 1} />)
      ) : (
        <div className="w-full justify-center flex my-5">Empty</div>
      )}
    </div>
  );
};

export default Table;
