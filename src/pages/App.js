import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { MobileDatePicker } from "@mui/x-date-pickers";
import { TextField } from "@mui/material";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { toast, ToastContainer } from "react-toastify";
import { AccountBtn, BtnUI, Table } from "../components";
import PaginationUI from "../components/Pagination";
import { currentPage, setTodos, updateCount } from "../store/actions";
import { addTask, getAllTask, getTaskByPagination } from "../services/Data";
import { currentPageSelector } from "../store/selectors";
import useGetAllTask from "../hooks/task/useGetAllTask";

function App() {
  let [content, setContent] = useState("");
  let [date, setDate] = useState("");
  let [isOpen, setIsOpen] = useState(false);
  let [count, setCount] = useState(1);
  let [allTask, setAllTask] = useState([]);

  let curPage = useSelector(currentPageSelector);

  let dispatchRedux = useDispatch();

  let dispatchSetTodos = (data) => {
    dispatchRedux(setTodos(data));
  };

  let dispatchUpdateCount = (data) => {
    dispatchRedux(updateCount(data));
  };

  let dispatchCurPage = (data) => {
    dispatchRedux(currentPage(data));
  };

  const handleChange = (newValue) => {
    setDate(newValue.toLocaleDateString("en-US"));
  };

  const getAllTask = useGetAllTask();

  let update = () => {
    setAllTask(getAllTask);
    setCount(Math.ceil(allTask.length / 10));
  };

  useEffect(() => {
    setCount(Math.ceil(allTask.length / 10));
    getTaskByPagination(10, 0, dispatchSetTodos);
    dispatchCurPage(1);
  }, []);

  dispatchUpdateCount(count);

  return (
    <div className="w-screen h-screen flex bg-red-400 items-center justify-center relative">
      <div className="bg-white rounded-md w-2/3 p-5" style={{ height: 850 }}>
        <AccountBtn />
        <div className="flex flex-row items-center justify-between w-full mb-5">
          <div className="text-2xl text-red-400 font-bold">Todolist</div>

          <Popup
            trigger={
              <button className="bg-gray-200 px-4 py-2 rounded-full font-bold">
                +
              </button>
            }
            position={"bottom center"}
            onOpen={() => setIsOpen(true)}
            closeOnDocumentClick={false}
            open={isOpen}
          >
            <div className="rounded-md absolute top-0 left-0 p-5 bg-white drop-shadow-md">
              <input
                placeholder="Content"
                className="px-5 py-4 w-40 mb-3"
                onChange={(e) => setContent(e.target.value)}
              />
              <div className="flex">
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <MobileDatePicker
                    label="Date mobile"
                    inputFormat="MM/dd/yyyy"
                    value={date}
                    onChange={handleChange}
                    renderInput={(params) => <TextField {...params} />}
                  />
                </LocalizationProvider>
              </div>
              <BtnUI
                text="Add"
                action={() => {
                  if (content !== "" && date !== "") {
                    setIsOpen(false);
                    setContent("");
                    setDate("");
                    addTask(
                      content,
                      dispatchSetTodos,
                      update,
                      curPage,
                      dispatchCurPage
                    );
                  } else {
                    toast.error("content or date is invalid");
                  }
                }}
              />
            </div>
          </Popup>
        </div>

        <div className="flex font-bold uppercase">
          <div className="flex-1 justify-center flex">id</div>
          <div className="flex-1 justify-center flex">content</div>
          <div className="flex-1 justify-center flex">date</div>
          <div className="flex-1 justify-center flex">action</div>
        </div>
        <Table />

        <PaginationUI
          count={count}
          setCount={setCount}
          allTask={allTask}
          setAllTask={setAllTask}
        />
      </div>

      <ToastContainer
        position="bottom-center"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss={false}
        draggable
        pauseOnHover={false}
      />
    </div>
  );
}

export default App;
