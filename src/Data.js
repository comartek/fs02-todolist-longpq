import axios from "axios";
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
    .then(() => navigate("/App"))
    .catch((err) => alert(err.response.data));
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
    })
    .then(() => navigate("/App"))
    .catch((err) => alert(err.response.data));
};

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
    .catch((err) => alert(err.response.data));
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
    .catch((err) => alert(err.response.data));
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
      //   console.log(res.data.data);
      setTaskList(res.data.data);
    })
    .catch((err) => alert(err.response.data));
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
    .catch((err) => alert(err.response.data));
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
