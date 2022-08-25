import { faSave } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import useUpdateTask from "../hooks/task/useUpdateTask";
import { updateTask } from "../services/Data";
import { setTodos } from "../store/actions";
import { currentPageSelector } from "../store/selectors";

let InputContent = (props) => {
  let { item } = props;
  let [content, setContent] = useState("");

  let [isUpdate, setIsUpdate] = useState(false);
  let curPage = useSelector(currentPageSelector);

  let dispatchRedux = useDispatch();
  let dispatchTodos = (data) => {
    dispatchRedux(setTodos(data));
  };

  const updateTask = useUpdateTask();

  useEffect(() => {
    setContent(item.description);
  }, [item]);

  return (
    <div className="flex items-center flex-1 relative justify-center">
      <input
        value={content}
        onChange={(e) => {
          setContent(e.target.value);
          setIsUpdate(true);
        }}
        className={`py-2 px-2 rounded-full m-1 text-center focus:text-left`}
      />
      {isUpdate && (
        <button
          className="bg-red-400 text-white px-3 py-1 mr-2 rounded-full -ml-12"
          onClick={() => {
            if (content === "") toast.error("Content is invalid");
            else {
              updateTask(item._id, content, curPage);
              setIsUpdate(false);
            }
          }}
        >
          <FontAwesomeIcon icon={faSave} />
        </button>
      )}
    </div>
  );
};

export default InputContent;
