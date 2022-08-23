import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useForceUpdate } from "./hooks/useForceUpdate";
const domain = "https://api-nodejs-todolist.herokuapp.com";

//API Register
export let register = (name, email, password, age, navigate) => {
  const options = {
    method: "POST",
    url: `${domain}/user/register`,
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    data: {
      name: name,
      email: email,
      password: password,
      age: age,
    },
  };

  axios
    .request(options)
    .then((res) => {
      console.log(res.data);
      localStorage.setItem("token", res.token);
    })
    .then(() =>
      setTimeout(() => toast.success("Create account successful!!!"), 2000)
    )
    .then(() => navigate("/"))
    .catch((err) => toast.error(err.response.data));
};

//API Login
export let login = (email, password, navigate) => {
  const options = {
    method: "POST",
    url: `${domain}/user/login`,
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    data: {
      email: email,
      password: password,
    },
  };

  axios
    .request(options)
    .then((res) => {
      console.log(res.data);
      localStorage.setItem("token", res.data.token);
      toast.success("Login successful!!!");
    })
    .then(() => setTimeout(() => navigate("/App"), 3000))
    .catch((err) => toast.error(err.response.data));
};

//API User

export let getLoggedInUser = (setUser) => {
  const options = {
    method: "GET",
    url: `${domain}/user/me`,
    headers: { Authorization: `${localStorage.getItem("token")}` },
  };

  axios
    .request(options)
    .then((res) => {
      setUser(res.data);
    })
    .catch((err) => console.log(err.response.data));
};

export let updateInfo = (name, email, age, setUser) => {
  const options = {
    method: "PUT",
    url: `${domain}/user/me`,
    headers: {
      "Content-Type": "application/json",
      Authorization: `${localStorage.getItem("token")}`,
    },
    data: {
      name: name,
      email: email,
      age: age,
    },
  };

  axios
    .request(options)
    .then((res) => {
      console.log(res.data);
      setUser(res.data.data);
    })
    .then(() => toast.success("Update information successful!!!"))
    .catch((err) => toast.error(err.response.data));
};

export let getUserImage = (id, setImgAccount) => {
  const options = {
    method: "GET",
    url: `${domain}/user/${id}/avatar`,
  };

  axios
    .request(options)
    .then((res) => {
      // console.log(res.request.responseURL);
      setImgAccount(res.request.responseURL);
    })
    .catch((err) => console.log(err.response.data.error));
};

export let uploadAvatar = (imageFile, id, dispatchAvatar, setValue, value) => {
  let myHeaders = new Headers();
  myHeaders.append("Authorization", "Bearer " + localStorage.getItem("token"));

  let formdata = new FormData();
  formdata.append("avatar", imageFile, imageFile.name);

  let requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: formdata,
    redirect: "follow",
  };

  fetch(`${domain}/user/me/avatar`, requestOptions)
    .then((response) => response.text())
    .then((result) => {
      console.log(result);
    })
    .then(() => {
      getUserImage(id, dispatchAvatar);
      // window.location.reload(false);
    })
    .then(() => setValue(value + 1))
    .catch((error) => console.log("error", error));
};

//API Logout
export let logout = (navigate) => {
  const options = {
    method: "POST",
    url: `${domain}/user/logout`,
    headers: { Authorization: `${localStorage.getItem("token")}` },
  };

  axios
    .request(options)
    .then((res) => {
      console.log(res.data);
    })
    .then(() => navigate("/"))
    .catch((err) => toast.error(err.response.data));
};

//API Task
export let getAllTask = (setTaskList) => {
  const options = {
    method: "GET",
    url: `${domain}/task`,
    headers: {
      "Content-Type": "application/json",
      Authorization: `${localStorage.getItem("token")}`,
    },
  };

  axios
    .request(options)
    .then((res) => {
      setTaskList(res.data.data);
    })
    .catch((err) => console.log(err.response.data));
};

export let addTask = (
  content,
  dispatchSetTodos,
  updateCount,
  count,
  dispatchCurPage
) => {
  const options = {
    method: "POST",
    url: `${domain}/task`,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    data: {
      description: content,
    },
  };

  axios
    .request(options)
    .then((res) => {
      console.log(res.data);
      getTaskByPagination(10, count * 10 - 10, dispatchSetTodos);
      updateCount();
      dispatchCurPage(count);
    })
    .then(() => {
      console.log(count);
    })
    .then(() => toast.success("Add task successful!!!"))
    .catch((err) => console.log(err.response.data));
};

export let deleteTask = (id, setTask, count, dispatchCurPage) => {
  const options = {
    method: "DELETE",
    url: `${domain}/task/${id}`,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  };

  axios
    .request(options)
    .then((res) => {
      console.log(res.data);
      getTaskByPagination(10, count * 10 - 10, setTask);
    })
    .then(() => {
      getAllTask();
      dispatchCurPage(count);
      console.log(count);
    })
    .then(() => toast.success("Delete task successful!!!"))
    .catch((err) => console.log(err.response.data));
};

export let getTaskByPagination = (limit, skip, setTask) => {
  const options = {
    method: "GET",
    url: `${domain}/task?limit=${limit}&skip=${skip}`,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      params: {
        limit: limit,
        skip: skip,
      },
    },
  };

  axios
    .request(options)
    .then((res) => {
      setTask(res.data.data);
    })
    .catch((err) => console.log(err.response.data));
};

export let updateTask = (id, completed, curPage, setTask) => {
  let data =
    completed === true || completed === false
      ? { completed: completed }
      : { description: completed };

  console.log({ id, completed });
  const options = {
    method: "PUT",
    url: `${domain}/task/${id}`,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    data: data,
  };

  axios
    .request(options)
    .then((res) => {
      // setTask(res.data.data);
      getTaskByPagination(10, curPage * 10 - 10, setTask);
      console.log(res.data);
    })
    .then(() => toast.success("Update task successful!!!"))
    .catch((err) => console.log(err.response.data));
};
