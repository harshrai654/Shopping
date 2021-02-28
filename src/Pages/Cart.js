import { useState } from "react";
import { Redirect } from "react-router-dom";
import { Row, Col, List, InputNumber, Space, Button } from "antd";
import utils from "../utils";
import GenForm from "../Components/GenForm";

const Cart = (props) => {
  props.setCartUpdate(0);
  let cartState = props.cartState ||
    utils.getCartState() || { items: [], order: { amount: 0 } };
  const token = props.token || localStorage.getItem("token");
  const [loginFormModal, setLoginFormModal] = useState(false);
  const [order, setOrder] = useState([]);
  //   const [cartState, setCartState] = useState(cartStateTemp);
  return (
    <Row gutter={16} justify="center">
      {order && order.length && (
        <Redirect to={{ path: "/orders", state: { order } }} />
      )}
      {cartState.items.length ? (
        <Col span={18}>
          <List
            size="large"
            header={<h2>Cart</h2>}
            itemLayout="vertical"
            dataSource={cartState.items}
            renderItem={(product, index) => (
              <List.Item
                key={product._id}
                actions={[
                  <Space>
                    <InputNumber
                      min={1}
                      max={product.stock}
                      defaultValue={product.quantity}
                      onChange={(value) => {
                        let items = [...cartState.items];
                        let order = cartState.order;
                        order.amount +=
                          (value - items[index].quantity) * product.price;
                        items[index].quantity = value;
                        props.updateCart({ items, order });
                        utils.updateCart(items, order, props.tokenData);
                      }}
                    />
                    <h5>X{product.price}</h5>
                  </Space>,
                  <h4>Amount: {product.quantity * product.price}</h4>,
                  <Button
                    type="text"
                    onClick={() => {
                      let items = cartState.items.filter(
                        (pro) => pro !== product
                      );
                      let order = cartState.order;
                      order.amount -= product.quantity * product.price;

                      props.updateCart({ items, order });
                      utils.updateCart(items, order, props.tokenData);
                    }}
                  >
                    Delete
                  </Button>,
                ]}
                extra={[
                  <img width={100} alt="product" src={product.imgUrls[0]} />,
                ]}
              >
                {product.pname}
              </List.Item>
            )}
            footer={[
              <h3>Total Amount: {cartState.order.amount}</h3>,
              <Button
                type="primary"
                onClick={() => {
                  if (token) {
                    utils
                      .checkout(cartState, token)
                      .then((res) => {
                        // console.log(res.data);
                        props.updateCart(res.data.cart);
                        localStorage.setItem(
                          "cart",
                          JSON.stringify(res.data.cart.items)
                        );
                        localStorage.setItem(
                          "order",
                          JSON.stringify(res.data.cart.order)
                        );
                        setOrder(res.data.orders);
                      })
                      .catch((err) => {
                        console.error(err);
                        setOrder([]);
                      });
                  } else {
                    setLoginFormModal(true);
                  }
                }}
              >
                Checkout
              </Button>,
            ]}
          />
          <GenForm
            title="Login"
            end="login"
            type={0}
            setUname={(uname) => props.setUname(uname)}
            setCartState={() => props.setCartState()}
            visibility={loginFormModal}
            onCancel={() => setLoginFormModal(!loginFormModal)}
            onLoggedIn={(token) => props.onLoggedIn(token, 0)}
          />
        </Col>
      ) : (
        <Col offset={2}>
          <h3>Empty Cart!!</h3>
        </Col>
      )}
    </Row>
  );
};

export default Cart;
