import axios from "axios";

const utils = {
  login: (end, data) => {
    let cart = localStorage.getItem("cart");
    if (cart) {
      cart = JSON.parse(cart);
      data = { ...data, cart };
    } else {
      data = { ...data, cart: { items: [], order: { amount: 0 } } };
    }
    return axios.post(`/auth/${end}`, data);
  },
  saveToken: (token, type) => {
    localStorage.setItem("token", token);
    localStorage.setItem("type", type);
  },
  removeToken: () => {
    localStorage.removeItem("token");
    localStorage.removeItem("type");
    localStorage.removeItem("cart");
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

  updateCart: (cart, tokenData) => {
    localStorage.setItem("cart", JSON.stringify(cart));
    if (tokenData) {
      return axios.post("/customer/cart", cart, {
        headers: {
          Authorization: "Bearer " + tokenData.token,
        },
      });
    }
  },

  getCartState: () => {
    return localStorage.getItem("cart");
  },
};

export default utils;
