import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteTask } from "../Data";
import { currentPage, setTodos } from "../store/actions";
import { updateCountSelector } from "../store/selectors";

let TableItem = (props) => {
  let { item } = props;
  let selector = useSelector(updateCountSelector);

  useEffect(() => {
    console.log(selector);
  }, [selector]);

  let dispatchRedux = useDispatch();
  let dispatchTodos = (data) => {
    dispatchRedux(setTodos(data));
  };

  let dispatchCurPage = (data) => {
    dispatchRedux(currentPage(data));
  };

  return (
    <div className="flex items-center my-3 bg-gray-100 rounded-full">
      <div className="flex-1 justify-center flex w-20">{item._id}</div>
      <div className="flex-1 justify-center flex">{item.description}</div>
      <div className="flex-1 justify-center flex">
        {item.createdAt.substring(0, 10)}
      </div>
      <div className="flex-1 justify-center flex">
        <button
          className="text-white bg-red-400 p-2 rounded-md"
          onClick={() => {
            // dispatchTodos(item);
            deleteTask(item._id, dispatchTodos, selector, dispatchCurPage);
          }}
        >
          delete
        </button>
        <input type="checkbox" className="w-12 h-12 ml-3" />
      </div>
    </div>
  );
};

export default TableItem;
