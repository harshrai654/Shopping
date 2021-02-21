import { useState } from "react";
import { PageHeader, Button, Badge } from "antd";
import { ShoppingCartOutlined } from "@ant-design/icons";
import GenForm from "./GenForm";

const Navbar = (props) => {
  const [loginState, setLoginState] = useState(false);
  const [sellerLoginState, setSellerLoginState] = useState(false);

  const loginActions = props.token
    ? [
        <Button onClick={props.onLogOut} type="text">
          LogOut
        </Button>,
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
      ];

  loginActions.push(
    <Badge count={props.cartState.length}>
      <ShoppingCartOutlined style={{ fontSize: "24px" }} />
    </Badge>
  );
  return (
    <>
      <PageHeader
        title="Shopping"
        subTitle="app"
        ghost={false}
        extra={loginActions}
      />
      <GenForm
        title="Login"
        end="login"
        type={0}
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
