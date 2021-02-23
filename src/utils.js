import axios from "axios";

const utils = {
  login: (end, data) => {
    let cart = localStorage.getItem("cart");
    if (cart) {
      cart = JSON.parse(cart);
      let cartData = {};
      cart.forEach((item) => {
        const { _id, quantity } = item;
        cartData[_id] = quantity;
      });

      data = { ...data, cart: cartData };
    } else {
      data = { ...data, cart: {} };
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
    localStorage.setItem("cart", JSON.stringify([]));
    localStorage.setItem("order", JSON.stringify({ amount: 0 }));
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

  updateCart: (cart, order, tokenData) => {
    tokenData = tokenData ? tokenData : localStorage.getItem("token");

    localStorage.setItem("cart", JSON.stringify(cart));
    if (!order) {
      let amount = 0;
      cart.forEach((item) => (amount += item.quantity * item.price));
      localStorage.setItem("order", JSON.stringify({ amount: amount }));
    } else localStorage.setItem("order", JSON.stringify(order));
    if (tokenData) {
      tokenData = tokenData.token ? tokenData.token : tokenData;
      if (cart) {
        let cartData = {};
        cart.forEach((item) => {
          const { _id, quantity } = item;
          cartData[_id] = quantity;
        });

        return axios.post(
          "/customer/cart",
          { cart: cartData },
          {
            headers: {
              Authorization: "Bearer " + tokenData,
            },
          }
        );
      }
    }
  },

  getCartState: () => {
    return {
      items: JSON.parse(localStorage.getItem("cart")) || [],
      order: JSON.parse(localStorage.getItem("order")) || { amount: 0 },
    };
  },
};

export default utils;
