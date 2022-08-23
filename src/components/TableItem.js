import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Checkbox } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Popup from "reactjs-popup";
import { deleteTask, getTaskByPagination, updateTask } from "../Data";
import { currentPage, setTodos } from "../store/actions";
import {
  currentPageSelector,
  todosSelector,
  updateCountSelector,
} from "../store/selectors";
import BtnUI from "./BtnUI";
import InputItem from "./InputItem";
import InputContent from "./UpdateContent/InputContent";

const label = { inputProps: { "aria-label": "Checkbox demo" } };

let TableItem = (props) => {
  let { item, id } = props;
  let selector = useSelector(updateCountSelector);
  let curPage = useSelector(currentPageSelector);
  let todos = useSelector(todosSelector);

  let [isOpenDelete, setIsOpenDelete] = useState(false);

  let dispatchRedux = useDispatch();
  let dispatchTodos = (data) => {
    dispatchRedux(setTodos(data));
  };

  let dispatchCurPage = (data) => {
    dispatchRedux(currentPage(data));
  };

  return (
    <div className="flex items-center bg-gray-100 rounded-full my-3">
      <div className="flex-1 justify-center flex w-20">
        {id + curPage * 10 - 10}
      </div>

      <InputContent item={item} />

      <div className="flex-1 justify-center flex">
        {item.createdAt.substring(0, 10)}
      </div>
      <div className="flex-1 justify-center flex items-center">
        <Checkbox
          {...label}
          defaultChecked
          color="success"
          onChange={(e) =>
            updateTask(item._id, e.target.checked, curPage, dispatchTodos)
          }
          checked={item.completed}
        />

        <Popup
          modal
          trigger={
            <button className="text-red-400 p-2 rounded-md text-sm h-fit">
              <FontAwesomeIcon icon={faTrash} />
            </button>
          }
          position={"bottom center"}
          onOpen={() => setIsOpenDelete(true)}
          open={isOpenDelete}
          contentStyle={{
            borderRadius: 5,
          }}
        >
          <div className="rounded-md flex flex-col p-5">
            <div>Are you sure want to delete {item.description} task?</div>
            <div className="flex items-center self-end">
              <button
                className="text-red-400 p-3 mt-3"
                onClick={() => setIsOpenDelete(false)}
              >
                Cancel
              </button>
              <BtnUI
                text="Apply"
                action={() => {
                  deleteTask(item._id, dispatchTodos, curPage, dispatchCurPage);
                  setIsOpenDelete(false);
                }}
              />
            </div>
          </div>
        </Popup>
      </div>
    </div>
  );
};

export default TableItem;
