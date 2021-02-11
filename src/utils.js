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
    try {
      const res = await axios.post("/auth", { token });

      return res;
    } catch (err) {
      console.error(err);
    }
  },

  addProduct: (formData, fileList) => {
    const token = localStorage.getItem("token");

    const files = fileList.map((file) => ({
      data: file.thumbUrl,
    }));
    const data = {
      formData,
      files,
    };
    axios
      .post("/add/product", data, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: "Bearer " + token,
        },
      })
      .then((res) => res.data)
      .catch((err) => console.error(err));
  },
};

export default utils;
