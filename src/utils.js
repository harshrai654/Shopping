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

  addProduct: (productData, fileList) => {
    let formData = new FormData();
    const token = localStorage.getItem("token");

    //Appending images to formdata
    fileList.forEach((file) => {
      formData.append("images", file.originFileObj);
    });

    //Appending product data to formdata
    for (let key in productData) {
      formData.append(key, productData[key]);
    }

    return axios.post("/seller/product", formData, {
      headers: {
        Authorization: "Bearer " + token,
      },
    });
  },

  fetchProducts: () =>
    axios
      .get("/api/products")
      .then((res) => res.data)
      .catch((err) => console.error(err)),

  updateCart: (cart) => {
    localStorage.setItem("cart", JSON.stringify(cart));
  },
};

export default utils;
