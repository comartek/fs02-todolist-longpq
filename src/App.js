import Popup from "reactjs-popup";
import Table from "./components/Table";
import "reactjs-popup/dist/index.css";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { currentPage, setTodos, updateCount } from "./store/actions";
import { MobileDatePicker } from "@mui/x-date-pickers";
import { TextField } from "@mui/material";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import AccountBtn from "./components/AccountBtn";
import { addTask, getAllTask, getTaskByPagination } from "./Data";
import PaginationUI from "./components/Pagination";
import BtnUI from "./components/BtnUI";
import { currentPageSelector } from "./store/selectors";

// history.pushState(null, null, location.href);
// window.onpopstate = function (event) {
//   history.go(1);
// };

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

  let update = () => {
    getAllTask(setAllTask);
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
                    alert("content or date is invalid");
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
    </div>
  );
}

export default App;
