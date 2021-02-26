import { useState } from "react";
import { PageHeader, Button, Badge, Typography } from "antd";
import { ShoppingCartOutlined } from "@ant-design/icons";
import GenForm from "./GenForm";
import RegisterFrom from "./RegisterForm";
import { Link } from "react-router-dom";

const { Text } = Typography;

const Navbar = (props) => {
  const [registerFormState, setRegisterFormState] = useState(0);
  const [loginState, setLoginState] = useState(false);
  const [sellerLoginState, setSellerLoginState] = useState(false);
  const [uname, setUname] = useState(localStorage.getItem("uname"));

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
        <Text strong>{`Hey, ${uname}`}</Text>,

        <Link to="/orders">Orders</Link>,
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
  props.token && props.type && loginActions.splice(1, 3);
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
        changeFormState={() => {
          setRegisterFormState(1);
          setLoginState(false);
        }}
        setUname={(uname) => setUname(uname)}
        setCartState={() => {
          props.setCartState();
        }}
        visibility={loginState && !registerFormState}
        onCancel={() => setLoginState(!loginState)}
        onLoggedIn={(token) => props.onLoggedIn(token, 0)}
      />
      <GenForm
        title="Seller Login"
        end="sellerlogin"
        changeFormState={() => {
          setRegisterFormState(1);
          setSellerLoginState(false);
        }}
        type={1}
        visibility={sellerLoginState && !registerFormState}
        onCancel={() => setSellerLoginState(!sellerLoginState)}
        onLoggedIn={(token) => props.onLoggedIn(token, 1)}
      />

      <RegisterFrom
        title="Register"
        setUname={(uname) => setUname(uname)}
        onCancel={() => setRegisterFormState(0)}
        onLoggedIn={(token, type) => props.onLoggedIn(token, type)}
        visibility={registerFormState && !loginState && !sellerLoginState}
      />
    </>
  );
};

export default Navbar;
