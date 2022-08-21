import { useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import { getTaskByPagination } from "../Data";
import { setTodos } from "../store/actions";
import { currentPageSelector, todosSelector } from "../store/selectors";
import TableItem from "./TableItem";

let Table = (props) => {
  let selector = useSelector(todosSelector);
  let curPage = useSelector(currentPageSelector);

  let dispatchRedux = useDispatch();

  let dispatchSetTodos = (data) => {
    dispatchRedux(setTodos(data));
  };

  // let [todosList, setTodosList] = useState([]);

  useEffect(() => {
    getTaskByPagination(10, curPage * 10 - 10, dispatchSetTodos);
  }, []);

  return (
    <div className="h-3/4">
      {selector.length !== 0 ? (
        selector.map((item) => <TableItem item={item} />)
      ) : (
        <div className="w-full justify-center flex my-5">Empty</div>
      )}
    </div>
  );
};

export default Table;
