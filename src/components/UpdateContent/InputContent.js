import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { updateTask } from "../../Data";
import { setTodos } from "../../store/actions";
import { currentPageSelector } from "../../store/selectors";
import BtnUI from "../BtnUI";

let InputContent = (props) => {
  let { item } = props;
  let [content, setContent] = useState("");

  let [isUpdate, setIsUpdate] = useState(false);
  let curPage = useSelector(currentPageSelector);

  let dispatchRedux = useDispatch();
  let dispatchTodos = (data) => {
    dispatchRedux(setTodos(data));
  };

  useEffect(() => {
    setContent(item.description);
  }, [item]);

  return (
    <div className="flex items-center ">
      <input
        value={content}
        onChange={(e) => {
          setContent(e.target.value);
          setIsUpdate(true);
        }}
        className="p-2 rounded-full m-1 text-center"
        // onBlur={() => setIsUpdate(false)}
      />
      {isUpdate && (
        <button
          className="bg-red-400 text-white p-2 rounded-lg"
          onClick={() => {
            if (content === "") toast.error("Content is invalid");
            else {
              updateTask(item._id, content, curPage, dispatchTodos);
              setIsUpdate(false);
            }
          }}
        >
          Save
        </button>
      )}
    </div>
  );
};

export default InputContent;
