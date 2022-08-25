import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Checkbox } from "@mui/material";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Popup from "reactjs-popup";
import useDeleteTask from "../hooks/task/useDeleteTask";
import useUpdateTask from "../hooks/task/useUpdateTask";
import { currentPage } from "../store/actions";
import { currentPageSelector } from "../store/selectors";
import BtnUI from "./BtnUI";
import InputContent from "./InputContent";

const label = { inputProps: { "aria-label": "Checkbox demo" } };

let TableItem = (props) => {
  let { item, id } = props;
  let curPage = useSelector(currentPageSelector);

  let [isOpenDelete, setIsOpenDelete] = useState(false);
  let [isShowId, setIsShowId] = useState(false);

  let dispatchRedux = useDispatch();

  let dispatchCurPage = (data) => {
    dispatchRedux(currentPage(data));
  };

  const deleteTask = useDeleteTask();
  const updateTask = useUpdateTask();

  return (
    <div className="flex items-center bg-gray-100 rounded-full my-3">
      <div
        className="flex-1 justify-center flex w-20"
        onMouseEnter={() => setIsShowId(true)}
        onMouseLeave={() => setIsShowId(false)}
      >
        {/* {id + curPage * 10 - 10} */}
        {isShowId ? <p>{item._id}</p> : <p>{item._id.substring(0, 5)}...</p>}
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
          onChange={(e) => updateTask(item._id, e.target.checked, curPage)}
          checked={item.completed}
        />

        <Popup
          modal
          trigger={
            <button className="text-red-400 p-2 rounded-md text-sm h-fit hover:bg-white">
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
            <div className="flex">
              Are you sure want to delete{" "}
              <p className="font-bold mx-1 text-red-400">{item.description}</p>{" "}
              task?
            </div>
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
                  deleteTask(item._id, curPage, dispatchCurPage);
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
