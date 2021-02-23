import { useState } from "react";
import { PageHeader, Button, Badge } from "antd";
import { ShoppingCartOutlined } from "@ant-design/icons";
import GenForm from "./GenForm";
import { Link } from "react-router-dom";

const Navbar = (props) => {
  const [loginState, setLoginState] = useState(false);
  const [sellerLoginState, setSellerLoginState] = useState(false);

  const loginActions = props.token
    ? [
        <Button onClick={props.onLogOut} type="text">
          LogOut
        </Button>,
        <Link
          to={{
            pathname: "cart",
          }}
        >
          <Badge count={props.cartState.items.length}>
            <ShoppingCartOutlined style={{ fontSize: "24px" }} />
          </Badge>
        </Link>,
      ]
    : [
        <Button onClick={() => setLoginState(!loginState)} type="text" key="0">
          Login
        </Button>,
        <Button
          onClick={() => setSellerLoginState(!sellerLoginState)}
          type="text"
          key="1"
        >
          Seller Login
        </Button>,
        <Link
          to={{
            pathname: "cart",
          }}
        >
          <Badge count={props.cartState.items.length}>
            <ShoppingCartOutlined style={{ fontSize: "24px" }} />
          </Badge>
        </Link>,
      ];
  props.token && props.type && loginActions.splice(1, 1);
  return (
    <>
      <PageHeader
        title={<Link to="/">Shopping</Link>}
        subTitle="app"
        ghost={false}
        extra={loginActions}
      />
      <GenForm
        title="Login"
        end="login"
        type={0}
        setCartState={(cart) => props.setCartState(cart)}
        visibility={loginState}
        onCancel={() => setLoginState(!loginState)}
        onLoggedIn={(token) => props.onLoggedIn(token, 0)}
      />
      <GenForm
        title="Seller Login"
        end="sellerlogin"
        type={1}
        visibility={sellerLoginState}
        onCancel={() => setSellerLoginState(!sellerLoginState)}
        onLoggedIn={(token) => props.onLoggedIn(token, 1)}
      />
    </>
  );
};

export default Navbar;
