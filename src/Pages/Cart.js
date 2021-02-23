import { useState } from "react";
import { Row, Col, List, InputNumber, Space, Button } from "antd";
import utils from "../utils";
import GenForm from "../Components/GenForm";

const Cart = (props) => {
  let cartState = props.cartState ||
    utils.getCartState() || { items: [], order: { amount: 0 } };
  const token = props.token || localStorage.getItem("token");
  const [loginFormModal, setLoginFormModal] = useState(false);
  //   const [cartState, setCartState] = useState(cartStateTemp);
  return (
    <Row gutter={16} justify="space-around">
      {cartState.items.length ? (
        <Col offset={2} span={24}>
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
                        props.setCartState({ items, order });
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

                      props.setCartState({ items, order });
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
                    console.log("perform checkout");
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
