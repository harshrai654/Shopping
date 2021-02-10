import axios from "axios";

const utils = {
  login: (end, data) => axios.post(`/auth/${end}`, data),
  saveToken: (token, type) => {
    localStorage.setItem("token", token);
    localStorage.setItem("type", type);
  },
  removeToken: () => {
    localStorage.removeItem("token");
    localStorage.removeItem("type");
  },
  auth: async () => {
    const token = localStorage.getItem("token");
    console.log(token);
    try {
      const res = await axios.post("/auth", { token });
      console.log(res);
      return res;
    } catch (err) {
      console.error(err);
    }
  },
};

export default utils;
