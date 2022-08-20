import { Pagination } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllTask, getTaskByPagination } from "../Data";
import { currentPage, setTodos } from "../store/actions";
import { currentPageSelector, todosSelector } from "../store/selectors";

let PaginationUI = (props) => {
  let { count, setCount, allTask, setAllTask } = props;
  let curPage = useSelector(currentPageSelector);

  let dispatchRedux = useDispatch();
  setCount(Math.ceil(allTask.length / 10));

  let dispatchSetTodos = (data) => {
    dispatchRedux(setTodos(data));
  };

  let dispatchCurPage = (data) => {
    dispatchRedux(currentPage(data));
  };

  let selector = useSelector(todosSelector);

  useEffect(() => {
    getAllTask(setAllTask);
    // console.log(curPage);
  }, [selector, curPage]);

  return (
    <Pagination
      count={count}
      defaultPage={1}
      onChange={(e, num) => {
        // setCurPage(num);
        dispatchCurPage(num);
        getTaskByPagination(10, num * 10 - 10, dispatchSetTodos);
      }}
      page={curPage}
    />
  );
};

export default PaginationUI;
