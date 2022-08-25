import { Pagination } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import useGetAllTask from "../hooks/task/useGetAllTask";
import useGetTaskByPaginition from "../hooks/task/useGetTaskByPagination";
import { getAllTask, getTaskByPagination } from "../services/Data";
import { currentPage, setTodos } from "../store/actions";
import { currentPageSelector, todosSelector } from "../store/selectors";

let PaginationUI = (props) => {
  let { count, setCount, allTask } = props;
  let curPage = useSelector(currentPageSelector);

  let dispatchRedux = useDispatch();
  let dispatchCurPage = (data) => {
    dispatchRedux(currentPage(data));
  };

  let todos = useSelector(todosSelector);
  let getTaskByPagination = useGetTaskByPaginition();
  let getAllTask = useGetAllTask();

  useEffect(() => {
    getAllTask();
  }, [todos]);

  useEffect(() => {
    setCount(Math.ceil(allTask.length / 10));
  }, [allTask]);

  return (
    <div className="flex justify-center">
      <Pagination
        count={count}
        defaultPage={1}
        onChange={(e, num) => {
          dispatchCurPage(num);
          getTaskByPagination(10, num * 10 - 10);
        }}
        page={curPage}
      />
    </div>
  );
};

export default PaginationUI;
