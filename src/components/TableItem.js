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

const label = { inputProps: { "aria-label": "Checkbox demo" } };

let TableItem = (props) => {
  let { item, id } = props;
  let selector = useSelector(updateCountSelector);
  let curPage = useSelector(currentPageSelector);
  let todos = useSelector(todosSelector);

  let [content, setContent] = useState("");
  let [isOpen, setIsOpen] = useState(false);

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

      <Popup
        modal
        trigger={
          <button
            className="flex-1 justify-center flex max-w-md hover:text-red-400"
            // style={{ maxWidth: 50, height: "auto" }}
          >
            <p>{item.description}</p>
          </button>
        }
        position={"bottom center"}
        onOpen={() => {
          setContent(item.description);
          setIsOpen(true);
        }}
        open={isOpen}
        contentStyle={{
          borderRadius: 5,
          display: "flex",
          justifyContent: "center",
        }}
      >
        <div className="w-fit flex mb-10 mt-6">
          <InputItem
            placeholder="Content"
            value={content}
            setValue={setContent}
          />
          <div className="w-20"></div>
          <BtnUI
            text="Update"
            action={() => {
              updateTask(item._id, content, curPage, dispatchTodos);
              setIsOpen(false);
            }}
          />
        </div>
      </Popup>

      <div className="flex-1 justify-center flex">
        {item.createdAt.substring(0, 10)}
      </div>
      <div className="flex-1 justify-center flex items-center">
        <button
          className="text-white bg-red-400 p-2 rounded-md text-sm h-fit"
          onClick={() => {
            // dispatchTodos(item);
            deleteTask(item._id, dispatchTodos, curPage, dispatchCurPage);
          }}
        >
          delete
        </button>
        {/* <input type="checkbox" className="w-12 h-12 ml-3" /> */}
        <Checkbox
          {...label}
          defaultChecked
          color="success"
          onChange={(e) =>
            updateTask(item._id, e.target.checked, curPage, dispatchTodos)
          }
          checked={item.completed}
        />
      </div>
    </div>
  );
};

export default TableItem;
