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
    localStorage.removeItem("uname");
    localStorage.setItem("cart", JSON.stringify([]));
    localStorage.setItem("order", JSON.stringify({ amount: 0 }));
    localStorage.removeItem("orders");
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

  getProductList: (tokenData) =>
    axios.get("/seller/list", {
      headers: {
        Authorization: "Bearer " + tokenData.token,
      },
    }),

  updateProduct: (product, tokenData) =>
    axios.post(
      "/seller/update",
      { product },
      {
        headers: {
          Authorization: "Bearer " + tokenData.token,
        },
      }
    ),

  checkout: (cart, token) => {
    const smallCart = cart.items.map((cartItem) => {
      const { _id, stock, quantity, price, sellerId } = cartItem;
      return {
        _id,
        stock,
        quantity,
        price,
        sellerId,
      };
    });
    return axios.post(
      "/customer/checkout",
      { cart: smallCart, order: cart.order },
      {
        headers: {
          Authorization: "Bearer " + token,
        },
      }
    );
  },

  getOrders: (tokenData) => {
    const tokenObj = tokenData || {
      token: localStorage.getItem("token"),
      type: localStorage.getItem("type"),
    };

    if (tokenObj.type) {
      return axios.get("/seller/orders", {
        headers: {
          Authorization: "Bearer " + tokenObj.token,
        },
      });
    }
    return axios.get("/customer/orders", {
      headers: {
        Authorization: "Bearer " + tokenObj.token,
      },
    });
  },
  updateOrderStatus: (tokenData, status, orderId, customerId) =>
    axios.post(
      "/seller/orderupdate",
      { status, orderId, customerId },
      { headers: { Authorization: "Bearer " + tokenData.token } }
    ),

  register: (values) => {
    console.log(values);
    return axios.post("/register", { values });
  },

  getCategories: () => axios.get("/api/categories"),
};

export default utils;
