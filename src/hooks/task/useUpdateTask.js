import { useSelector } from "react-redux";
import instance from "../../services/services";
import { filterIsChooseSelector } from "../../store/selectors";
import useFilter from "../useFilter";
import useToast from "../useToast";

let useUpdateTask = () => {
  const toast = useToast();
  const filter = useFilter();
  const filterIsChoose = useSelector(filterIsChooseSelector);
  let updateTask = (id, completed, curPage) => {
    let data =
      completed === true || completed === false
        ? { completed: completed }
        : { description: completed };

    console.log({ id, completed });
    const options = {
      method: "PUT",
      url: `task/${id}`,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      data: data,
    };

    toast(
      instance
        .request(options)
        .then((res) => {
          filter(filterIsChoose);
          console.log(res.data);
        })
        .catch((err) => console.log(err.response.data)),
      "Updating task...",
      "Update task successful!!!",
      "Update task failed"
    );
  };

  return updateTask;
};

export default useUpdateTask;
