import axios from "axios";

const utils = {
  login: (end, data) => axios.post(`/auth/${end}`, data),
  saveToken: (token) => {
    localStorage.setItem("token", token);
  },
  removeToken: () => {
    localStorage.removeItem("token");
  },
};

export default utils;
