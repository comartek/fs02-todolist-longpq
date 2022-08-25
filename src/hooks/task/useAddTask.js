import { useSelector } from "react-redux";
import instance from "../../services/services";
import { filterIsChooseSelector } from "../../store/selectors";
import useFilter from "../useFilter";
import useToast from "../useToast";

let useAddTask = () => {
  const toast = useToast();
  const filter = useFilter();
  const filterIsChoose = useSelector(filterIsChooseSelector);
  let addTask = (content, updateCount, count, dispatchCurPage) => {
    const options = {
      method: "POST",
      url: `task`,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      data: {
        description: content,
      },
    };

    toast(
      instance
        .request(options)
        .then((res) => {
          // console.log(res.data);
          filter(filterIsChoose);
          updateCount();
          dispatchCurPage(count);
        })
        .then(() => {
          console.log(count);
        })
        .catch((err) => console.log(err.response.data)),
      "Adding task...",
      "Add task successful!!!",
      "Add task failed"
    );
  };

  return addTask;
};

export default useAddTask;
