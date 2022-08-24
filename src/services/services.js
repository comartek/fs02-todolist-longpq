import axios from "axios";

const instance = axios.create({
  baseURL: "https://api-nodejs-todolist.herokuapp.com/",
});

instance.defaults.headers.common["Authorization"] = "Auth from instance";
export default instance;
